import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";

import { useActivePanel } from "@/lib/hooks/use-active-panel";

import { useSwap } from "@/lib/hooks/use-swap";
import {
  SBaseTokenAmountAtom,
  SBaseTokenAtom,
  SBaseTokenBalanceAtom,
  SPoolAtom,
} from "@/lib/states/swap";
import { useOrderOverview } from "@/lib/hooks/use-order-overview";

import WithApproveBtn from "@/components/share/with-approve-btn";

export default function SwapBtn() {
  const { isActivePanel } = useActivePanel("Swap");

  const [btnText, setBtnText] = useState("Trade");
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const baseToken = useAtomValue(SBaseTokenAtom);
  const baseTokenAmount = useAtomValue(SBaseTokenAmountAtom);
  const baseTokenBalance = useAtomValue(SBaseTokenBalanceAtom);
  const pool = useAtomValue(SPoolAtom);

  const { isLoading: isSwapLoading, write: swapAction } = useSwap();
  const { handleOrderOverviewDisplay } = useOrderOverview();

  const handleBtnClick = () => {
    swapAction();
    handleOrderOverviewDisplay();
  };

  useEffect(() => {
    if (!baseTokenBalance) {
      setIsBtnDisabled(true);
      return;
    }

    if (!baseTokenAmount) {
      setIsBtnDisabled(true);
    }

    if (!pool) {
      setBtnText("No match pool");
      setIsBtnDisabled(true);
      return;
    }

    setBtnText("Trade");
    setIsBtnDisabled(false);
  }, [
    baseTokenAmount,
    baseTokenBalance,
    baseToken?.symbol,
    baseToken?.address,
    pool,
  ]);

  return (
    <WithApproveBtn
      token={baseToken}
      amount={baseTokenAmount || "0"}
      useAmount={baseTokenAmount || "0"}
      isActive={isActivePanel}
      isLoading={isSwapLoading}
      disabled={isBtnDisabled}
      onClick={handleBtnClick}
    >
      {btnText}
    </WithApproveBtn>
  );
}
