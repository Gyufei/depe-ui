import { useMemo } from "react";
import { IPosition } from "../types/position";
import { IPool } from "../types/pool";
import { formatNum } from "../format/number";
import { formatUnits } from "viem";
import { usePoolFormat } from "./use-pool-format";

export function usePositionFormat(position: IPosition, pool: IPool) {
  const { baseToken, quoteToken, expiration } = usePoolFormat(pool);

  const leverage = useMemo(() => Number(position.leverage) / 100, [position]);

  const size = useMemo(
    () =>
      formatUnits(BigInt(position.positionSize), quoteToken?.decimals || 18),
    [position, quoteToken?.decimals],
  );

  const marginAmount = useMemo(
    () =>
      formatNum(
        formatUnits(BigInt(position.marginAmount), baseToken?.decimals || 18),
        2,
        true,
      ),
    [position, baseToken?.decimals],
  );

  return {
    quoteToken,
    baseToken,
    expiration,
    leverage,
    size,
    marginAmount,
  };
}
