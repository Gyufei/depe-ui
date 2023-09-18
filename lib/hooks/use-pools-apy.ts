import { useEffect, useState } from "react";
import type { IPool } from "@/lib/types/pool";
import usePoolAPY from "./use-pool-apy";

export interface IPoolAPY {
  isLoading: boolean;
  value: number | null;
}

export default function usePoolsAPY(pools: Array<IPool>) {
  const { getPoolAPY } = usePoolAPY();

  const initAPYs = pools.reduce((acc, p) => {
    acc[p.poolId] = {
      isLoading: true,
      value: null,
    };
    return acc;
  }, {} as any);

  const [poolAPYs, setPoolAPYs] = useState<Record<string, IPoolAPY>>(initAPYs);

  useEffect(() => {
    const getPoolsAPY = async () => {
      const allPoolGet = pools.map((p) => {
        const singleGet = async () => {
          const apy = await getPoolAPY(p);
          setPoolAPYs({
            ...poolAPYs,
            [p.poolId]: {
              isLoading: false,
              value: apy,
            },
          });

          return apy;
        };

        return singleGet();
      });

      await Promise.all(allPoolGet);
    };

    getPoolsAPY();
  }, [pools]);

  return { poolAPYs };
}
