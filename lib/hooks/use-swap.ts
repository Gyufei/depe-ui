import { useAtomValue } from "jotai";
import { parseUnits } from "viem";

import {
  SAmountInMaxAtom,
  SBaseTokenAtom,
  SLeverageAtom,
  SMintNftFlagAtom,
  SPoolAtom,
  SQuoteTokenAmountAtom,
  SQuoteTokenAtom,
} from "@/lib/states/swap";
import { useChainConfig } from "@/lib/hooks/use-chain-config";
import { DepePositionManagerABI } from "@/lib/abi/DepePositionManager";
import { encodeTxExtendedParamsBytes } from "@/lib/utils/web3";
import { useTxWrite } from "./use-tx-write";

export function useSwap() {
  const { chainConfig } = useChainConfig();

  const pool = useAtomValue(SPoolAtom);
  const baseToken = useAtomValue(SBaseTokenAtom);
  const quoteToken = useAtomValue(SQuoteTokenAtom);
  const amountInMax = useAtomValue(SAmountInMaxAtom);
  const quoteTokenAmount = useAtomValue(SQuoteTokenAmountAtom);
  const leverage = useAtomValue(SLeverageAtom);
  const mintNFTFlag = useAtomValue(SMintNftFlagAtom);

  const PositionManagerAddress = chainConfig?.contract?.DepePositionManager;

  const { data, isLoading, isSuccess, isError, error, write } = useTxWrite({
    address: PositionManagerAddress,
    abi: DepePositionManagerABI,
    functionName: "openPosition",
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
      quoteToken.address,
      baseToken.address,
    );

    const quoteAmount = parseUnits(quoteTokenAmount, quoteToken?.decimals);

    const TxArgs = [
      pool.poolAddr,
      chainConfig?.contract?.UniswapV3Router,
      quoteAmount,
      BigInt(leverage) * 100n,
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
