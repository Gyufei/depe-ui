import { AddressType } from "./address";

export interface IToken {
  address: AddressType;
  [key: string]: any;
  name: string;
  symbol: string;
  decimals: number;
  chainId: number;
  logoURI: string;
}
