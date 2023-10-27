import NP from "number-precision";
import { useMemo } from "react";
import { IPool } from "../types/pool";
import { useTokensInfo } from "./api/use-token-info";
import { calculateTime } from "../utils/common";

function getLeverage(pool: IPool | null) {
  return pool?.maxleverage ? NP.divide(pool.maxleverage, 100) : null;
}

function getTradingFeeRate(pool: IPool | null) {
  return pool?.tradingFeeRate ? NP.divide(pool.tradingFeeRate, 10 ** 6) : null;
}

function getFundingFeeRate(pool: IPool | null) {
  return pool?.fundingFeeRate ? NP.divide(pool.fundingFeeRate, 10 ** 6) : null;
}

function getEndTime(pool: IPool | null) {
  if (!pool?.poolCreateTimes) return null;

  const endTime =
    (Number(pool?.poolCreateTimes) + Number(pool.durationDays)) * 1000;

  return endTime;
}

function getExpiration(pool: IPool | null) {
  if (!pool?.poolCreateTimes) return {};

  const poolCreateTime = parseInt(pool.poolCreateTimes);
  const past = new Date().getTime() / 1000 - poolCreateTime;

  const duration = calculateTime(past);

  if (!duration) {
    return {
      value: null,
      full: null,
      simple: null,
    };
  }

  const daySuffix = duration.days > 1 ? "Days" : "Day";
  const hourSuffix = duration.hours > 1 ? "Hours" : "Hour";

  const fmt = `${duration.days} ${daySuffix} ${duration.hours} ${hourSuffix}`;
  const simpleFmt = fmt
    .replace("Days", "d")
    .replace("Day", "d")
    .replace("Hours", "h")
    .replace("Hour", "h");

  return {
    value: duration,
    full: fmt,
    simple: simpleFmt,
  };
}

export function usePoolFormat(pool: IPool | null) {
  const [baseToken, quoteToken] = useTokensInfo([
    pool?.baseToken || null,
    pool?.quoteToken || null,
  ]);

  const leverage = useMemo(() => getLeverage(pool), [pool]);
  const tradingFeeRate = useMemo(() => getTradingFeeRate(pool), [pool]);
  const fundingFeeRate = useMemo(() => getFundingFeeRate(pool), [pool]);
  const endTime = useMemo(() => getEndTime(pool), [pool]);
  const expiration = useMemo(() => getExpiration(pool), [pool]);

  return {
    baseToken,
    quoteToken,
    leverage,
    tradingFeeRate,
    expiration,
    endTime,
    fundingFeeRate,
  };
}
