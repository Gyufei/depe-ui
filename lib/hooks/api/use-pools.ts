import { useGqlRequest } from "@/lib/hooks/api/use-graphql-request";
import { PoolsDoc } from "@/lib/gql-document/pool";
import type { IPool } from "@/lib/types/pool";

export function usePools() {
  const poolsRes = useGqlRequest(PoolsDoc([{ key: "poolStatus", value: "1" }]));
  console.log(poolsRes);
  console.log([] as Array<IPool>);

  return {
    data: [
      {
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
    ],
    isLoading: false,
  };
  // {
  //   ...poolsRes,
  //   data: (poolsRes?.data?.pools?.data || []) as Array<IPool>,
  // };
}
