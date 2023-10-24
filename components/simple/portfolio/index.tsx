"use client";

import { useContext } from "react";
import PanelLeaderButton from "../../share/panel-leader-button";
import { PoolList } from "./pool-list";
import { PositionList } from "./position-list";
import { usePositions } from "@/lib/hooks/api/use-positions";
import Empty from "@/components/share/empty";
import { useAccountPools } from "@/lib/hooks/api/use-account-pools";
import HoverActivePanel, { IsActivePanelContext } from "../hover-active-panel";

export default function Portfolio() {
  return (
    <HoverActivePanel name="Portfolio">
      <PortfolioBase />
    </HoverActivePanel>
  );
}

function PortfolioBase() {
  const isActive = useContext(IsActivePanelContext);

  const { data: pools, isLoading: isPoolsLoading } = useAccountPools();
  const { data: positions, isLoading: isPositionsLoading } = usePositions();

  const noData =
    !isPoolsLoading &&
    !isPositionsLoading &&
    !pools.length &&
    !positions.length;

  return (
    <>
      <PanelLeaderButton className="bg-pink">Portfolio</PanelLeaderButton>
      <div
        data-state={isActive ? "active" : "inactive"}
        className="c-shadow-panel h-fit w-[480px]"
      >
        {noData ? (
          <div className="flex h-[210px] items-center justify-center pr-4">
            <Empty />
          </div>
        ) : (
          <>
            <PoolList pools={pools} isLoading={isPoolsLoading} />
            <PositionList
              className="mt-4"
              positions={positions}
              isLoading={isPositionsLoading}
            />
          </>
        )}
      </div>
    </>
  );
}
