import { useEffect, useState } from "react";
import { useChainConfig } from "./common/use-chain-config";
import { usePositionFormat } from "./use-position-format";
import { IPool } from "../types/pool";
import { IPosition } from "../types/position";
import { useSwapBaseCalc, useSwapQuoteCalc } from "./use-swap-calc";
import { usePoolRemainingTokenAmount } from "./contract/use-pool-remaining-token-amount";
import { useTokenRoutes } from "./api/use-token-routes";
import { DEFAULT_SLIPPAGE } from "../constant";
import { formatNum } from "../utils/number";
import { useDebouncedCallback } from "use-debounce";
import { useTokenBalance } from "./contract/use-token-balance";
import { useIncreasePosition } from "./contract/use-increase-position";

export function useIncreasePositionInput(pool: IPool, position: IPosition) {
  const { chainConfig } = useChainConfig();

  const { baseToken, quoteToken, leverage, tradingFeeRate } = usePositionFormat(
    position,
    pool,
  );
  const { encodeTokenPath } = useTokenRoutes();

  const [inputVal, setInputVal] = useState("");
  const [btnText, setBtnText] = useState("Submit Order");
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [amountInMax, setAmountInMax] = useState<bigint | null>(null);
  const [estPayout, setEstPayout] = useState<{
    value: string;
    formatted: string;
  } | null>(null);

  const { isLoading, write } = useIncreasePosition(pool, position);

  const { data: balanceData } = useTokenBalance(baseToken?.address || null);
  const { calcAmountInMax: calcBaseAInMax, calcQuoteToken } = useSwapBaseCalc();
  const { calcAmountInMax: calcQuoteAInMax, calcBaseToken } =
    useSwapQuoteCalc();
  const { data: poolTokenAmount } = usePoolRemainingTokenAmount(pool);

  const handleBtnClick = () => {
    if (isLoading) return;
    if (!inputVal) return;
    if (!amountInMax) return;

    write(inputVal, amountInMax, estPayout?.value || null);
  };

  const handleInputValChange = (value: string) => {
    setInputVal(value);
    debounceCalcIncreasePayout(value);
  };

  const [canIncreaseMax, setCanIncreaseMax] = useState<{
    value: string;
    formatted: string;
  } | null>(null);

  useEffect(() => {
    if (!chainConfig) return;
    if (!pool) return;
    if (!leverage) return;
    if (!baseToken || !quoteToken) return;
    if (!poolTokenAmount.value) return;

    async function getMax() {
      const aInMaxRes = calcBaseAInMax(
        poolTokenAmount.value!,
        baseToken!.decimals,
        leverage,
        DEFAULT_SLIPPAGE,
        tradingFeeRate!,
      );

      const ePath = encodeTokenPath(baseToken!.address, quoteToken!.address);
      if (!ePath) return;

      const max = await calcQuoteToken(
        aInMaxRes.aInMax,
        quoteToken!.decimals,
        ePath,
      );
      const maxFormatted = formatNum(max);

      setCanIncreaseMax({
        value: max,
        formatted: maxFormatted,
      });
    }

    getMax();
  }, [
    chainConfig,
    pool,
    leverage,
    baseToken,
    quoteToken,
    poolTokenAmount,
    calcBaseAInMax,
    calcQuoteToken,
    tradingFeeRate,
    encodeTokenPath,
  ]);

  const debounceCalcIncreasePayout = useDebouncedCallback((value) => {
    calcIncreasePayout(value);
  }, 1000);

  const calcIncreasePayout = async (quoteV: string) => {
    if (!chainConfig) return;
    if (!baseToken || !quoteToken) return;
    if (!quoteV) return;
    if (!leverage) return;
    if (!pool) return;

    const ePath = encodeTokenPath(
      baseToken!.address,
      quoteToken!.address,
      true,
    );
    if (!ePath) return;

    const aInMaxRes = await calcQuoteAInMax(
      quoteV,
      quoteToken!.decimals,
      ePath,
      DEFAULT_SLIPPAGE,
      baseToken!.decimals,
    );

    const baseVal = calcBaseToken(
      aInMaxRes.aInMax,
      baseToken!.decimals,
      leverage,
      DEFAULT_SLIPPAGE,
      tradingFeeRate!,
    );

    setAmountInMax(aInMaxRes.aInMaxWithSlippage);
    setEstPayout({
      value: baseVal,
      formatted: formatNum(baseVal),
    });
  };

  useEffect(() => {
    if (!inputVal) {
      setIsBtnDisabled(true);
      return;
    }

    if (
      canIncreaseMax?.value &&
      Number(inputVal) > Number(canIncreaseMax.value)
    ) {
      setIsBtnDisabled(true);
      setBtnText("Insufficient liquidity");
      return;
    }

    if (!estPayout) {
      setIsBtnDisabled(true);
      return;
    }

    setIsBtnDisabled(false);
    setBtnText("Submit Order");
  }, [inputVal, canIncreaseMax, estPayout]);

  return {
    btnText,
    isBtnDisabled,
    isLoading,
    inputVal,
    estPayout,
    canIncreaseMax,
    handleBtnClick,
    handleInputValChange,
    poolTokenAmount,
    balanceData,
  };
}
