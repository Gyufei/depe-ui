import { usePublicClient } from "wagmi";
import { ChainConfigs } from "../chain-configs";
import { useMemo } from "react";

export function useChainConfig() {
  const { chain } = usePublicClient();

  const currChainConfig = useMemo(
    () => ChainConfigs.find((c) => c.name === chain.name),
    [chain],
  );

  return {
    chainConfig: currChainConfig,
  };
}
