import { useMemo } from "react";
import { PoolDoc } from "../gql-document/pool";
import { useGqlRequest } from "./use-graphql";
import { IPool } from "../types/pool";
import { AddressType } from "../types/address";

export function usePool(params: { poolId?: string; poolAddr?: AddressType }) {
  const { data: poolRes, isLoading } = useGqlRequest(PoolDoc(params));

  const pool: IPool = useMemo(() => {
    const poolsData = poolRes?.pool || null;
    return poolsData;
  }, [poolRes]);

  return { pool, isLoading };
}
