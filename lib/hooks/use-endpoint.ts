import { useMemo } from "react";
import { usePublicClient } from "wagmi";
import { getChainApiPath, getChainGqlApiPath } from "../chain-configs";

export function useEndPoint() {
  const { chain } = usePublicClient();

  const gqlEndPoint = useMemo(() => {
    return chain?.name ? getChainGqlApiPath(chain.name) : null;
  }, [chain]);

  const apiEndPoint = useMemo(() => {
    return chain?.name ? getChainApiPath(chain.name) : null;
  }, [chain]);

  return {
    apiEndPoint,
    gqlEndPoint,
  };
}
