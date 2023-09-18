import { random } from "lodash";
import { POOL_APY_CACHE_KEY, useCacheMap } from "./use-cache-map";
import { IPool } from "../types/pool";
import { useEffect, useState } from "react";

export default function usePoolAPY(pool?: IPool) {
  const poolAPYMap = useCacheMap(POOL_APY_CACHE_KEY);

  const [poolApy, setPoolApy] = useState<number | null>(null);

  async function getPoolAPY(p = pool) {
    if (!p) return null;

    if (poolAPYMap.has(p.poolId)) {
      const apy = poolAPYMap.get(p.poolId);
      setPoolApy(apy);
      return apy;
    }

    const pApy = await new Promise<number>((resolve) => {
      setTimeout(() => {
        resolve(random(0, 100));
      }, 2000);
    });
    poolAPYMap.set(p.poolId, pApy);
    setPoolApy(pApy);
    return pApy;
  }

  useEffect(() => {
    getPoolAPY(pool);
  }, [pool]);

  return { poolApy, getPoolAPY };
}
