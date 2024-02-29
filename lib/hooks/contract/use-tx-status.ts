import { useCallback, useState } from "react";

export default function useTxStatus(txFn: (_args: any) => Promise<any>) {
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
      } catch (e) {
        setIsError(true);
        setError(e);
      } finally {
        setIsLoading(false);
      }
    },
    [txFn],
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
