import { useEffect, useMemo } from "react";
import { useAtomValue } from "jotai";
import { parseUnits } from "viem";

import {
  SAmountInMaxAtom,
  SBaseTokenAmountAtom,
  SBaseTokenAtom,
  SLeverageAtom,
  SMintNftFlagAtom,
  SPoolAtom,
  SQuoteTokenAmountAtom,
  SQuoteTokenAtom,
} from "@/lib/states/swap";
import { useClusterConfig } from "@/lib/hooks/common/use-cluster-config";
import { DepePositionManagerABI } from "@/lib/abi/DepePositionManager";
import { useTokenRoutes } from "../api/use-token-routes";
import { useTxWrite } from "./use-tx-write";
import { useSpecialToken } from "../use-eth-token";
import { usePositions } from "../api/use-positions";

export function useOpenPosition() {
  const { clusterConfig } = useClusterConfig();

  const pool = useAtomValue(SPoolAtom);
  const baseToken = useAtomValue(SBaseTokenAtom);
  const baseTokenAmount = useAtomValue(SBaseTokenAmountAtom);
  const quoteToken = useAtomValue(SQuoteTokenAtom);
  const amountInMax = useAtomValue(SAmountInMaxAtom);
  const quoteTokenAmount = useAtomValue(SQuoteTokenAmountAtom);
  const leverage = useAtomValue(SLeverageAtom);
  const mintNFTFlag = useAtomValue(SMintNftFlagAtom);

  const PositionManagerAddress = clusterConfig?.program?.DepePositionManager;

  const { getEthTxValueParams: getEthValueParams } = useSpecialToken();
  const { encodeTxExtendedParamsBytes } = useTokenRoutes();

  const extraParams = useMemo(() => {
    return getEthValueParams(baseToken, baseTokenAmount);
  }, [baseToken, baseTokenAmount, getEthValueParams]);

  const { data, isLoading, isSuccess, isError, error, write } = useTxWrite({
    address: PositionManagerAddress,
    abi: DepePositionManagerABI,
    functionName: "openPosition",
    ...extraParams,
  });

  const writeAction = () => {
    if (
      !pool ||
      !amountInMax ||
      !baseToken ||
      !quoteToken ||
      !quoteTokenAmount ||
      !leverage
    )
      return;

    const abiEncodedPath = encodeTxExtendedParamsBytes(
      baseToken.address,
      quoteToken.address,
      true,
    );

    const quoteAmount = parseUnits(quoteTokenAmount, quoteToken?.decimals);

    const TxArgs = [
      pool.poolAddr,
      clusterConfig?.contract?.UniswapV3Router,
      quoteAmount,
      BigInt((leverage * 100).toFixed()),
      amountInMax,
      abiEncodedPath,
      mintNFTFlag,
    ];

    write({
      args: TxArgs as any,
    });
  };

  const { mutate: refetchPositions } = usePositions();

  useEffect(() => {
    if (isSuccess) {
      refetchPositions();
    }
  });

  return {
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    write: writeAction,
  };
}
