import useSWRImmutable from "swr/immutable";
import fetcher from "../fetcher";
import { EndPointPathMap } from "../PathMap";
import type { IToken } from "../types/token";
// import { useEndPoint } from "./use-endpoint";

export function useTokens() {
  // TODO: replace real token
  // const { apiEndPoint } = useEndPoint();
  // console.log(apiEndPoint);

  const { data, isLoading, error } = useSWRImmutable<{
    tokens: Array<IToken>;
    // }>(apiEndPoint + EndPointPathMap.token, fetcher);
  }>(EndPointPathMap.token, fetcher);

  return {
    data: data?.tokens,
    isLoading,
    error,
  };
}
