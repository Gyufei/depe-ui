import { useSetAtom } from "jotai";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { Address } from "viem";

import { useChainConfig } from "@/lib/hooks/use-chain-config";
import { DepePositionManagerABI } from "@/lib/abi/DepePositionManager";
import { useEffect } from "react";
import { GlobalMessageAtom } from "../states/global-message";

export function useWithdrawMargin(poolAddr: Address, positionAddr: Address) {
  const { chainConfig } = useChainConfig();
  const positionManagerAddress = chainConfig?.contract?.DepePositionManager;

  const setGlobalMessage = useSetAtom(GlobalMessageAtom);

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
    functionName: "decreaseMargin",
  });

  const handleWithdraw = (amount: bigint) => {
    if (!poolAddr || !positionAddr) return;

    const TxArgs = [poolAddr, positionAddr, amount];

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
        message: "Tx success",
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
    write: handleWithdraw,
  };
}
