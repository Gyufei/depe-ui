export enum EPoolStatus {
  genesis,
  running,
  liquidating,
  ended,
}

export interface IPool {
  poolId: string;
  poolStatus: EPoolStatus;
  poolAddr: string;

  durationDays: string;
  maxleverage: string;
  maxCapacity: string;
  tradingFeeRate: string;
  fundingFeeRate: string;

  baseToken: string;
  quoteToken: string;
  dpToken: string;
  creator: string;
  poolCreateTimes: string;
}
