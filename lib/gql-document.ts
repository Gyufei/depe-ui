import { gql } from "graphql-request";

export const GqlDocPool = (poolStatus: number | string): string => gql`
  query {
    pools(poolStatus: "${poolStatus}") {
      data {
        poolId
        poolAddr
        durationDays
        creator
        baseToken
        quoteToken
        dpToken
        maxleverage
        maxCapacity
        tradingFeeRate
        fundingFeeRate
        poolStatus
        poolCreateTimes
      }
    }
  }
`;
