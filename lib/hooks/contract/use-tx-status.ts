import { GlobalMessageAtom } from "@/lib/states/global-message";
import { useSetAtom } from "jotai";
import { useCallback, useState } from "react";

export default function useTxStatus(
  txFn: (_args: any) => Promise<any>,
  successTip?: string,
  errorTip?: string,
) {
  const setGlobalMessage = useSetAtom(GlobalMessageAtom);

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const txAction = useCallback(
    async (...args: Parameters<typeof txFn>) => {
      setIsLoading(true);

      try {
        const data = await txFn(...args);
        setData(data);
        setIsSuccess(true);
        setGlobalMessage({
          type: "success",
          message: successTip || "Successfully",
        });
      } catch (e: any) {
        console.log(e);
        setIsError(true);
        setError(e);
        setGlobalMessage({
          type: "error",
          message: e?.message || errorTip || "Fail: Some error occur",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [txFn, successTip, errorTip, setGlobalMessage],
  );

  return {
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    write: txAction,
  };
}
