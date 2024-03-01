import { IPool } from "../../types/pool";
import { useMemo } from "react";
import { useTokensInfo } from "../api/use-token-info";
import { formatNum } from "../../utils/number";

export function usePoolRemainingTokenAmount(pool: IPool | null) {
  const [baseToken] = useTokensInfo([pool?.baseToken || null]);

  const remainTokenRes = {
    data: '1',
  };

  const dataValue = useMemo(() => {
    if (!remainTokenRes.data || !pool || !baseToken) return null;
    // const unitVal = formatUnits(remainTokenRes.data, baseToken.decimals);
    const unitVal = remainTokenRes.data;

    return unitVal;
  }, [remainTokenRes.data, baseToken, pool]);

  const dataFormatted = useMemo(() => {
    if (!dataValue) return null;
    const fmtVal = formatNum(dataValue);
    return fmtVal;
  }, [dataValue]);

  return {
    ...remainTokenRes,
    data: {
      value: dataValue,
      formatted: dataFormatted,
    },
  };
}
