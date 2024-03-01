import { IPool } from "../../types/pool";
import { useMemo } from "react";
import { formatNum } from "../../utils/number";
import { useTokensInfo } from "../api/use-token-info";

export function usePendingReward(pool: IPool | null) {
  const [baseToken] = useTokensInfo([pool?.baseToken || null]);

  const rewardRes = {
    isLoading: false,
    data: "1",
  };

  const dataValue = useMemo(() => {
    if (!rewardRes.data || !pool || !baseToken || rewardRes.isLoading)
      return null;
    // const unitVal = formatUnits(rewardRes.data[0], baseToken.decimals);
    const unitVal = rewardRes.data[0];
    console.log(baseToken.decimals);

    return unitVal;
  }, [rewardRes, baseToken, pool]);

  const dataFormatted = useMemo(() => {
    if (!dataValue) return null;
    const fmtVal = formatNum(dataValue);
    return fmtVal;
  }, [dataValue]);

  return {
    ...rewardRes,
    data: {
      value: dataValue,
      formatted: dataFormatted,
    },
  };
}
