import { ReactNode, useMemo, useState } from "react";
import { HelpCircle } from "lucide-react";
import Image from "next/image";

import WithWalletBtn from "../../share/with-wallet-btn";
import SwitchTab from "../../share/switch-tab";
import InputPanel from "../../share/input-panel";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DexSelect from "./dex-select";
import { IPosition } from "@/lib/types/position";
import { IPool } from "@/lib/types/pool";
import { usePositionFormat } from "@/lib/hooks/use-position-format";
import { TokenDisplay } from "@/components/share/input-panel-token-display";
import BalanceDisplay from "@/components/share/balance-display";
import { Skeleton } from "@/components/ui/skeleton";
import WithApproveBtn from "@/components/share/with-approve-btn";
import { useIncreasePositionInput } from "@/lib/hooks/use-increase-position-input";
import { useDecreasePositionInput } from "@/lib/hooks/use-decrease-position-input";

export default function TradeDialogContent({
  pool,
  position,
}: {
  position: IPosition;
  pool: IPool;
}) {
  const tabs = useMemo(() => ["Increase Position", "Decrease Position"], []);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const { baseToken, quoteToken, currentPriceRes, size } = usePositionFormat(
    position,
    pool,
  );

  const {
    iBtnText,
    iBtnLoading,
    iBtnDisabled,
    increaseVal,
    increasePayout,
    canIncreaseMax,
    handleIBtnClick,
    handleIncreaseValueChange,
    remainTokenAmount,
    balanceObj,
  } = useIncreasePositionInput(pool, position);

  const {
    decreaseVal,
    dBtnText,
    dBtnDisabled,
    dBtnLoading,
    decreasePayout,
    handleDecreaseValueChange,
    handleDBtnClick,
  } = useDecreasePositionInput(pool, position);

  const marginPayout = useMemo(() => {
    if (activeTab === tabs[0]) {
      return increasePayout;
    } else {
      return decreasePayout;
    }
  }, [activeTab, increasePayout, decreasePayout, tabs]);

  return (
    <div className="flex flex-col items-stretch gap-y-6">
      <div className="flex flex-col">
        <div className="flex flex-col border-b border-lightgray py-3">
          <TitleText>
            <div className="flex items-center">
              <div className="mr-1">Expected Price</div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-gray" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Average price estimated for this order</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </TitleText>

          {currentPriceRes.isLoading ? (
            <Skeleton className="h-[30px] w-[200px]" />
          ) : (
            <ContentText>
              ${currentPriceRes.data.formatted} per {quoteToken?.symbol}
            </ContentText>
          )}
        </div>

        <div className="flex flex-col py-3">
          <TitleText>Estimated Payout</TitleText>

          <ContentText>
            <div className="flex items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Image
                      width={20}
                      height={20}
                      src={`/icons/dev/BNB.svg`}
                      alt="token"
                    ></Image>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{baseToken?.symbol}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="ml-1">{marginPayout?.formatted || "--"}</div>
            </div>
          </ContentText>
        </div>
      </div>

      <div className="flex flex-col">
        <SwitchTab
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {activeTab === tabs[0] && (
          <InputPanel
            tokenDisplay={<TokenDisplay token={quoteToken!} />}
            balanceDisplay={
              <BalanceDisplay
                isLoading={!canIncreaseMax}
                balance={canIncreaseMax?.formatted || "0"}
                prefixText=""
                setMax={() =>
                  handleIncreaseValueChange(canIncreaseMax?.value || "0")
                }
              />
            }
            isActive={true}
            className="rounded-tl-none"
            value={increaseVal}
            setValue={handleIncreaseValueChange}
          />
        )}
        {activeTab === tabs[1] && (
          <InputPanel
            tokenDisplay={<TokenDisplay token={quoteToken!} />}
            balanceDisplay={
              <BalanceDisplay
                isLoading={false}
                balance={size.formatted}
                prefixText=""
                setMax={() => handleDecreaseValueChange(String(size.value))}
              />
            }
            isActive={true}
            className="rounded-tl-none"
            value={decreaseVal}
            setValue={handleDecreaseValueChange}
          />
        )}
      </div>

      <div className="flex items-center space-x-4">
        <DexSelect />
        {activeTab === tabs[0] && (
          <WithApproveBtn
            className="flex-1"
            token={baseToken}
            isLoading={iBtnLoading}
            balanceAmount={balanceObj?.value || "0"}
            willUseAmount={increasePayout?.value || "0"}
            liquidityAmount={remainTokenAmount.value || undefined}
            disabled={iBtnDisabled}
            onClick={handleIBtnClick}
          >
            {iBtnText}
          </WithApproveBtn>
        )}

        {activeTab === tabs[1] && (
          <WithWalletBtn
            disabled={dBtnDisabled}
            isLoading={dBtnLoading}
            className="flex-1"
            onClick={() => handleDBtnClick()}
          >
            {dBtnText}
          </WithWalletBtn>
        )}
      </div>
    </div>
  );
}

function TitleText({ children }: { children: ReactNode }) {
  return (
    <div className="mr-1 text-sm leading-[20px] text-gray">{children}</div>
  );
}

function ContentText({ children }: { children: ReactNode }) {
  return (
    <div className="mt-2 text-xl leading-[30px] text-black">{children}</div>
  );
}
