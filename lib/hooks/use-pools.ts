import { useMemo } from "react";

import { useGqlRequest } from "@/lib/hooks/use-graphql";
import { PoolsDoc } from "@/lib/gql-document/pool";
import type { IPool } from "@/lib/types/pool";

export default function usePools() {
  const { data: poolsRes, isLoading } = useGqlRequest(PoolsDoc(1));
  const pools: Array<IPool> = useMemo(() => {
    const poolsData = poolsRes?.pools?.data || [];
    return poolsData;
  }, [poolsRes]);

  return { pools, isLoading };
}
