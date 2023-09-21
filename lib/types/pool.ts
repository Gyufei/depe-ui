import { AddressType } from "./address";

export enum EPoolStatus {
  genesis,
  running,
  liquidating,
  ended,
}

export interface IPool {
  poolId: string;
  poolStatus: EPoolStatus;
  poolAddr: AddressType;

  durationDays: string;
  maxleverage: string;
  maxCapacity: string;
  tradingFeeRate: string;
  fundingFeeRate: string;

  baseToken: AddressType;
  quoteToken: AddressType;
  dpToken: AddressType;
  creator: AddressType;
  poolCreateTimes: string;
}
