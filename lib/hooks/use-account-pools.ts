import { useMemo } from "react";
import { usePoolAsset } from "./api/use-pool-asset";
import { usePools } from "./api/use-pools";

export function useAccountPools() {
  const { data: pools, isLoading: isPoolLoading } = usePools();
  const { data: poolAsset, isLoading: isPoolAssetLoading } = usePoolAsset();

  const accountPools = useMemo(() => {
    if (!pools?.length || !poolAsset.length) return [];

    const acPools = pools.filter((p) => {
      return poolAsset.find((pa) => pa.dpPoolAddr === p.poolAddr);
    });

    return acPools;
  }, [pools, poolAsset]);

  return {
    data: accountPools,
    isLoading: isPoolLoading || isPoolAssetLoading,
  };
}
