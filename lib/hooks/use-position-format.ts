import NP from "number-precision";
import { useMemo } from "react";
import { IPosition } from "../types/position";
import { IPool } from "../types/pool";
import { formatNum } from "../utils/number";
import { usePoolFormat } from "./use-pool-format";
import { useTokenPrice } from "./contract/use-token-price";
import { format } from "date-fns";

export function usePositionFormat(position: IPosition, pool: IPool) {
  const positionPool = usePoolFormat(pool);
  const { baseToken, quoteToken } = positionPool;

  const currentPriceRes = useTokenPrice(
    quoteToken?.address || null,
    quoteToken?.decimals,
  );

  const leverage = useMemo(
    () => Number(position.leverage) / 100,
    [position.leverage],
  );

  const size = useMemo(() => {
    const sizeVal = NP.divide(
      position.positionSize,
      10 ** (quoteToken?.decimals || 18),
    );
    return sizeVal;
  }, [position.positionSize, quoteToken?.decimals]);

  const sizeFormat = useMemo(() => {
    return formatNum(size, 3);
  }, [size]);

  const marginAmount = useMemo(
    () =>
      String(
        NP.divide(position.marginAmount, 10 ** (baseToken?.decimals || 6)),
      ),
    [position.marginAmount, baseToken?.decimals],
  );

  const marginAmountFormat = useMemo(
    () => formatNum(marginAmount),
    [marginAmount],
  );

  const openOn = useMemo(() => {
    return new Date(Number(position.updateTimestamp) * 1000);
  }, [position.updateTimestamp]);

  const openOnFormat = useMemo(() => {
    return format(openOn, "LLL dd, yyyy");
  }, [openOn]);

  const debtAmount = useMemo(() => {
    const debt = NP.divide(
      position.debtAmount,
      10 ** (baseToken?.decimals || 6),
    );
    return debt;
  }, [position.debtAmount, baseToken?.decimals]);

  const openPrice = useMemo(() => {
    const price = NP.divide(debtAmount, size);
    return price;
  }, [debtAmount, size]);

  const openPriceFormat = useMemo(() => formatNum(openPrice), [openPrice]);

  const pnlAmount = useMemo(() => {
    if (!currentPriceRes.data.value) return "";

    const pnlA = NP.minus(
      NP.times(currentPriceRes.data.value, size),
      debtAmount,
    );

    return pnlA;
  }, [currentPriceRes.data, size, debtAmount]);

  const pnlAmountFormat = useMemo(() => formatNum(pnlAmount), [pnlAmount]);

  const pnlPercent = useMemo(() => {
    const M1 = NP.divide(debtAmount, leverage);
    const pnlP = NP.divide(pnlAmount, M1);
    const percent = NP.times(pnlP, 100);

    return percent;
  }, [debtAmount, leverage, pnlAmount]);

  const pnlPercentFormat = useMemo(() => formatNum(pnlPercent), [pnlPercent]);

  return {
    ...positionPool,
    currentPriceRes,
    leverage,
    size: {
      value: size,
      formatted: sizeFormat,
    },
    marginAmount: {
      value: marginAmount,
      formatted: marginAmountFormat,
    },
    openPrice: {
      value: openPrice,
      formatted: openPriceFormat,
    },
    pnlAmount: {
      value: pnlAmount,
      formatted: pnlAmountFormat,
    },
    pnlPercent: {
      value: pnlPercent,
      formatted: pnlPercentFormat,
    },
    openOn: {
      value: openOn,
      formatted: openOnFormat,
    },
  };
}
