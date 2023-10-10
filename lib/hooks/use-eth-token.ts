import { parseEther } from "viem";
import { IToken } from "../types/token";
import { useCallback } from "react";

export function useSpecialToken() {
  const checkIsUSDT = useCallback((token: IToken | null) => {
    if (!token) return false;
    return token.symbol === "USDT";
  }, []);

  const checkIsEth = useCallback((token: IToken | null) => {
    if (!token) return false;
    return token.symbol === "ETH";
  }, []);

  const getEthTxValueParams = useCallback(
    (token: IToken | null, amount: string | null): any => {
      if (!checkIsEth(token) || !amount) return {};

      return {
        value: parseEther(amount),
      };
    },
    [checkIsEth],
  );

  return {
    checkIsEth,
    checkIsUSDT,
    getEthTxValueParams,
  };
}
