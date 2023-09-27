import NP from "number-precision";
import { useEffect, useState } from "react";
import { IPool } from "../types/pool";
import { IPosition } from "../types/position";
import { usePositionFormat } from "./use-position-format";
import { formatNum } from "../utils/number";
import { useDecreasePosition } from "./use-decrease-position";

export function useDecreasePositionInput(pool: IPool, position: IPosition) {
  const [decreaseVal, setDecreaseVal] = useState("");
  const [dBtnText, setDBtnText] = useState("Submit Order");
  const [dBtnDisabled, setDBtnDisabled] = useState(false);
  const [decreasePayout, setDecreasePayout] = useState<{
    value: string;
    formatted: string;
  } | null>(null);

  const { marginAmount, size, pnlAmount, fundingFeeRate } = usePositionFormat(
    position,
    pool,
  );

  const { isLoading: dBtnLoading, write: decreaseAction } = useDecreasePosition(
    pool,
    position,
    decreaseVal,
  );

  const handleDBtnClick = () => {
    if (!decreaseVal) return;
    if (dBtnLoading) return;

    decreaseAction();
  };

  const handleDecreaseValueChange = (value: string) => {
    setDecreaseVal(value);

    const payout = calcDecreasePayout(value);
    setDecreasePayout(payout);
  };

  const calcDecreasePayout = (value: string) => {
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
    if (!decreaseVal) {
      setDBtnDisabled(true);
      return;
    }

    if (NP.minus(decreaseVal, size.value) > 0) {
      setDBtnDisabled(true);
      setDBtnText(`Insufficient liquidity`);
      return;
    }

    setDBtnDisabled(false);
    setDBtnText("Submit Order");
  }, [decreaseVal]);

  return {
    decreaseVal,
    dBtnLoading,
    dBtnText,
    dBtnDisabled,
    decreasePayout,
    handleDecreaseValueChange,
    handleDBtnClick,
  };
}
