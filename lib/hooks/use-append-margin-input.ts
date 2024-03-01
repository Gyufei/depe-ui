import { useEffect, useState } from "react";
import { IPool } from "../types/pool";
import { IPosition } from "../types/position";
import { useTokenBalance } from "./contract/use-token-balance";
import { useAppendMargin } from "./contract/use-append-margin";
import { useTokensInfo } from "./api/use-token-info";

export function useAppendMarginInput(pool: IPool, position: IPosition) {
  const [inputVal, setInputVal] = useState("");

  const [baseToken] = useTokensInfo([pool.baseToken]);

  const balanceData = useTokenBalance(baseToken?.address || null);

  const { isLoading, write } = useAppendMargin(
    pool.poolAddr,
    position.positionAddr,
    baseToken,
  );

  const [btnText, setBtnText] = useState("Confirm");
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const handleBtnClick = () => {
    // const amount = parseUnits(inputVal, baseToken?.decimals || 18);
    const amount = inputVal;
    write(amount);
  };

  useEffect(() => {
    if (!baseToken?.address) {
      setIsBtnDisabled(true);
      return;
    }

    if (!inputVal) {
      setIsBtnDisabled(true);
      return;
    }

    setIsBtnDisabled(false);
    setBtnText("Confirm");
  }, [baseToken, inputVal]);

  const handleInputValChange = (value: string) => {
    setInputVal(value);
  };

  return {
    inputVal,
    isLoading,
    isBtnDisabled,
    btnText,
    handleBtnClick,
    handleInputValChange,
    balanceData,
  };
}
