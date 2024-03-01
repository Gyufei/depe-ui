export interface IToken {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  chainId: number;
  logoURI: string;
  ratingScore: string;
  [key: string]: any;
}
