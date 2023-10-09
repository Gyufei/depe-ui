import { Address } from "viem";

export enum EPositionStatus {
  genesis,
  open,
  liquidating,
  closed,
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
