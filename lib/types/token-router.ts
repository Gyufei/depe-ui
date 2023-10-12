import { Address } from "viem";

export interface TokenRouters {
  [token0: Address]: {
    [token1: Address]: Array<{
      path: Address[];
      fee: number[];
    }>;
  };
}
