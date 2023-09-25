import { useAtomValue, useSetAtom } from "jotai";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { encodeAbiParameters, parseUnits } from "viem";

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
import { encodePath } from "@/lib/web3/utils";
import { UNISWAP_FEES } from "../constant";
import { useEffect } from "react";
import { GlobalMessageAtom } from "../states/global-message";

export function useSwap() {
  const { chainConfig } = useChainConfig();

  const setGlobalMessage = useSetAtom(GlobalMessageAtom);
  const pool = useAtomValue(SPoolAtom);
  const baseToken = useAtomValue(SBaseTokenAtom);
  const quoteToken = useAtomValue(SQuoteTokenAtom);
  const amountInMax = useAtomValue(SAmountInMaxAtom);
  const quoteTokenAmount = useAtomValue(SQuoteTokenAmountAtom);
  const leverage = useAtomValue(SLeverageAtom);
  const mintNFTFlag = useAtomValue(SMintNftFlagAtom);

  const positionManagerAddress = chainConfig?.contract?.DepePositionManager;

  const {
    data: callData,
    isLoading: isCallLoading,
    isSuccess: isCallSuccess,
    isError: isCallError,
    error: callError,
    write,
  } = useContractWrite({
    address: positionManagerAddress,
    abi: DepePositionManagerABI,
    functionName: "openPosition",
  });

  const handleSwap = () => {
    if (
      !pool ||
      !amountInMax ||
      !baseToken ||
      !quoteToken ||
      !quoteTokenAmount ||
      !leverage
    )
      return;

    const path = [quoteToken.address, baseToken.address];
    const ePath = encodePath(path, UNISWAP_FEES);
    const abiEncodedPath = encodeAbiParameters(
      [
        {
          name: "extendedParamsBytes",
          type: "bytes",
        },
      ],
      [ePath],
    );

    const quoteAmount = parseUnits(quoteTokenAmount, quoteToken?.decimals);

    const TxArgs = [
      pool.poolAddr,
      chainConfig?.contract?.UniswapV3Router,
      quoteAmount,
      BigInt(leverage) * 100n,
      // 575308765n,
      amountInMax,
      abiEncodedPath,
      mintNFTFlag,
    ];

    write({
      args: TxArgs as any,
    });
  };

  const {
    data: txData,
    error: txError,
    isError: isTxError,
    isLoading: isTxLoading,
    isSuccess: isTxSuccess,
  } = useWaitForTransaction({
    hash: callData?.hash,
  });

  useEffect(() => {
    if (isTxSuccess) {
      setGlobalMessage({
        type: "success",
        message: "Your funds have been staked in the pool.",
      });
    }

    if (isCallError || isTxError) {
      setGlobalMessage({
        type: "error",
        message: txError?.message || "Fail: Some error occur",
      });
    }
  }, [isTxSuccess, isCallError, isTxError, txError, setGlobalMessage]);

  return {
    data: txData,
    error: callError || txError,
    isLoading: isCallLoading || isTxLoading,
    isSuccess: isCallSuccess && isTxSuccess,
    isError: isCallError || isTxError,
    write: handleSwap,
  };
}
