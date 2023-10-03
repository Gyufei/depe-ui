import { useSetAtom } from "jotai";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { useEffect } from "react";
import { GlobalMessageAtom } from "../../states/global-message";

export function useTxWrite({
  address,
  abi,
  functionName,
  successTip,
  errorTip,
}: {
  successTip?: string;
  errorTip?: string;
} & Parameters<typeof useContractWrite>[0]) {
  const setGlobalMessage = useSetAtom(GlobalMessageAtom);

  const {
    data: callData,
    isLoading: isCallLoading,
    isSuccess: isCallSuccess,
    isError: isCallError,
    error: callError,
    write,
  } = useContractWrite({
    address,
    abi,
    functionName,
  });

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
        message: successTip || "Successfully",
      });
    }

    if (isCallError || isTxError) {
      setGlobalMessage({
        type: "error",
        message:
          txError?.message ||
          callError?.message ||
          errorTip ||
          "Fail: Some error occur",
      });
    }
  }, [
    isTxSuccess,
    isCallError,
    isTxError,
    callError,
    txError,
    setGlobalMessage,
    errorTip,
    successTip,
  ]);

  return {
    data: txData,
    error: callError || txError,
    isLoading: isCallLoading || isTxLoading,
    isSuccess: isCallSuccess && isTxSuccess,
    isError: isCallError || isTxError,
    write,
  };
}
