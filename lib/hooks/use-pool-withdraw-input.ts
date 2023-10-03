import NP from "number-precision";
import { useEffect, useState } from "react";
import { parseUnits } from "viem";

import { IPool } from "../types/pool";
import { usePoolWithdraw } from "./contract/use-pool-withdraw";
import { usePoolFormat } from "./use-pool-format";

export function usePoolWithdrawInput(pool: IPool, assetValue: string) {
  const [inputVal, setInputVal] = useState("");
  const [btnText, setBtnText] = useState("Confirm");
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const { baseToken } = usePoolFormat(pool);

  const { isLoading: isLoading, write: writeAction } = usePoolWithdraw(
    pool.poolAddr,
  );

  const handleBtnClick = () => {
    if (!pool) return;
    if (!baseToken) return;
    if (!inputVal) return;
    if (isLoading) return;

    const amount = parseUnits(inputVal, baseToken?.decimals);
    writeAction(amount);
  };

  const handleInputValChange = (value: string) => {
    setInputVal(value);
  };

  useEffect(() => {
    if (!inputVal) {
      setIsBtnDisabled(true);
      return;
    }

    if (NP.minus(inputVal || 0, assetValue || 0) > 0) {
      setBtnText(`Insufficient ${baseToken?.symbol}`);
      setIsBtnDisabled(true);
      return;
    }

    setIsBtnDisabled(false);
    setBtnText("Confirm");
  }, [inputVal, assetValue, baseToken?.symbol]);

  return {
    btnText,
    isBtnDisabled,
    isLoading,
    inputVal,
    handleBtnClick,
    handleInputValChange,
  };
}
