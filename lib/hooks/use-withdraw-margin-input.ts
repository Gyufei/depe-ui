import { useEffect, useState } from "react";
import { IPool } from "../types/pool";
import { IPosition } from "../types/position";
import { parseUnits } from "viem";
import { useWithdrawMargin } from "./contract/use-withdraw-margin";
import { usePositionFormat } from "./use-position-format";

export function useAppendMarginInput(pool: IPool, position: IPosition) {
  const { baseToken, marginAmount } = usePositionFormat(position, pool);

  const [inputVal, setInputVal] = useState("");

  const { isLoading, write } = useWithdrawMargin(
    pool.poolAddr,
    position.positionAddr,
  );

  const [btnText, setBtnText] = useState("Confirm");
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const handleInputValChange = (value: string) => {
    setInputVal(value);
  };

  const handleBtnClick = () => {
    const amount = parseUnits(inputVal, baseToken?.decimals || 18);
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

    if (Number(inputVal) > Number(marginAmount.value)) {
      setIsBtnDisabled(true);
      setBtnText(`Insufficient Margin`);
      return;
    }

    setIsBtnDisabled(false);
    setBtnText("Confirm");
  }, [baseToken, inputVal, marginAmount]);

  return {
    inputVal,
    isLoading,
    isBtnDisabled,
    btnText,
    handleBtnClick,
    handleInputValChange,
  };
}
