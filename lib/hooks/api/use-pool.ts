import { PoolDoc } from "../../gql-document/pool";
import { useGqlRequest } from "./use-graphql-request";
import { IPool } from "../../types/pool";
import { Address } from "viem";

export function usePool({
  poolAddr,
  poolId,
}: {
  poolAddr?: Address;
  poolId?: string;
}) {
  const poolRes = useGqlRequest(
    PoolDoc(
      poolAddr
        ? [{ key: "poolAddr", value: poolAddr }]
        : poolId
        ? [{ key: "poolId", value: poolId }]
        : [],
    ),
  );

  return {
    ...poolRes,
    data: (poolRes?.data?.pool as IPool) || null,
  };
}
