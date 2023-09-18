import { gql } from "graphql-request";
import { AddressType } from "../types/address";

export const PositionsDoc = (poolAddr: string): string => gql`
  query {
    positions(dpPoolAddr: "${poolAddr}") {
    data { 
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
        }
    }
  }`;

export const PositionDoc = (positionAddr: AddressType): string => gql`
  query {
    position(positionAddr: "${positionAddr}") {
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
    }
  }
`;

export const PositionHistory = (positionAddr: AddressType): string => gql`
  query {
    positionHistory(
      positionAddr: "${positionAddr}"
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
