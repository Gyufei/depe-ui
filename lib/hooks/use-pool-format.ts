import NP from "number-precision";
import { useMemo } from "react";
import { addSeconds, formatDuration, intervalToDuration } from "date-fns";
import { IPool } from "../types/pool";
import { useTokensInfo } from "./api/use-token-info";

export function usePoolFormat(pool: IPool | null) {
  const [baseToken, quoteToken] = useTokensInfo([
    pool?.baseToken || null,
    pool?.quoteToken || null,
  ]);

  const leverage = useMemo(
    () => (pool?.maxleverage ? NP.divide(pool.maxleverage, 100) : null),
    [pool?.maxleverage],
  );

  const tradingFeeRate = useMemo(
    () =>
      pool?.tradingFeeRate ? NP.divide(pool.tradingFeeRate, 10 ** 6) : null,
    [pool?.tradingFeeRate],
  );

  const fundingFeeRate = useMemo(
    () =>
      pool?.fundingFeeRate ? NP.divide(pool.fundingFeeRate, 10 ** 6) : null,
    [pool?.fundingFeeRate],
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
      format: ["months", "days", "hours"],
    });

    const rTime = readableTime
      .replace("months", "Months")
      .replace("month", "Month")
      .replace("days", "Days")
      .replace("day", "Day")
      .replace("hours", "Hours")
      .replace("hour", "Hour");

    return rTime;
  }, [pool]);

  const expirationSimple = useMemo(() => {
    if (!expirationFull) return null;

    const rTime = expirationFull
      .replace("Months", "m")
      .replace("Month", "m")
      .replace("Days", "d")
      .replace("Day", "d")
      .replace("Hours", "h")
      .replace("Hour", "h");
    return rTime;
  }, [expirationFull]);

  return {
    baseToken,
    quoteToken,
    leverage,
    tradingFeeRate,
    expiration: {
      full: expirationFull,
      simple: expirationSimple,
    },
    fundingFeeRate,
  };
}
