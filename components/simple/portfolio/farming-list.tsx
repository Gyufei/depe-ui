"use client";

import { useMemo } from "react";
import { range } from "lodash";

import { SkeletonRow } from "./row-common";
import { FarmingRow } from "./farming-row";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import { ListContainer } from "./list-container";
import Empty from "../../share/empty";
import { IPool } from "@/lib/types/pool";
import { usePoolAsset } from "@/lib/hooks/api/use-pool-asset";

export function FarmingList({
  className,
  isLoading,
  pools,
}: {
  pools: Array<IPool>;
  isLoading: boolean;
  className?: string;
}) {
  const title = useMemo(() => {
    const postfix = pools.length > 0 ? `( ${pools.length} )` : "";
    return `Farming ${postfix}`;
  }, [pools]);

  const { dataMap: poolAssetMap, isLoading: isPoolAssetLoading } =
    usePoolAsset();

  return (
    <ListContainer isLoading={isLoading} title={title} className={className}>
      {isLoading && (
        <div className="h-[212px]">
          {range(3).map((i: number) => {
            return <SkeletonRow key={i} />;
          })}
        </div>
      )}

      {!isLoading && pools.length > 0 && (
        <ScrollArea className="h-[212px]">
          {pools.map((p, i: number) => {
            const asset = {
              value: poolAssetMap[p.poolAddr]?.amount || null,
              isLoading: isPoolAssetLoading,
            };

            return (
              <FarmingRow
                pool={p}
                asset={asset}
                key={p.poolId}
                isLast={i === pools.length - 1}
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
