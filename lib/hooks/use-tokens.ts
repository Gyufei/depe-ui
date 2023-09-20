import useSWRImmutable from "swr/immutable";
import fetcher from "../fetcher";
import type { IToken } from "../types/token";
import { useEndPoint } from "./use-endpoint";

export function useTokens() {
  const { tokenEndPoint } = useEndPoint();

  const { data, isLoading, error } = useSWRImmutable<{
    tokens: Array<IToken>;
  }>(tokenEndPoint + `?ts=${new Date().getTime()}`, fetcher);

  return {
    data: data?.tokens,
    isLoading,
    error,
  };
}
