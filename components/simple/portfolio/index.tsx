"use client";

import { useContext } from "react";
import PanelLeaderButton from "../../share/panel-leader-button";
import { PoolList } from "./pool-list";
import { PositionList } from "./position-list";
import { usePositions } from "@/lib/hooks/api/use-positions";
import Empty from "@/components/share/empty";
import { useAccountPools } from "@/lib/hooks/api/use-account-pools";
import HoverActivePanel, { IsActivePanelContext } from "../hover-active-panel";
import { useMediaQuery } from "@/lib/hooks/common/use-media-query";

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

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const noData =
    !isPoolsLoading &&
    !isPositionsLoading &&
    !pools.length &&
    !positions.length;

  return (
    <>
      <PanelLeaderButton className="bg-pink">Portfolio</PanelLeaderButton>
      {noData ? (
        <div
          data-state={isActive ? "active" : "inactive"}
          className="c-shadow-panel h-fit w-[calc(100vw-52px)] md:w-[480px]"
        >
          <div className="flex h-[210px] items-center justify-center pr-4">
            <Empty />
          </div>
        </div>
      ) : isDesktop ? (
        <div
          data-state={isActive ? "active" : "inactive"}
          className="c-shadow-panel h-fit w-[calc(100vw-52px)] md:w-[480px]"
        >
          <PoolList pools={pools} isLoading={isPoolsLoading} />
          <PositionList
            className="mt-4"
            positions={positions}
            isLoading={isPositionsLoading}
          />
        </div>
      ) : (
        <>
          <div
            data-state={isActive ? "active" : "inactive"}
            className="c-shadow-panel h-fit w-[calc(100vw-52px)] md:w-[480px]"
          >
            <PoolList pools={pools} isLoading={isPoolsLoading} />
          </div>
          <div className="flex justify-between px-6">
            <div className="border-x-2 border-black w-2 h-6"></div>
            <div className="border-x-2 border-black w-2 h-6"></div>
          </div>
          <div
            data-state={isActive ? "active" : "inactive"}
            className="c-shadow-panel h-fit w-[calc(100vw-52px)] md:w-[480px]"
          >
            <PositionList
              className="mt-4"
              positions={positions}
              isLoading={isPositionsLoading}
            />
          </div>
        </>
      )}
    </>
  );
}
