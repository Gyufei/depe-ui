import { Address } from "viem";

export enum EPoolStatus {
  genesis,
  running,
  liquidating,
  ended,
}

export interface IPool {
  poolId: string;
  poolStatus: EPoolStatus;
  poolAddr: Address;

  durationDays: string;
  maxleverage: string;
  maxCapacity: string;
  tradingFeeRate: string;
  fundingFeeRate: string;

  baseToken: Address;
  quoteToken: Address;
  dpToken: Address;
  creator: Address;
  poolCreateTimes: string;
}
