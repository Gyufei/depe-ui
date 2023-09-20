import { useMemo } from "react";
import { usePublicClient } from "wagmi";
import { getChainApiPath, getChainTokenApiPath } from "../chain-configs";

export function useEndPoint() {
  const { chain } = usePublicClient();

  const apiEndPoint = useMemo(() => {
    return chain?.name ? getChainApiPath(chain.name) : null;
  }, [chain]);

  const gqlEndPoint = useMemo(() => {
    return chain?.name ? getChainApiPath(chain.name) + "/graphql" : null;
  }, [chain]);

  const tokenEndPoint = useMemo(() => {
    return chain?.name ? getChainTokenApiPath(chain.name) : null;
  }, [chain]);

  return {
    apiEndPoint,
    gqlEndPoint,
    tokenEndPoint,
  };
}
