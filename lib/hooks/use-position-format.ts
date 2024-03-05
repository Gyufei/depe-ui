import NP from "number-precision";
import { useMemo } from "react";
import { format } from "date-fns";

import { IPosition } from "../types/position";
import { IPool } from "../types/pool";
import { formatNum } from "../utils/number";
import { usePoolFormat } from "./use-pool-format";
import { useTokenPrice } from "./contract/use-token-price";

export function usePositionFormat(position: IPosition, pool: IPool) {
  const positionPool = usePoolFormat(pool);
  const { baseToken, quoteToken } = positionPool;

  const currentPriceRes = useTokenPrice(
    quoteToken?.address || null,
    quoteToken?.decimals,
  );

  const leverage = useMemo(() => getLeverage(position), [position]);

  const size = useMemo(
    () => getSize(position, quoteToken?.decimals),
    [position, quoteToken?.decimals],
  );

  const marginAmount = useMemo(
    () => getMarginAmount(position, baseToken?.decimals),
    [position, baseToken?.decimals],
  );

  // Todo: open on with history
  const openOn = useMemo(() => getOpenOn(position), [position]);

  const debtAmount = useMemo(
    () => getDebtAmount(position, baseToken?.decimals),
    [position, baseToken?.decimals],
  );

  const openPrice = useMemo(
    () => getOpenPrice(debtAmount.value, size.value),
    [debtAmount, size],
  );

  const pendingFundingFee = useMemo(
    () => getPendingFeeRate(position, baseToken?.decimals),
    [position, baseToken?.decimals],
  );

  const pnlAmount = useMemo(
    () =>
      getPnlAmount(currentPriceRes.data?.value, size.value, debtAmount.value),
    [currentPriceRes.data, size, debtAmount],
  );

  const pnlPercent = useMemo(
    () => getPnlPercent(debtAmount.value, leverage, pnlAmount.value),
    [debtAmount, leverage, pnlAmount],
  );

  const apr = useMemo(() => getApr(position), [position]);

  return {
    ...positionPool,
    currentPriceRes,
    leverage,
    size,
    marginAmount,
    debtAmount,
    openOn,
    openPrice,
    pnlAmount,
    pnlPercent,
    pendingFundingFee,
    apr,
  };
}

function getLeverage(position: IPosition) {
  return Number(position?.leverage || 0) / 100;
}

function getSize(position: IPosition, decimals: number = 6) {
  // const val = formatUnits(BigInt(position?.positionSize || 0), decimals);
  const val = position?.positionSize;
  console.info(decimals);

  return {
    value: val,
    formatted: formatNum(val, 3),
  };
}

function getMarginAmount(position: IPosition, decimals: number = 6) {
  if (!position?.marginAmount) return {};

  // const val = formatUnits(BigInt(position?.marginAmount), decimals);
  const val = position?.marginAmount;
  console.log(decimals);
  return {
    value: val,
    formatted: formatNum(val),
  };
}

function getOpenOn(position: IPosition) {
  if (!position?.updateTimestamp) return {};

  const openOn = new Date(Number(position?.updateTimestamp) * 1000);
  return {
    value: openOn,
    formatted: openOn ? format(openOn, "LLL dd, yyyy") : "",
  };
}

function getDebtAmount(position: IPosition, decimals: number = 6) {
  if (!position?.debtAmount) return {};

  // const debt = formatUnits(BigInt(position?.debtAmount), decimals);
  const debt = position?.debtAmount;
  console.log(decimals);

  return {
    value: debt,
    formatted: formatNum(debt),
  };
}

function getPendingFeeRate(position: IPosition, decimals: number = 6) {
  const val = NP.divide(
    position?.pendingFundingFee || 0,
    10 ** (decimals || 6),
  );

  return {
    value: val,
    formatted: formatNum(val),
  };
}

function getOpenPrice(debtAmount: string | undefined, size: string) {
  if (!debtAmount || !size) return {};

  const price = NP.divide(debtAmount, size);

  return {
    value: price,
    formatted: formatNum(price, 3),
  };
}

function getPnlAmount(
  price: string | undefined,
  size: string,
  debtAmount: string | undefined,
) {
  if (!price || !debtAmount || !size) return {};

  const pnlA = NP.minus(NP.times(price, size), debtAmount);

  return {
    value: pnlA,
    formatted: formatNum(pnlA),
  };
}

function getPnlPercent(
  debtAmount: string | undefined,
  leverage: number | undefined,
  pnlAmount: number | undefined,
) {
  if (!debtAmount || !leverage || !pnlAmount) return {};

  const M1 = NP.divide(debtAmount, leverage);
  const pnlP = NP.divide(pnlAmount, M1);
  const percent = NP.times(pnlP, 100);

  return {
    value: percent,
    formatted: formatNum(percent),
  };
}

function getApr(position: IPosition) {
  const val = NP.divide(position?.apr || 0, 10 ** 4);
  return {
    value: val,
    formatted: formatNum(val),
  };
}
