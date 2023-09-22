import FormBtnWithWallet from "@/components/share/form-btn";
import { useActivePanel } from "@/lib/hooks/use-active-panel";

import { useSwap } from "@/lib/hooks/use-swap";
import { useAtomValue } from "jotai";
import { SBaseTokenAmountAtom, SBaseTokenAtom } from "@/lib/states/swap";
import useApprove from "@/lib/hooks/use-approve";

export default function ConfirmBtn() {
  const { isActivePanel } = useActivePanel("Swap");

  const baseToken = useAtomValue(SBaseTokenAtom);
  const baseTokenAmount = useAtomValue(SBaseTokenAmountAtom);

  const { shouldApprove, isAllowanceLoading, isApproveLoading, handleApprove } =
    useApprove(baseToken?.address || null, baseTokenAmount);

  const { isSwapLoading, handleSwap } = useSwap();

  const handleBtnClick = () => {
    if (shouldApprove) {
      handleApprove();
    } else {
      handleSwap();
    }
  };

  return (
    <FormBtnWithWallet
      disabled={isAllowanceLoading}
      isLoading={shouldApprove ? isApproveLoading : isSwapLoading}
      onClick={handleBtnClick}
      isActive={isActivePanel}
    >
      {shouldApprove ? "Approve" : "Trade"}
    </FormBtnWithWallet>
  );
}
