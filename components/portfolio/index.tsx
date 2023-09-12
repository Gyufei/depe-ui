"use client";

import { ReactNode } from "react";
import { useActivePanel } from "@/lib/hooks/use-active-panel";
import PanelLeaderButton from "../common/panel-leader-button";
import { FarmingRow, SkeletonRow, TradingRow } from "./info-row";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

function ListContainer({
  title,
  isActivePanel,
  children,
  className,
  isLoading,
}: {
  title: string;
  isActivePanel: boolean;
  isLoading: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      data-state={isActivePanel ? "active" : "inactive"}
      className={cn("c-active-border rounded-xl border-2 p-2", className)}
    >
      {isLoading ? (
        <Skeleton className="mb-1 h-5 w-[72px]" />
      ) : (
        <div className="c-font-title-65 leading-5 text-black mb-1 px-2 text-base">{title}</div>
      )}
      {children}
    </div>
  );
}

function FarmingList(props: any) {
  return (
    <ListContainer title="Farming" {...props}>
      {props.isLoading ? (
        [1, 2, 3].map((i: number) => {
          return <SkeletonRow key={i} />;
        })
      ) : (
        <ScrollArea className="h-[210px]">
          {[1, 2, 3, 4, 5].map((i: number) => {
            return <FarmingRow key={i} isLast={i === 5} />;
          })}
          <ScrollBar />
        </ScrollArea>
      )}
    </ListContainer>
  );
}

function TradingList(props: any) {
  return (
    <ListContainer title="Trading" {...props}>
      {props.isLoading ? (
        [1, 2].map((i: number) => {
          return <SkeletonRow key={i} />;
        })
      ) : (
        <ScrollArea className="h-[140px]">
          {[1, 2, 3, 4, 5, 6].map((i: number) => {
            return <TradingRow key={i} isLast={i === 6} />;
          })}
          <ScrollBar />
        </ScrollArea>
      )}
    </ListContainer>
  );
}

export default function Portfolio() {
  const { isActivePanel, setPanelActive } = useActivePanel("Portfolio");
  const farmingIsLoading = false;
  const tradingIsLoading = false;

  return (
    <div onClick={setPanelActive} className="flex flex-col">
      <PanelLeaderButton className="bg-pink" isActive={isActivePanel}>
        Portfolio
      </PanelLeaderButton>
      <div
        data-state={isActivePanel ? "active" : "inactive"}
        className="c-shadow-panel h-[520px] w-[480px]"
      >
        <FarmingList
          isLoading={farmingIsLoading}
          isActivePanel={isActivePanel}
        />
        <TradingList
          className="mt-4"
          isLoading={tradingIsLoading}
          isActivePanel={isActivePanel}
        />
      </div>
    </div>
  );
}
