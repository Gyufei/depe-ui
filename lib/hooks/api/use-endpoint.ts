import { useMemo } from "react";
import { useChainConfig } from "../common/use-chain-config";

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

  const routerEndPoint = useMemo(() => {
    return chainConfig?.api.routerApi;
  }, [chainConfig]);

  return {
    apiEndPoint,
    gqlEndPoint,
    tokenEndPoint,
    routerEndPoint,
  };
}
