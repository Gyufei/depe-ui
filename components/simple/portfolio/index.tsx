"use client";

import { useActivePanel } from "@/lib/hooks/use-active-panel";
import PanelLeaderButton from "../../share/panel-leader-button";
import { FarmingList } from "./farming-list";
import { TradingList } from "./trading-list";
import { usePositions } from "@/lib/hooks/api/use-positions";
import Empty from "@/components/share/empty";
import { useAccountPools } from "@/lib/hooks/use-account-pools";

export default function Portfolio() {
  const { isActivePanel, setPanelActive } = useActivePanel("Portfolio");

  const { data: pools, isLoading: isPoolsLoading } = useAccountPools();
  const { data: positions, isLoading: isPositionsLoading } = usePositions();

  const noData =
    !isPoolsLoading &&
    !isPositionsLoading &&
    !pools.length &&
    !positions.length;

  return (
    <div onClick={setPanelActive} className="flex flex-col">
      <PanelLeaderButton className="bg-pink" isActive={isActivePanel}>
        Portfolio
      </PanelLeaderButton>
      <div
        data-state={isActivePanel ? "active" : "inactive"}
        className="c-shadow-panel h-fit w-[480px]"
      >
        {noData ? (
          <div className="flex h-[210px] items-center justify-center pr-4">
            <Empty />
          </div>
        ) : (
          <>
            <FarmingList
              isActivePanel={isActivePanel}
              pools={pools}
              isLoading={isPoolsLoading}
            />
            <TradingList
              className="mt-4"
              isActivePanel={isActivePanel}
              positions={positions}
              isLoading={isPositionsLoading}
            />
          </>
        )}
      </div>
    </div>
  );
}
