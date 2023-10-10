import useSWRImmutable from "swr/immutable";
import fetcher from "../../fetcher";
import type { IToken } from "../../types/token";
import { useEndPoint } from "./use-endpoint";
import { useMemo } from "react";
import { useChainConfig } from "../common/use-chain-config";

export function useTokens() {
  const { chainConfig } = useChainConfig();
  const { tokenEndPoint } = useEndPoint();

  const { data, isLoading, error } = useSWRImmutable<{
    tokens: Array<IToken>;
  }>(tokenEndPoint, fetcher);

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
