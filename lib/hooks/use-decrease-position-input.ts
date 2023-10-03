import NP from "number-precision";
import { useEffect, useState } from "react";
import { IPool } from "../types/pool";
import { IPosition } from "../types/position";
import { usePositionFormat } from "./use-position-format";
import { formatNum } from "../utils/number";
import { useDecreasePosition } from "./contract/use-decrease-position";

export function useDecreasePositionInput(pool: IPool, position: IPosition) {
  const [inputVal, setInputVal] = useState("");
  const [btnText, setBtnText] = useState("Submit Order");
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [estPayout, setEstPayout] = useState<{
    value: string;
    formatted: string;
  } | null>(null);

  const { marginAmount, size, pnlAmount, fundingFeeRate } = usePositionFormat(
    position,
    pool,
  );

  const { isLoading, write: writeAction } = useDecreasePosition(pool, position);

  const handleBtnClick = () => {
    if (!inputVal) return;
    if (isLoading) return;

    writeAction(inputVal);
  };

  const handleInputValChange = (value: string) => {
    setInputVal(value);

    const payout = calcEstPayout(value);
    setEstPayout(payout);
  };

  const calcEstPayout = (value: string) => {
    if (!value) return null;
    if (!pool) return null;

    const sizePercentage = NP.divide(value, size.value);
    if (sizePercentage === 0 || sizePercentage > 1) return null;

    const marginPercentage = NP.times(marginAmount.value, sizePercentage);
    const payout = NP.plus(pnlAmount.value, marginPercentage);
    const withFundPayout = NP.times(payout, NP.minus(1, fundingFeeRate!));

    return {
      value: withFundPayout.toString(),
      formatted: formatNum(withFundPayout),
    };
  };

  useEffect(() => {
    if (!inputVal) {
      setIsBtnDisabled(true);
      return;
    }

    if (NP.minus(inputVal, size.value) > 0) {
      setIsBtnDisabled(true);
      setBtnText(`Insufficient liquidity`);
      return;
    }

    setIsBtnDisabled(false);
    setBtnText("Submit Order");
  }, [inputVal, size.value]);

  return {
    inputVal,
    isLoading,
    btnText,
    isBtnDisabled,
    estPayout,
    handleInputValChange,
    handleBtnClick,
  };
}
