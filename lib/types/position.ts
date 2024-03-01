export enum EPositionStatus {
  genesis,
  open,
  liquidating,
  closed,
}

export interface IPosition {
  positionAddr: string;
  dpPoolAddr: string;
  trader: string;
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
  tokenId: string;
}
