"use client";
import { SkeletonRow } from "./row-common";
import { TradingRow } from "./trading-row";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import { range } from "lodash";
import { ListContainer } from "./list-container";

export function TradingList({
  isActivePanel,
  className,
}: {
  isActivePanel: boolean;
  className?: string;
}) {
  const isLoading = false;

  return (
    <ListContainer
      isLoading={isLoading}
      title="Trading"
      isActivePanel={isActivePanel}
      className={className}
    >
      {isLoading ? (
        <div className="h-[140px]">
          {range(2).map((i: number) => {
            return <SkeletonRow key={i} />;
          })}
        </div>
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
