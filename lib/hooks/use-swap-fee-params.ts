import NP from "number-precision";
import { IPool } from "../types/pool";
import { useCallback } from "react";

export function useSwapFeeParams() {
  const calcFeeParams = useCallback(
    (
      leverage: number,
      slippage: string,
      tradingFeeRate: IPool["tradingFeeRate"],
    ) => {
      const slippageVal = NP.divide(slippage, 100);
      const tradingFee = NP.divide(tradingFeeRate, 10 ** 6);
      const withLeverageFee = NP.times(tradingFee, leverage);
      const feeParams = NP.times(
        NP.minus(1, slippageVal),
        NP.plus(1, withLeverageFee),
      );

      return feeParams;
    },
    [],
  );

  return {
    calcFeeParams,
  };
}
