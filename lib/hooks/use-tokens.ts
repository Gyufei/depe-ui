import useSWRImmutable from "swr/immutable";
import fetcher from "../fetcher";
import type { IToken } from "../types/token";
import { useEndPoint } from "./use-endpoint";
import { getChainMarginTokens } from "../chain-configs";
import { useMemo } from "react";
import { usePublicClient } from "wagmi";

export function useTokens() {
  const { chain } = usePublicClient();
  const { tokenEndPoint } = useEndPoint();

  const { data, isLoading, error } = useSWRImmutable<{
    tokens: Array<IToken>;
  }>(tokenEndPoint, fetcher);

  const marginTokens = useMemo(() => {
    const mTs = getChainMarginTokens(chain.name) || [];
    return data?.tokens.filter((t) => mTs.includes(t.address));
  }, [chain, data?.tokens]);

  const notMarginTokens = useMemo(() => {
    const mTs = getChainMarginTokens(chain.name) || [];
    return data?.tokens.filter((t) => !mTs.includes(t.address));
  }, [chain, data?.tokens]);

  return {
    data: data?.tokens,
    marginTokens,
    notMarginTokens,
    isLoading,
    error,
  };
}
