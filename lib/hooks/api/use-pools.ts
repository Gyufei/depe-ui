import { useGqlRequest } from "@/lib/hooks/api/use-graphql-request";
import { PoolsDoc } from "@/lib/gql-document/pool";
import type { IPool } from "@/lib/types/pool";

export function usePools() {
  const poolsRes = useGqlRequest(PoolsDoc([{ key: "poolStatus", value: "1" }]));

  return {
    ...poolsRes,
    data: (poolsRes?.data?.pools?.data || []) as Array<IPool>,
  };
}
