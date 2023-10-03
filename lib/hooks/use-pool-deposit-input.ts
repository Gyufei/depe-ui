import { useEffect, useState } from "react";
import { IPool } from "../types/pool";
import { useTokenBalance } from "./contract/use-token-balance";
import { usePoolDeposit } from "./contract/use-pool-deposit";
import { usePoolFormat } from "./use-pool-format";
import { parseUnits } from "viem";

export function usePoolDepositInput(pool: IPool) {
  const [inputVal, setInputVal] = useState("");
  const [btnText, setBtnText] = useState("Confirm");
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const { baseToken } = usePoolFormat(pool);
  const { data: balanceData } = useTokenBalance(baseToken?.address || null);

  const { isLoading: isLoading, write: writeAction } = usePoolDeposit(
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
