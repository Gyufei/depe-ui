"use client";
import { SkeletonRow } from "./row-common";
import { TradingRow } from "./trading-row";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import { range } from "lodash";
import { ListContainer } from "./list-container";
import Empty from "@/components/share/empty";
import { IPosition } from "@/lib/types/position";
import { useMemo } from "react";

export function TradingList({
  isActivePanel,
  className,
  positions,
  isLoading,
}: {
  isActivePanel: boolean;
  className?: string;
  positions: Array<IPosition>;
  isLoading: boolean;
}) {
  const title = useMemo(() => {
    const postfix = positions.length > 0 ? `( ${positions.length} )` : "";
    return `Trading ${postfix}`;
  }, [positions]);

  return (
    <ListContainer
      isLoading={isLoading}
      title={title}
      isActivePanel={isActivePanel}
      className={className}
    >
      {isLoading && (
        <div className="h-[212px]">
          {range(3).map((i: number) => {
            return <SkeletonRow key={i} />;
          })}
        </div>
      )}

      {!isLoading && !!positions.length && (
        <ScrollArea className="h-[212px]">
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

      {!isLoading && !positions.length && (
        <div className="flex h-[210px] items-center justify-center pr-4">
          <Empty />
        </div>
      )}
    </ListContainer>
  );
}
