import { useMemo } from "react";

import { formatNum } from "../../utils/number";

export function useTokenPrice(
  tokenAddress: string | null,
  decimals: number = 18,
) {
  const priceRes = {
    isLoading: false,
    data: "1",
  };

  const dataValue = useMemo(() => {
    if (!tokenAddress || !priceRes.data) return;
    // const unitVal = formatUnits(priceRes.data, decimals);
    const unitVal = priceRes.data;
    console.log(decimals);
    return unitVal;
  }, [tokenAddress, priceRes.data, decimals]);

  const dataFormatted = useMemo(() => {
    if (!dataValue) return;
    const fmtVal = formatNum(dataValue);

    return fmtVal;
  }, [dataValue]);

  return {
    ...priceRes,
    data: {
      value: dataValue,
      formatted: dataFormatted,
    },
  };
}
