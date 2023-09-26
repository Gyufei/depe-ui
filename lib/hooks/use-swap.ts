import { useAtomValue, useSetAtom } from "jotai";
import { useContractWrite, useWaitForTransaction } from "wagmi";
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
        message:
          txError?.message || callError?.message || "Fail: Some error occur",
      });
    }
  }, [
    isTxSuccess,
    isCallError,
    isTxError,
    callError,
    txError,
    setGlobalMessage,
  ]);

  return {
    data: txData,
    error: callError || txError,
    isLoading: isCallLoading || isTxLoading,
    isSuccess: isCallSuccess && isTxSuccess,
    isError: isCallError || isTxError,
    write: handleSwap,
  };
}
