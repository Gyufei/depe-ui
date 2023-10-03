import { IPool } from "../../types/pool";
import { PoolAPR } from "../../gql-document/pool";
import { useGqlRequest } from "./use-graphql-request";

export function usePoolAPY(poolAddr: IPool["poolAddr"] | null) {
  const res = useGqlRequest(
    PoolAPR(poolAddr ? [{ key: "poolAddr", value: poolAddr }] : []),
  );

  return {
    ...res,
    data: (res.data?.poolApr?.apr as string) || undefined,
  };
}
