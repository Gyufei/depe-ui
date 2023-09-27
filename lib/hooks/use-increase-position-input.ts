import { useEffect, useState } from "react";
import { useChainConfig } from "./use-chain-config";
import { usePositionFormat } from "./use-position-format";
import { IPool } from "../types/pool";
import { IPosition } from "../types/position";
import { useSwapBaseCalc, useSwapQuoteCalc } from "./use-swap-calc";
import { usePoolRemainingTokenAmount } from "./use-pool-remaining-token-amount";
import { encodePath } from "../utils/web3";
import { DEFAULT_SLIPPAGE, UNISWAP_FEES } from "../constant";
import { formatNum } from "../utils/number";
import { useDebouncedCallback } from "use-debounce";
import { useTokenBalance } from "./use-token-balance";
import { useIncreasePosition } from "./use-increase-position";

export function useIncreasePositionInput(pool: IPool, position: IPosition) {
  const { chainConfig } = useChainConfig();

  const [increaseVal, setIncreaseVal] = useState("");
  const [iBtnText, setIBtnText] = useState("Submit Order");
  const [iBtnDisabled, setIBtnDisabled] = useState(false);

  const { baseToken, quoteToken, leverage, tradingFeeRate } = usePositionFormat(
    position,
    pool,
  );

  const [amountInMax, setAmountInMax] = useState<bigint | null>(null);
  const [increasePayout, setIncreasePayout] = useState<{
    value: string;
    formatted: string;
  } | null>(null);

  const { isLoading: iBtnLoading, write: increaseAction } = useIncreasePosition(
    pool,
    position,
    increaseVal,
    amountInMax || BigInt(0),
  );

  const { data: balanceObj } = useTokenBalance(baseToken?.address || null);
  const { calcAmountInMax: calcBase, calcQuoteToken } = useSwapBaseCalc();
  const { calcFeeParams, calcAmountInMax, calcBaseToken } = useSwapQuoteCalc();
  const { data: remainTokenAmount } = usePoolRemainingTokenAmount(pool);

  const handleIBtnClick = () => {
    if (!increaseVal) return;
    if (iBtnLoading) return;
    if (!amountInMax) return;

    increaseAction();
  };

  const handleIncreaseValueChange = (value: string) => {
    setIncreaseVal(value);
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
    if (!remainTokenAmount.value) return;

    async function getMax() {
      const feeParams = calcFeeParams(
        leverage,
        DEFAULT_SLIPPAGE,
        tradingFeeRate!,
      );
      const aInMax = calcBase(
        remainTokenAmount.value!,
        baseToken!.decimals,
        leverage,
        feeParams,
      );

      const ePath = encodePath(
        [baseToken!.address, quoteToken!.address],
        UNISWAP_FEES,
      );
      const max = await calcQuoteToken(aInMax, quoteToken!.decimals, ePath);
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
    remainTokenAmount,
    calcBase,
    calcFeeParams,
    calcQuoteToken,
    tradingFeeRate,
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

    const ePath = encodePath(
      [quoteToken!.address, baseToken!.address],
      UNISWAP_FEES,
    );
    const aInMax = await calcAmountInMax(quoteV, quoteToken!.decimals, ePath);

    const feeParams = calcFeeParams(
      leverage,
      DEFAULT_SLIPPAGE,
      tradingFeeRate!,
    );
    const baseVal = calcBaseToken(
      aInMax,
      baseToken!.decimals,
      leverage,
      feeParams,
    );

    setAmountInMax(aInMax);
    setIncreasePayout({
      value: baseVal,
      formatted: formatNum(baseVal),
    });
  };

  useEffect(() => {
    if (!increaseVal) {
      setIBtnDisabled(true);
      return;
    }

    setIBtnDisabled(false);
    setIBtnText("Submit Order");
  }, [increaseVal]);

  return {
    iBtnText,
    iBtnDisabled,
    iBtnLoading,
    increaseVal,
    increasePayout,
    canIncreaseMax,
    handleIBtnClick,
    handleIncreaseValueChange,
    remainTokenAmount,
    balanceObj,
  };
}
