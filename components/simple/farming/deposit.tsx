import InputPanel from "@/components/share/input-panel";

import { TitleText, ContentCon } from "./common";
import { useAtom, useAtomValue } from "jotai";
import { FDepositAmountAtom, FPoolAtom } from "@/lib/states/farming";
import { usePoolFormat } from "@/lib/hooks/use-pool-format";
import { TokenDisplay } from "@/components/share/input-panel-token-display";
import BalanceDisplay from "@/components/share/balance-display";
import { useTokenBalance } from "@/lib/hooks/contract/use-token-balance";
import { useContext } from "react";
import { IsActivePanelContext } from "../hover-active-panel";

export function Deposit() {
  const isActive = useContext(IsActivePanelContext);

  const [depositAmount, setDepositAmount] = useAtom(FDepositAmountAtom);

  const pool = useAtomValue(FPoolAtom);
  const { baseToken } = usePoolFormat(pool);

  const { data: balanceData, isLoading: isBalanceLoading } = useTokenBalance(
    baseToken?.address || null,
  );
  const baseTokenBalance = balanceData?.formatted || null;

  return (
    <div>
      <TitleText>Deposit</TitleText>
      <ContentCon>
        <InputPanel
          tokenDisplay={<TokenDisplay token={baseToken!} />}
          balanceDisplay={
            <BalanceDisplay
              isLoading={isBalanceLoading}
              balance={baseTokenBalance}
              prefixText="Balance"
              setMax={() => setDepositAmount(balanceData?.value || "")}
            />
          }
          className="flex-1"
          isActive={isActive}
          value={depositAmount || ""}
          setValue={setDepositAmount}
        />
      </ContentCon>
    </div>
  );
}
