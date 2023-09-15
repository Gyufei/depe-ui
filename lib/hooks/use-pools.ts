import { useMemo } from "react";

import { useGqlRequest } from "@/lib/hooks/use-graphql";
import { GqlDocPool } from "@/lib/gql-document";
import type { IPool } from "@/lib/types/pool";

export default function usePools() {
  const { data: poolsRes, isLoading } = useGqlRequest(GqlDocPool(1));
  const pools: Array<IPool> = useMemo(() => {
    const poolsData = poolsRes?.pools?.data || [];
    return poolsData;
  }, [poolsRes]);

  return { pools, isLoading };
}
