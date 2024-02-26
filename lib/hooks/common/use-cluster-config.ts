import {
  ClusterAtom,
  ClusterType,
  DevnetCluster,
  MainnetCluster,
} from "@/lib/states/cluster";
import { useAtom } from "jotai";
import { useCallback, useMemo } from "react";

export function useClusterConfig() {
  const [cluster, setCluster] = useAtom(ClusterAtom);

  const clusterConfig = useMemo(() => {
    if (cluster === ClusterType.Mainnet) {
      return MainnetCluster;
    }

    if (cluster === ClusterType.Devnet) {
      return DevnetCluster;
    }

    return MainnetCluster;
  }, [cluster]);

  const setClusterType = useCallback(
    (type: ClusterType) => {
      setCluster(type);
    },
    [setCluster],
  );

  return {
    clusterConfig,
    setClusterType,
  };
}
