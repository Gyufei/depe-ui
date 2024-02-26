import useSWRImmutable from "swr/immutable";
import fetcher from "../../fetcher";
import type { IToken } from "../../types/token";
import { useEndPoint } from "./use-endpoint";
import { useMemo } from "react";
import { useClusterConfig } from "../common/use-cluster-config";

export function useTokens() {
  const { chainConfig } = useClusterConfig();
  const { tokenEndPoint } = useEndPoint();

  async function tFetcher() {
    const tokens = await fetcher(tokenEndPoint);
    return {
      tokens,
    };
  }

  const { data, isLoading, error } = useSWRImmutable<{
    tokens: Array<IToken>;
  }>(tokenEndPoint, tFetcher);

  const marginTokens = useMemo(() => {
    const mTs = chainConfig?.marginTokens || [];
    return data?.tokens.filter((t) => mTs.includes(t.address));
  }, [chainConfig, data?.tokens]);

  const notMarginTokens = useMemo(() => {
    const mTs = chainConfig?.marginTokens || [];
    return data?.tokens.filter((t) => !mTs.includes(t.address));
  }, [chainConfig, data?.tokens]);

  return {
    data: data?.tokens,
    marginTokens,
    notMarginTokens,
    isLoading,
    error,
  };
}
