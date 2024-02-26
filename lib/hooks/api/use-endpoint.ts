import { useMemo } from "react";
import { useClusterConfig } from "../common/use-cluster-config";

export function useEndPoint() {
  const { chainConfig } = useClusterConfig();

  const apiEndPoint = useMemo(() => {
    return chainConfig?.api.default;
  }, [chainConfig]);

  const gqlEndPoint = useMemo(() => {
    return apiEndPoint + "/graphql";
  }, [apiEndPoint]);

  const tokenEndPoint = useMemo(() => {
    return "https://token.jup.ag/strict";
  }, []);

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
