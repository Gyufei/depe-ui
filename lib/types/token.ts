import { Address } from "viem";

export interface IToken {
  address: Address;
  [key: string]: any;
  name: string;
  symbol: string;
  decimals: number;
  chainId: number;
  logoURI: string;
}
