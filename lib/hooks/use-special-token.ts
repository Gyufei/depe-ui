import { useCallback } from "react";
import { IToken } from "../types/token";

export function useSpecialToken() {
  const checkIsSol = useCallback((token: IToken | null) => {
    if (!token) return false;
    return token.symbol === "SOL";
  }, []);

  return {
    checkIsSol,
  };
}
