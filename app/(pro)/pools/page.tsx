"use client";

import usePools from "@/lib/hooks/use-pools";
import PoolPanel from "@/components/pro/pool-panel";
import usePoolsAPY from "@/lib/hooks/use-pools-apy";

export default function Pools() {
  const { pools, isLoading } = usePools();
  const { poolAPYs } = usePoolsAPY(pools);

  return (
    <div className="flex flex-col gap-y-6">
      <button className="c-shadow-translate c-font-text-65 flex w-fit items-center justify-center  rounded-xl border-2 border-black bg-white py-3 px-9 leading-6 shadow-25">
        Create Pool
      </button>

      <div className="grid grid-cols-2 grid-rows-2 gap-[55px]">
        {isLoading && <div>Loading</div>}
        {!isLoading &&
          pools.length !== 0 &&
          pools.map((pool) => (
            <PoolPanel
              key={pool.poolId}
              pool={pool}
              poolAPY={poolAPYs[pool.poolId]}
            />
          ))}
      </div>
    </div>
  );
}
