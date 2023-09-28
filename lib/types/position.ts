import { Address } from "viem";

export enum EPositionStatus {
  genesis,
  running,
  liquidating,
  ended,
}

export interface IPosition {
  positionAddr: Address;
  dpPoolAddr: Address;
  trader: Address;
  leverage: string;
  positionSize: string;
  debtAmount: string;
  marginAmount: string;
  apr: string;
  pendingFundingFee: string;
  remnantAsset: string;
  updateTimestamp: string;
  positionStatus: EPositionStatus;
  isNFT: boolean;
}
