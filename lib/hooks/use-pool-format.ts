import NP from "number-precision";
import { useMemo } from "react";
import { IPool } from "../types/pool";
import { useTokensInfo } from "./api/use-token-info";
import { calculateTime } from "../utils/common";

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

  const endTime = useMemo(() => {
    if (!pool?.poolCreateTimes) return null;

    const endTime =
      (Number(pool?.poolCreateTimes) + Number(pool.durationDays)) * 1000;

    return endTime;
  }, [pool?.poolCreateTimes, pool?.durationDays]);

  const expiration = useMemo(() => {
    if (!pool?.poolCreateTimes) return null;

    const poolCreateTime = parseInt(pool.poolCreateTimes);
    const past = new Date().getTime() / 1000 - poolCreateTime;

    const duration = calculateTime(past);

    return duration;
  }, [pool?.poolCreateTimes]);

  const expirationFull = useMemo(() => {
    if (!expiration) return "";

    const daySuffix = expiration.days > 1 ? "Days" : "Day";
    const hourSuffix = expiration.hours > 1 ? "Hours" : "Hour";

    return `${expiration.days} ${daySuffix} ${expiration.hours} ${hourSuffix}`;
  }, [expiration]);

  const expirationSimple = useMemo(() => {
    if (!expirationFull) return null;

    const rTime = expirationFull
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
    endTime,
    fundingFeeRate,
  };
}
