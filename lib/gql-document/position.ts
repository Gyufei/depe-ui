import { gql } from "graphql-request";
import { IGqlDocParam, convertKVsToParams } from "./helper";

export const PositionsDoc = (params: Array<IGqlDocParam>): string => {
  if (!params.length) return "";
  const paramsStr = convertKVsToParams(params);

  return gql`
    query {
      positions(${paramsStr}) {
      data { 
              positionAddr
              dpPoolAddr
              trader 
              leverage
              positionSize
              debtAmount
              marginAmount
              apr 
              isNFT
              pendingFundingFee
              remnantAsset
              updateTimestamp
              positionStatus
          }
      }
    }`;
};

export const PositionDoc = (params: Array<IGqlDocParam>): string => {
  if (!params.length) return "";
  const paramsStr = convertKVsToParams(params);

  return gql`
    query {
      position(${paramsStr}) {
        positionAddr
        dpPoolAddr
        trader
        leverage
        positionSize
        debtAmount
        marginAmount
        apr
        pendingFundingFee
        remnantAsset
        updateTimestamp
        positionStatus
        isNFT
      }
    }
`;
};

export const PositionHistory = (params: Array<IGqlDocParam>): string => {
  if (!params.length) return "";
  const paramsStr = convertKVsToParams(params);

  return gql`
    query {
      positionHistory(
        ${paramsStr}
      ) {
        data {
          txHash
          positionAddr
          op
          positionSize
          debtAmount
          payAmount
          fundingFee
          tradingFee
        }
      }
    }
  `;
};
