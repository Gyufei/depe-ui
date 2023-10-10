import { Address } from "viem";

export interface IToken {
  address: Address;
  name: string;
  symbol: string;
  decimals: number;
  chainId: number;
  logoURI: string;
  ratingScore: string;
  [key: string]: any;
}
