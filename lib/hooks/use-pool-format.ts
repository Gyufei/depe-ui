import { useMemo } from "react";
import { addSeconds, formatDuration, intervalToDuration } from "date-fns";
import { formatUnits } from "viem";

import { IPool } from "../types/pool";
import { useTokensInfo } from "./use-token-info";

export function usePoolFormat(pool: IPool | null) {
  const [baseToken, quoteToken] = useTokensInfo([
    pool?.baseToken || null,
    pool?.quoteToken || null,
  ]);

  const leverage = useMemo(
    () => (pool?.maxleverage ? formatUnits(BigInt(pool.maxleverage), 2) : null),
    [pool],
  );

  const expirationFull = useMemo(() => {
    if (!pool) return null;

    const poolCreateTime = new Date(parseInt(pool.poolCreateTimes) * 1000);
    const expirationDate = addSeconds(
      poolCreateTime,
      parseInt(pool.durationDays),
    );

    const intervalDuration = intervalToDuration({
      start: new Date(),
      end: expirationDate,
    });

    const readableTime = formatDuration(intervalDuration, {
      format: ["days", "hours"],
    });

    const rTime = readableTime
      .replace("days", "Days")
      .replace("hours", "Hours");

    return rTime;
  }, [pool]);

  const expirationSimple = useMemo(() => {
    if (!expirationFull) return null;

    const rTime = expirationFull.replace("Days", "d").replace("Hours", "h");
    return rTime;
  }, [expirationFull]);

  return {
    baseToken,
    quoteToken,
    leverage,
    expiration: {
      full: expirationFull,
      simple: expirationSimple,
    },
  };
}
