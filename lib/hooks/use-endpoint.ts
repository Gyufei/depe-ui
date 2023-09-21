import { useMemo } from "react";
import { useChainConfig } from "./use-chain-config";

export function useEndPoint() {
  const { chainConfig } = useChainConfig();

  const apiEndPoint = useMemo(() => {
    return chainConfig?.api.default;
  }, [chainConfig]);

  const gqlEndPoint = useMemo(() => {
    return apiEndPoint + "/graphql";
  }, [apiEndPoint]);

  const tokenEndPoint = useMemo(() => {
    return chainConfig?.api.tokenApi;
  }, [chainConfig]);

  return {
    apiEndPoint,
    gqlEndPoint,
    tokenEndPoint,
  };
}
