import { AddressType } from "./address";

export interface IPool {
  poolId: string;
  poolStatus: string;
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
