import { useEffect, useState } from "react";
import { useClusterConfig } from "./common/use-cluster-config";
import { usePositionFormat } from "./use-position-format";
import { IPool } from "../types/pool";
import { IPosition } from "../types/position";
import { usePoolRemainingTokenAmount } from "./contract/use-pool-remaining-token-amount";
import { formatNum } from "../utils/number";
import { useDebouncedCallback } from "use-debounce";
import { useTokenBalance } from "./contract/use-token-balance";
import { useIncreasePosition } from "./contract/use-increase-position";

export function useIncreasePositionInput(pool: IPool, position: IPosition) {
  const { clusterConfig } = useClusterConfig();

  const { baseToken, quoteToken, leverage } = usePositionFormat(position, pool);

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
  const { data: poolTokenAmount } = usePoolRemainingTokenAmount(pool);

  const handleBtnClick = () => {
    if (isLoading) return;
    if (!inputVal) return;
    if (!amountInMax) return;

    write(inputVal);
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
    if (!clusterConfig) return;
    if (!pool) return;
    if (!leverage) return;
    if (!baseToken || !quoteToken) return;
    if (!poolTokenAmount.value) return;

    async function getMax() {
      setCanIncreaseMax({
        value: "111",
        formatted: formatNum("111"),
      });
    }

    getMax();
  }, [clusterConfig, pool, leverage, baseToken, quoteToken, poolTokenAmount]);

  const debounceCalcIncreasePayout = useDebouncedCallback((value) => {
    calcIncreasePayout(value);
  }, 1000);

  const calcIncreasePayout = async (quoteV: string) => {
    if (!clusterConfig) return;
    if (!baseToken || !quoteToken) return;
    if (!quoteV) return;
    if (!leverage) return;
    if (!pool) return;

    setAmountInMax(BigInt(1));
    setEstPayout({
      value: "111",
      formatted: formatNum("111"),
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
