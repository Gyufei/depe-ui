import { IPool } from "../../types/pool";
import { PoolAPR } from "../../gql-document/pool";
import { useGqlRequest } from "./use-graphql-request";
import { useMemo } from "react";

export function usePoolAPY(poolAddr: IPool["poolAddr"] | null) {
  const res = useGqlRequest(
    PoolAPR(poolAddr ? [{ key: "poolAddr", value: poolAddr }] : []),
  );

  const apyVal = useMemo(() => {
    const apr = res.data?.poolApr?.apr;
    if (apr === "NaN") return "0";

    const apyNum = Number(apr || 0);
    return String(apyNum);
  }, [res?.data]);

  return {
    ...res,
    data: apyVal,
  };
}
