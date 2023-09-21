"use client";
import { SkeletonRow } from "./row-common";
import { TradingRow } from "./trading-row";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import { range } from "lodash";
import { ListContainer } from "./list-container";
import { usePositions } from "@/lib/hooks/use-positions";

export function TradingList({
  isActivePanel,
  className,
}: {
  isActivePanel: boolean;
  className?: string;
}) {
  const { positions, isLoading } = usePositions();

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
          {positions.map((pos, i) => {
            return (
              <TradingRow
                key={pos.positionAddr}
                position={pos}
                isLast={i === positions.length - 1}
              />
            );
          })}
          <ScrollBar />
        </ScrollArea>
      )}
    </ListContainer>
  );
}
