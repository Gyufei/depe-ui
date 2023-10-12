import { useMemo } from "react";
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
import { useChainConfig } from "@/lib/hooks/common/use-chain-config";
import { DepePositionManagerABI } from "@/lib/abi/DepePositionManager";
import { useTokenRoutes } from "../api/use-token-routes";
import { useTxWrite } from "./use-tx-write";
import { useSpecialToken } from "../use-eth-token";

export function useOpenPosition() {
  const { chainConfig } = useChainConfig();

  const pool = useAtomValue(SPoolAtom);
  const baseToken = useAtomValue(SBaseTokenAtom);
  const baseTokenAmount = useAtomValue(SBaseTokenAmountAtom);
  const quoteToken = useAtomValue(SQuoteTokenAtom);
  const amountInMax = useAtomValue(SAmountInMaxAtom);
  const quoteTokenAmount = useAtomValue(SQuoteTokenAmountAtom);
  const leverage = useAtomValue(SLeverageAtom);
  const mintNFTFlag = useAtomValue(SMintNftFlagAtom);

  const PositionManagerAddress = chainConfig?.contract?.DepePositionManager;

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
    actionName: "OpenPosition",
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
      chainConfig?.contract?.UniswapV3Router,
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

  return {
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    write: writeAction,
  };
}
