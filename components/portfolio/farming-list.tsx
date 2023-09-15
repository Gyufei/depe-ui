"use client";

import { range } from "lodash";

import { SkeletonRow } from "./row-common";
import { FarmingRow } from "./farming-row";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { ListContainer } from "./list-container";
import Empty from "../share/empty";
import usePools from "@/lib/hooks/use-pools";
import usePoolsAPY from "@/lib/hooks/use-pools-apy";

export function FarmingList({
  isActivePanel,
  className,
}: {
  isActivePanel: boolean;
  className?: string;
}) {
  const { pools, isLoading } = usePools();
  const { poolAPYs } = usePoolsAPY(pools);

  return (
    <ListContainer
      isLoading={isLoading}
      title="Farming"
      isActivePanel={isActivePanel}
      className={className}
    >
      {isLoading && (
        <div className="h-[210px]">
          {range(3).map((i: number) => {
            return <SkeletonRow key={i} />;
          })}
        </div>
      )}

      {!isLoading && pools.length > 0 && (
        <ScrollArea className="h-[210px]">
          {pools.map((p, i: number) => {
            return (
              <FarmingRow
                pool={p}
                poolAPY={poolAPYs[p.poolId]}
                key={p.poolId}
                isLast={i === pools.length}
              />
            );
          })}
          <ScrollBar />
        </ScrollArea>
      )}

      {!isLoading && !pools.length && (
        <div className="flex h-[210px] items-center justify-center pr-4">
          <Empty />
        </div>
      )}
    </ListContainer>
  );
}
