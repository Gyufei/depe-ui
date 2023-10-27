import NP from "number-precision";
import { useMemo } from "react";
import { format } from "date-fns";

import { IPosition } from "../types/position";
import { IPool } from "../types/pool";
import { formatNum } from "../utils/number";
import { usePoolFormat } from "./use-pool-format";
import { useTokenPrice } from "./contract/use-token-price";
import { formatUnits } from "viem";

export function usePositionFormat(position: IPosition, pool: IPool) {
  const positionPool = usePoolFormat(pool);
  const { baseToken, quoteToken } = positionPool;

  const currentPriceRes = useTokenPrice(
    quoteToken?.address || null,
    quoteToken?.decimals,
  );

  const leverage = useMemo(() => {
    return Number(position?.leverage || 0) / 100;
  }, [position?.leverage]);

  const size = useMemo(() => {
    const sizeVal = formatUnits(
      BigInt(position?.positionSize || 0),
      quoteToken?.decimals || 18,
    );
    return sizeVal;
  }, [position?.positionSize, quoteToken?.decimals]);

  const marginAmount = useMemo(
    () =>
      formatUnits(
        BigInt(position?.marginAmount || 0),
        baseToken?.decimals || 6,
      ),
    [position?.marginAmount, baseToken?.decimals],
  );

  // Todo: open on with history
  const openOn = useMemo(() => {
    if (!position?.updateTimestamp) return null;
    return new Date(Number(position?.updateTimestamp) * 1000);
  }, [position?.updateTimestamp]);

  const debtAmount = useMemo(() => {
    const debt = formatUnits(
      BigInt(position?.debtAmount || 0),
      baseToken?.decimals || 6,
    );
    return debt;
  }, [position?.debtAmount, baseToken?.decimals]);

  const openPrice = useMemo(() => {
    const price = NP.divide(debtAmount, size);
    return price;
  }, [debtAmount, size]);

  const pnlAmount = useMemo(() => {
    if (!currentPriceRes.data.value) return "";

    const pnlA = NP.minus(
      NP.times(currentPriceRes.data.value, size),
      debtAmount,
    );

    return pnlA;
  }, [currentPriceRes.data, size, debtAmount]);

  const pnlPercent = useMemo(() => {
    if (!debtAmount || !leverage || !pnlAmount) return "";
    const M1 = NP.divide(debtAmount, leverage);
    const pnlP = NP.divide(pnlAmount, M1);
    const percent = NP.times(pnlP, 100);

    return percent;
  }, [debtAmount, leverage, pnlAmount]);

  const pendingFundingFee = useMemo(() => {
    return NP.divide(
      position?.pendingFundingFee || 0,
      10 ** (baseToken?.decimals || 6),
    );
  }, [position?.pendingFundingFee, baseToken?.decimals]);

  const apr = useMemo(() => {
    return NP.divide(position?.apr || 0, 10 ** 4);
  }, [position?.apr]);

  return {
    ...positionPool,
    currentPriceRes,
    leverage,
    size: {
      value: size,
      formatted: formatNum(size, 3),
    },
    marginAmount: {
      value: marginAmount,
      formatted: formatNum(marginAmount),
    },
    openPrice: {
      value: openPrice,
      formatted: formatNum(openPrice, 3),
    },
    debtAmount: {
      value: debtAmount,
      formatted: formatNum(debtAmount),
    },
    pnlAmount: {
      value: pnlAmount,
      formatted: formatNum(pnlAmount),
    },
    pnlPercent: {
      value: pnlPercent,
      formatted: formatNum(pnlPercent),
    },
    openOn: {
      value: openOn,
      formatted: openOn ? format(openOn, "LLL dd, yyyy") : "",
    },
    pendingFundingFee: {
      value: pendingFundingFee,
      formatted: formatNum(pendingFundingFee),
    },
    apr: {
      value: apr,
      formatted: formatNum(apr),
    },
  };
}
