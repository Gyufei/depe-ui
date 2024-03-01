import { useMemo } from "react";
import { useTokensInfo } from "../api/use-token-info";
import { useSpecialToken } from "../use-special-token";

export function useTokenBalance(tokenAddress: string | null) {
  const [tokenInfo] = useTokensInfo([tokenAddress || "0x"]);
  const { checkIsSol } = useSpecialToken();

  const isSol = useMemo(() => {
    return checkIsSol(tokenInfo);
  }, [checkIsSol, tokenInfo]);
  console.log(isSol);

  const balanceRes = {
    data: {
      value: 1,
      formatted: "1",
    },
  };

  const dataValue = useMemo(() => {
    if (!balanceRes.data) return undefined;

    const unitVal = balanceRes.data;

    return unitVal;
  }, [balanceRes.data]);

  return {
    ...balanceRes,

    data: balanceRes.data
      ? {
          ...balanceRes.data,
          value: dataValue,
        }
      : undefined,
  };
}
