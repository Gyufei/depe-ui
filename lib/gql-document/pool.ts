import { gql } from "graphql-request";
import { IGqlDocParam, convertKVsToParams } from "./helper";

export const PoolsDoc = (params: Array<IGqlDocParam>): string => {
  if (!params.length) return "";
  const paramsStr = convertKVsToParams(params);

  return gql`
    query {
      pools(${paramsStr}) {
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
};

export const PoolDoc = (params: Array<IGqlDocParam>): string => {
  if (!params.length) return "";
  const paramsStr = convertKVsToParams(params);

  return gql`
    query {
      pool(${paramsStr}) {
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

export const PoolHistory = (params: Array<IGqlDocParam>): string => {
  if (!params.length) return "";
  const paramsStr = convertKVsToParams(params);

  return gql`
    query {
      poolHistory(${paramsStr}) {
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
};

export const PoolAsset = (params: Array<IGqlDocParam>): string => {
  if (!params.length) return "";
  const paramsStr = convertKVsToParams(params);

  return gql`
    query {
      poolAsset(${paramsStr}) {
        data {
          dpPoolAddr
          amount
        }
      }
    }
  `;
};

export const PoolAPR = (params: Array<IGqlDocParam>): string => {
  if (!params.length) return "";
  const paramsStr = convertKVsToParams(params);

  return gql`
    query {
      poolApr(${paramsStr}) {
        apr
      }
    }
  `;
};
