import { useEffect, useState } from "react";
import { IPool } from "../types/pool";
import { useTokenBalance } from "./contract/use-token-balance";
import { usePoolDeposit } from "./contract/use-pool-deposit";
import { usePoolFormat } from "./use-pool-format";

export function usePoolDepositInput(pool: IPool) {
  const [inputVal, setInputVal] = useState("");
  const [btnText, setBtnText] = useState("Confirm");
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const { baseToken } = usePoolFormat(pool);
  const { data: balanceData } = useTokenBalance(baseToken?.address || null);

  const { isLoading: isLoading, write: writeAction } = usePoolDeposit(
    pool.poolAddr,
    baseToken,
  );

  const handleBtnClick = () => {
    console.log("------");
    console.log(123, pool, baseToken, inputVal, isLoading);
    if (!pool) return;
    if (!baseToken) return;
    if (!inputVal) return;
    if (isLoading) return;

    // const amount = parseUnits(inputVal, baseToken?.decimals);
    const amount = inputVal;
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

    setIsBtnDisabled(false);
    setBtnText("Confirm");
  }, [inputVal]);

  return {
    btnText,
    isBtnDisabled,
    isLoading,
    inputVal,
    handleBtnClick,
    handleInputValChange,
    balanceData,
  };
}
