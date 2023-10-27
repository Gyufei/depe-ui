import { cn } from "@/lib/utils/common";
import { ReactNode, useState } from "react";
import WithWalletBtn from "../../share/with-wallet-btn";
import SwitchTab from "../../share/switch-tab";
import InputPanel from "../../share/input-panel";
import { IPool } from "@/lib/types/pool";
import { usePoolFormat } from "@/lib/hooks/use-pool-format";
import BalanceDisplay from "@/components/share/balance-display";
import { usePendingReward } from "@/lib/hooks/contract/use-pending-reward";
import { Skeleton } from "@/components/ui/skeleton";
import WithApproveBtn from "@/components/share/with-approve-btn";
import { usePoolDepositInput } from "@/lib/hooks/use-pool-deposit-input";
import { usePoolWithdrawInput } from "@/lib/hooks/use-pool-withdraw-input";

export default function PoolDialogContent({
  pool,
  asset,
}: {
  pool: IPool;
  asset: {
    data: {
      value: string | null;
      formatted: string | null;
    };
    isLoading: boolean;
  };
}) {
  const tabs = ["Deposit", "Withdraw"];
  const [activeTab, setActiveTab] = useState("Deposit");

  const { baseToken, leverage } = usePoolFormat(pool);
  const { data: pendingReward, isLoading: pendingRewardLoading } =
    usePendingReward(pool);

  const {
    btnText: dBtnText,
    isLoading: dBtnLoading,
    isBtnDisabled: dBtnDisabled,
    inputVal: depositVal,
    handleBtnClick: handleDBtnClick,
    handleInputValChange: handleDValueChange,
    balanceData,
  } = usePoolDepositInput(pool);

  const {
    btnText: wBtnText,
    isLoading: wBtnLoading,
    isBtnDisabled: wBtnDisabled,
    inputVal: withdrawVal,
    handleBtnClick: handleWBtnClick,
    handleInputValChange: handleWValChange,
  } = usePoolWithdrawInput(pool, asset.data.value || "");

  return (
    <div className="flex flex-col items-stretch gap-y-6">
      <div>
        <RowContainer>
          <FieldContainer>
            <TitleText>Pool</TitleText>
            <FieldText>#{pool.poolId}</FieldText>
          </FieldContainer>
          <FieldContainer className="items-end">
            <TitleText>Leverage</TitleText>
            <FieldText>1~{leverage}×</FieldText>
          </FieldContainer>
        </RowContainer>

        <RowContainer>
          <FieldContainer>
            <TitleText>Current Farming</TitleText>
            {asset.isLoading ? (
              <Skeleton className="h-5 w-[100px]" />
            ) : (
              <FieldText>
                {asset.data.formatted} {baseToken?.symbol}
              </FieldText>
            )}
          </FieldContainer>
          <FieldContainer className="items-end">
            <TitleText>Profit</TitleText>
            {pendingRewardLoading ? (
              <Skeleton className="h-5 w-[100px]" />
            ) : (
              <FieldText>+{pendingReward.formatted} USDT</FieldText>
            )}
          </FieldContainer>
        </RowContainer>
      </div>

      <div>
        <SwitchTab
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {activeTab === tabs[0] && (
          <InputPanel
            balanceDisplay={
              <BalanceDisplay
                isLoading={dBtnLoading}
                balance={balanceData?.formatted || null}
                prefixText="Balance"
                setMax={() => handleDValueChange(balanceData?.value || "0")}
              />
            }
            isActive={true}
            className="rounded-tl-none"
            value={depositVal}
            setValue={handleDValueChange}
          />
        )}
        {activeTab === tabs[1] && (
          <InputPanel
            balanceDisplay={
              <BalanceDisplay
                isLoading={wBtnLoading}
                balance={asset.data.value}
                prefixText="Balance"
                setMax={() => handleWValChange(asset.data.value || "")}
              />
            }
            isActive={true}
            className="rounded-tl-none"
            value={withdrawVal}
            setValue={handleWValChange}
          />
        )}
      </div>

      {activeTab === tabs[0] && (
        <WithApproveBtn
          className="flex-1"
          token={baseToken}
          isLoading={dBtnLoading}
          balanceAmount={balanceData?.value || "0"}
          willUseAmount={depositVal || "0"}
          disabled={dBtnDisabled}
          onClick={handleDBtnClick}
        >
          {dBtnText}
        </WithApproveBtn>
      )}

      {activeTab === tabs[1] && (
        <WithWalletBtn
          className="flex-1"
          disabled={wBtnDisabled}
          isLoading={wBtnLoading}
          onClick={() => handleWBtnClick()}
        >
          {wBtnText}
        </WithWalletBtn>
      )}
    </div>
  );
}

function RowContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-[68px] justify-between border-b border-lightgray last:border-0">
      {children}
    </div>
  );
}

function FieldContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col space-y-2 py-3", className)}>
      {children}
    </div>
  );
}

function TitleText({ children }: { children: ReactNode }) {
  return (
    <div className="font-title text-sm leading-[17px] text-gray">
      {children}
    </div>
  );
}

function FieldText({ children }: { children: ReactNode }) {
  return <div className="text-xl leading-[19px] text-black">{children}</div>;
}
