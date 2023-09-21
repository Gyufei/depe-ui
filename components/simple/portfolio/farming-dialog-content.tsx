import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import FormBtnWithWallet from "../../share/form-btn";
import SwitchTab from "../../share/switch-tab";
import InputPanel from "../../share/input-panel";
import { IPool } from "@/lib/types/pool";
import { usePoolFormat } from "@/lib/hooks/use-pool-format";

export default function FarmingDialogContent({ pool }: { pool: IPool }) {
  const [activeTab, setActiveTab] = useState("Deposit");

  const { baseToken, leverage } = usePoolFormat(pool);
  const [value, setValue] = useState("");

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
            <FieldText>1000 USDT</FieldText>
          </FieldContainer>
          <FieldContainer className="items-end">
            <TitleText>Profit</TitleText>
            <FieldText>+300 USDT</FieldText>
          </FieldContainer>
        </RowContainer>
      </div>

      <div>
        <SwitchTab
          tabs={["Deposit", "Withdraw"]}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <InputPanel
          isLoading={false}
          tokens={[]}
          showToken={false}
          balance={"100"}
          balanceText="Balance"
          isJustToken={true}
          isActive={true}
          className="rounded-tl-none"
          value={value}
          setValue={setValue}
          token={baseToken}
          setToken={() => {}}
        />
      </div>

      <FormBtnWithWallet>Confirm</FormBtnWithWallet>
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
