import { useGqlRequest } from "@/lib/hooks/api/use-graphql-request";
import { PoolsDoc } from "@/lib/gql-document/pool";
import type { IPool } from "@/lib/types/pool";
import { useSetApiRefresh } from "./use-set-api-refresh";

export function usePools() {
  const poolsRes = useGqlRequest(PoolsDoc([{ key: "poolStatus", value: "1" }]));

  useSetApiRefresh('pools', ["Deposit", "Withdraw"], poolsRes.mutate);

  return {
    ...poolsRes,
    data: (poolsRes?.data?.pools?.data || []) as Array<IPool>,
  };
}
