import FormBtnWithWallet from "@/components/share/form-btn";
import { useActivePanel } from "@/lib/hooks/use-active-panel";

import ActionTip, { IActionType } from "../../share/action-tip";
import { useEffect, useState } from "react";
import { useSwap } from "@/lib/hooks/use-swap";
import { useAtomValue } from "jotai";
import { SBaseTokenAmountAtom, SBaseTokenAtom } from "@/lib/states/swap";
import useApprove from "@/lib/hooks/use-approve";

export default function ConfirmBtn() {
  const { isActivePanel } = useActivePanel("Swap");

  const baseToken = useAtomValue(SBaseTokenAtom);
  const baseTokenAmount = useAtomValue(SBaseTokenAmountAtom);

  const { shouldApprove, isAllowanceLoading, handleApprove } = useApprove(
    baseToken?.address || null,
    baseTokenAmount,
  );

  const { isSwapLoading, isSwapSuccess, swapError, isSwapError, handleSwap } =
    useSwap();

  const [sendTxResult, setSendTxResult] = useState<{
    type: IActionType;
    message: string;
  } | null>();

  useEffect(() => {
    if (isSwapSuccess) {
      setSendTxResult({
        type: "success",
        message: "Your funds have been staked in the pool.",
      });
    }

    if (isSwapError) {
      setSendTxResult({
        type: "error",
        message: swapError?.message || "Fail: Some error occur",
      });
    }
  }, [swapError, isSwapError, isSwapSuccess]);

  const handleBtnClick = () => {
    if (shouldApprove) {
      handleApprove();
    } else {
      handleSwap();
    }
  };

  return (
    <>
      <FormBtnWithWallet
        disabled={isAllowanceLoading}
        isLoading={isSwapLoading}
        onClick={handleBtnClick}
        isActive={isActivePanel}
      >
        {shouldApprove ? "Approve" : "Confirm"}
      </FormBtnWithWallet>

      <ActionTip
        type={sendTxResult?.type || "success"}
        handleClose={() => setSendTxResult(null)}
        message={sendTxResult?.message || null}
      />
    </>
  );
}
