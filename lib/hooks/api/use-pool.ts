import { PoolDoc } from "../../gql-document/pool";
import { useGqlRequest } from "./use-graphql-request";
import { IPool } from "../../types/pool";

export function usePool({
  poolAddr,
  poolId,
}: {
  poolAddr?: string;
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
    isLoading: false,
    data: {
      poolId: "1",
      poolStatus: 1,
      poolAddr: "p1",

      durationDays: "736000",
      maxleverage: "10",
      maxCapacity: "100",
      tradingFeeRate: "0.005",
      fundingFeeRate: "0.001",

      baseToken: "So11111111111111111111111111111111111111112",
      quoteToken: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      dpToken: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      creator: "123",
      poolCreateTimes: "123",
    },
  };

  return {
    ...poolRes,
    data: (poolRes?.data?.pool as IPool) || null,
  };
}
