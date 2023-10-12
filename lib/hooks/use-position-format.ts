import NP from "number-precision";
import { useMemo } from "react";
import { format } from "date-fns";

import { IPosition } from "../types/position";
import { IPool } from "../types/pool";
import { formatNum } from "../utils/number";
import { usePoolFormat } from "./use-pool-format";
import { useTokenPrice } from "./contract/use-token-price";
import { formatUnits, parseUnits } from "viem";

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
  console.log(size);
  const sizeP = parseUnits(
    String(position.positionSize),
    quoteToken?.decimals || 18,
  );
  console.log(sizeP);
  console.log(formatUnits(sizeP, quoteToken?.decimals || 18));

  const marginAmount = useMemo(
    () =>
      String(
        NP.divide(position.marginAmount, 10 ** (baseToken?.decimals || 6)),
      ),
    [position.marginAmount, baseToken?.decimals],
  );

  const openOn = useMemo(() => {
    return new Date(Number(position.updateTimestamp) * 1000);
  }, [position.updateTimestamp]);

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

  const pnlAmount = useMemo(() => {
    if (!currentPriceRes.data.value) return "";

    const pnlA = NP.minus(
      NP.times(currentPriceRes.data.value, size),
      debtAmount,
    );

    return pnlA;
  }, [currentPriceRes.data, size, debtAmount]);

  const pnlPercent = useMemo(() => {
    const M1 = NP.divide(debtAmount, leverage);
    const pnlP = NP.divide(pnlAmount, M1);
    const percent = NP.times(pnlP, 100);

    return percent;
  }, [debtAmount, leverage, pnlAmount]);

  const pendingFundingFee = useMemo(() => {
    return NP.divide(
      position.pendingFundingFee,
      10 ** (baseToken?.decimals || 6),
    );
  }, [position.pendingFundingFee, baseToken?.decimals]);

  const apr = useMemo(() => {
    return NP.divide(position.apr, 10 ** 4);
  }, [position.apr]);

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
      formatted: format(openOn, "LLL dd, yyyy"),
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
