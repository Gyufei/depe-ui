"use client";

import PoolDetail from "@/components/pro/pool-detail";
import PoolPortfolio from "@/components/pro/pool-portfolio";
import PoolPositions from "@/components/pro/pool-positions";
import { PDActivePanelAtom } from "@/lib/states/mobile-pool-detail-panel";
import { PDPoolIdAtom } from "@/lib/states/poolDetail";
import { useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PoolItem({ params }: { params: any }) {
  const poolId = params.id[0];
  const setPDPoolId = useSetAtom(PDPoolIdAtom);
  const activePanel = useAtomValue(PDActivePanelAtom);

  const isPortActive = activePanel === "Portfolio";
  const isPositionsActive = activePanel === "Positions";

  console.log(activePanel);

  useEffect(() => {
    if (poolId) setPDPoolId(poolId);
  });

  return (
    <div className="flex flex-col">
      <Breadcrumb poolId={poolId} />
      <div
        data-active={isPortActive ? true : false}
        className="mt-[22px] flex-col justify-between space-y-6 data-[active=true]:flex data-[active=false]:hidden md:flex-row md:space-y-0 md:data-[active=false]:flex"
      >
        <PoolPortfolio />
        <PoolDetail />
      </div>
      <div
        data-active={isPositionsActive ? true : false}
        className="mt-[55px] data-[active=true]:block data-[active=false]:hidden md:data-[active=false]:flex"
      >
        <PoolPositions />
      </div>
    </div>
  );
}

function Breadcrumb({ poolId }: { poolId: string }) {
  const router = useRouter();

  function goPools() {
    router.push("/pools");
  }

  return (
    <div className="hidden items-center gap-x-4 text-xl leading-[30px] md:flex">
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
