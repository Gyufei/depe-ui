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

  const { marginAmount, size, pnlAmount, pendingFundingFee, apr, debtAmount } =
    usePositionFormat(position, pool);

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

    const marginPercentage = NP.times(marginAmount.value || 0, sizePercentage);
    const payout = NP.plus(pnlAmount.value || 0, marginPercentage);

    const nowTimestamp = (new Date().getTime() / 1000).toFixed();
    const durationTime = NP.minus(nowTimestamp, position.updateTimestamp);
    const durationDays = NP.divide(durationTime, 60 * 60 * 24);

    const aprOfDay = NP.divide(apr.value, 365);
    const durationApr = NP.times(aprOfDay, durationDays);
    const fundingFee = NP.times(debtAmount.value || 0, durationApr);

    const withFundPayout = NP.minus(
      payout,
      NP.plus(fundingFee, pendingFundingFee.value!),
    );

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
