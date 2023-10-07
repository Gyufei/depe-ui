import { IPool } from "../../types/pool";
import { PoolAPR } from "../../gql-document/pool";
import { useGqlRequest } from "./use-graphql-request";
import { useMemo } from "react";

export function usePoolAPY(poolAddr: IPool["poolAddr"] | null) {
  const res = useGqlRequest(
    PoolAPR(poolAddr ? [{ key: "poolAddr", value: poolAddr }] : []),
  );
  
  const apyVal = useMemo(() => {
    const apyNum = Number(res.data?.poolApr?.apr as string || 0);
    return String(apyNum);
  }, [res?.data])

  return {
    ...res,
    data: apyVal
  };
}
