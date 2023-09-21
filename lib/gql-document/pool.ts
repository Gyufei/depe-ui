import { gql } from "graphql-request";
import { AddressType } from "../types/address";

export const PoolsDoc = (poolStatus: number | string): string => gql`
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

export const PoolDoc = ({
  poolId,
  poolAddr,
}: {
  poolId?: string;
  poolAddr?: AddressType;
}): string => {
  let params = "";
  if (!poolId && !poolAddr) {
    return "";
  }

  if (poolId) {
    params = `poolId: "${poolId}"`;
  }
  if (poolAddr) {
    params = `poolAddr: "${poolAddr}"`;
  }

  return gql`
    query {
      pool(${params}) {
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
  `;
};

export const PoolHistory = (account: AddressType): string => gql`
  query {
    poolHistory(account: "${account}") {
      data {
        txHash
        dpPoolAddr
        account
        amount
        changeFlag
      }
    }
  }
`;
