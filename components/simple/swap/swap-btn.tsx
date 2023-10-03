import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";

import { useActivePanel } from "@/lib/hooks/use-active-panel";

import { useOpenPosition } from "@/lib/hooks/contract/use-open-position";
import {
  SBaseTokenAmountAtom,
  SBaseTokenAtom,
  SPoolAtom,
  SQuoteTokenAmountAtom,
  SQuoteTokenAtom,
} from "@/lib/states/swap";
import { useOrderOverview } from "@/lib/hooks/use-order-overview";

import WithApproveBtn from "@/components/share/with-approve-btn";
import { usePoolRemainingTokenAmount } from "@/lib/hooks/contract/use-pool-remaining-token-amount";
import { useTokenBalance } from "@/lib/hooks/contract/use-token-balance";

export default function SwapBtn() {
  const { isActivePanel } = useActivePanel("Swap");

  const [btnText, setBtnText] = useState("Trade");
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const baseToken = useAtomValue(SBaseTokenAtom);
  const baseTokenAmount = useAtomValue(SBaseTokenAmountAtom);
  const quoteToken = useAtomValue(SQuoteTokenAtom);
  const quoteTokenAmount = useAtomValue(SQuoteTokenAmountAtom);
  const pool = useAtomValue(SPoolAtom);

  const { isLoading: isSwapLoading, write: swapAction } = useOpenPosition();
  const { handleOrderOverviewDisplay } = useOrderOverview();
  const { data: remainTokenAmount } = usePoolRemainingTokenAmount(pool);

  const { data: balanceData } = useTokenBalance(baseToken?.address || null);
  const baseTokenBalance = balanceData?.formatted || null;

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
    quoteTokenAmount,
    quoteToken?.symbol,
    remainTokenAmount,
    pool,
  ]);

  return (
    <WithApproveBtn
      token={baseToken}
      balanceAmount={baseTokenBalance || "0"}
      willUseAmount={baseTokenAmount || "0"}
      liquidityAmount={remainTokenAmount.value || undefined}
      isActive={isActivePanel}
      isLoading={isSwapLoading}
      disabled={isBtnDisabled}
      onClick={handleBtnClick}
    >
      {btnText}
    </WithApproveBtn>
  );
}
