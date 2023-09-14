import { useMemo } from "react";
import { usePublicClient } from "wagmi";
import { getChainGqlApi } from "../chain-configs";

export function useEndPoint() {
  const { chain } = usePublicClient();

  const gqlEndPoint = useMemo(() => {
    return chain?.name ? getChainGqlApi(chain.name) : null;
  }, [chain]);

  return {
    gqlEndPoint,
  };
}
