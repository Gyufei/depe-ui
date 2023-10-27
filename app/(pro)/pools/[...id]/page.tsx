"use client";

import PoolDetail from "@/components/pro/pool-detail";
import PoolPortfolio from "@/components/pro/pool-portfolio";
import PoolPositions from "@/components/pro/pool-positions";
import { PDPoolIdAtom } from "@/lib/states/poolDetail";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PoolItem({ params }: { params: any }) {
  const poolId = params.id[0];
  const setPDPoolId = useSetAtom(PDPoolIdAtom);

  useEffect(() => {
    if (poolId) setPDPoolId(poolId);
  });

  return (
    <div className="flex flex-col">
      <Breadcrumb poolId={poolId} />
      <div className="mt-[22px] flex justify-between">
        <PoolPortfolio />
        <PoolDetail />
      </div>
      <PoolPositions />
    </div>
  );
}

function Breadcrumb({ poolId }: { poolId: string }) {
  const router = useRouter();

  function goPools() {
    router.push("/pools");
  }

  return (
    <div className="flex items-center gap-x-4 text-xl leading-[30px]">
      <div
        onClick={goPools}
        className="c-font-title-55 cursor-pointer text-black opacity-40 hover:opacity-70"
      >
        Pools
      </div>
      <div className="text-black opacity-40">&gt;</div>
      <div className="text-black hover:opacity-70">#{poolId}</div>
    </div>
  );
}
