import { AddressType } from "./address";

export enum EPositionStatus {
  genesis,
  running,
  liquidating,
  ended,
}

export interface IPosition {
  positionAddr: AddressType;
  dpPoolAddr: AddressType;
  trader: AddressType;
  leverage: string;
  positionSize: string;
  debtAmount: string;
  marginAmount: string;
  apr: string;
  pendingFundingFee: string;
  remnantAsset: string;
  updateTimestamp: string;
  positionStatus: EPositionStatus;
}
