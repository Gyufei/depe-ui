import { useMemo } from "react";
import NP from "number-precision";

import { formatNum } from "../utils/number";
import { usePoolAsset } from "./api/use-pool-asset";
import { IPool } from "../types/pool";
import { usePoolFormat } from "./use-pool-format";

export function usePoolParsedAsset(pool: IPool) {
  const { baseToken } = usePoolFormat(pool);

  const { dataMap: poolAssetMap, isLoading: isPoolAssetLoading } =
    usePoolAsset();

  const assetParsed = useMemo(() => {
    const assetVal = poolAssetMap[pool.poolAddr]?.amount || null;

    if (!baseToken || !assetVal)
      return {
        data: {
          value: "",
          formatted: "",
        },
        isLoading: isPoolAssetLoading,
      };

    const val = NP.divide(assetVal || 0, 10 ** baseToken?.decimals);
    const fmt = formatNum(val);

    return {
      data: {
        value: String(val),
        formatted: fmt,
      },
      isLoading: isPoolAssetLoading,
    };
  }, [pool, poolAssetMap, baseToken, isPoolAssetLoading]);

  return assetParsed;
}
