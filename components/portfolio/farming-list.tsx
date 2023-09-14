"use client";

import { useMemo } from "react";
import { range } from "lodash";
import useSWR from "swr";

import { SkeletonRow } from "./row-common";
import { FarmingRow } from "./farming-row";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { ListContainer } from "./list-container";
import { GqlDocPool } from "@/lib/gql-document";
import { useGraphqlClient } from "@/lib/hooks/use-graphql";
import { IPool } from "@/lib/types/pool";
import Empty from "../share/empty";

export function FarmingList({
  isActivePanel,
  className,
}: {
  isActivePanel: boolean;
  className?: string;
}) {
  const { gqlFetcher } = useGraphqlClient();
  const { data, isLoading } = useSWR(GqlDocPool(1), gqlFetcher);
  const pools: Array<IPool> = useMemo(() => data?.pools?.data || [], [data]);

  return (
    <ListContainer
      isLoading={isLoading}
      title="Trading"
      isActivePanel={isActivePanel}
      className={className}
    >
      {isLoading ? (
        <div className="h-[210px]">
          {range(3).map((i: number) => {
            return <SkeletonRow key={i} />;
          })}
        </div>
      ) : pools.length ? (
        <ScrollArea className="h-[210px]">
          {pools.map((p: IPool, i: number) => {
            return <FarmingRow pool={p} key={p.poolId} isLast={i === pools.length} />;
          })}
          <ScrollBar />
        </ScrollArea>
      ) : (
        <div className="flex h-[210px] items-center justify-center pr-4">
          <Empty />
        </div>
      )}
    </ListContainer>
  );
}
