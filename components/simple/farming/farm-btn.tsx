import { useAtomValue } from "jotai";
import { useContext, useEffect, useState } from "react";
import { useTokenBalance } from "@/lib/hooks/contract/use-token-balance";
import { FDepositAmountAtom, FPoolAtom } from "@/lib/states/farming";
import WithApproveBtn from "@/components/share/with-approve-btn";
import { usePoolFormat } from "@/lib/hooks/use-pool-format";
import { usePoolDeposit } from "@/lib/hooks/contract/use-pool-deposit";
import { IsActivePanelContext } from "../hover-active-panel";

export default function FarmBtn() {
  const originBtnText = "Farm";
  const isActive = useContext(IsActivePanelContext);

  const pool = useAtomValue(FPoolAtom);
  const depositAmount = useAtomValue(FDepositAmountAtom);

  const [btnText, setBtnText] = useState(originBtnText);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const { baseToken } = usePoolFormat(pool);
  const { data: balanceObj } = useTokenBalance(baseToken?.address || null);
  const baseTokenBalance = balanceObj?.formatted || null;

  const { isLoading: isDepositLoading, write: writeAction } = usePoolDeposit(
    pool?.poolAddr || null,
    baseToken,
  );

  useEffect(() => {
    if (!pool) {
      setBtnText("No match pool");
      setIsBtnDisabled(true);
      return;
    }

    if (!baseTokenBalance) {
      setIsBtnDisabled(true);
      return;
    }

    if (!depositAmount) {
      setIsBtnDisabled(true);
    }

    setBtnText(originBtnText);
    setIsBtnDisabled(false);
  }, [baseTokenBalance, pool, depositAmount]);

  const handleBtnClick = () => {
    if (!depositAmount) return;

    // const amount = parseUnits(depositAmount, baseToken?.decimals || 18);
    const amount = depositAmount;
    writeAction(amount);
  };

  return (
    <WithApproveBtn
      isActive={isActive}
      token={baseToken}
      balanceAmount={baseTokenBalance || "0"}
      willUseAmount={depositAmount || "0"}
      isLoading={isDepositLoading}
      disabled={isBtnDisabled}
      onClick={handleBtnClick}
    >
      {btnText}
    </WithApproveBtn>
  );
}
