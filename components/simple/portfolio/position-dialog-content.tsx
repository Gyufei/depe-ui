import { ReactNode, useEffect, useState } from "react";
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
import { IPool } from "@/lib/types/pool";
import { IPosition } from "@/lib/types/position";
import { usePositionFormat } from "@/lib/hooks/use-position-format";
import LoopProgress from "@/components/share/loop-progress";
import { Skeleton } from "@/components/ui/skeleton";
import { TokenDisplay } from "@/components/share/input-panel-token-display";
import BalanceDisplay from "@/components/share/balance-display";
import { useTokenBalance } from "@/lib/hooks/contract/use-token-balance";
import { useAppendMargin } from "@/lib/hooks/contract/use-append-margin";
import WithApproveBtn from "@/components/share/with-approve-btn";
import { parseUnits } from "viem";
import { useWithdrawMargin } from "@/lib/hooks/contract/use-withdraw-margin";

export default function PositionDialogContent({
  pool,
  position,
}: {
  position: IPosition;
  pool: IPool;
}) {
  const tabs: [string, string] = ["Append Margin", "Withdraw Margin"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [appendVal, setAppendVal] = useState("");
  const [withdrawVal, setWithdrawVal] = useState("");

  const {
    baseToken,
    quoteToken,
    size,
    marginAmount,
    expiration,
    openPrice,
    currentPriceRes,
    pnlAmount,
    pnlPercent,
  } = usePositionFormat(position, pool);

  const { data: balanceObj, isLoading: isBalanceLoading } = useTokenBalance(
    baseToken?.address || null,
  );

  const { isLoading: isAppendLoading, write: appendAction } = useAppendMargin(
    pool.poolAddr,
    position.positionAddr,
  );

  const { isLoading: isWithdrawLoading, write: withdrawAction } =
    useWithdrawMargin(pool.poolAddr, position.positionAddr);

  const [aBtnText, setABtnText] = useState("Confirm");
  const [aBtnDisabled, setABtnDisabled] = useState(false);

  const [wBtnText, setWBtnText] = useState("Confirm");
  const [wBtnDisabled, setWBtnDisabled] = useState(false);

  const handleABtnClick = () => {
    const amount = parseUnits(appendVal, baseToken?.decimals || 18);
    appendAction(amount);
  };

  const handleWBtnClick = () => {
    const amount = parseUnits(withdrawVal, baseToken?.decimals || 18);
    withdrawAction(amount);
  };

  useEffect(() => {
    if (!baseToken?.address) {
      setABtnDisabled(true);
      return;
    }

    if (!appendVal) {
      setABtnDisabled(true);
      return;
    }

    setABtnDisabled(false);
    setABtnText("Confirm");
  }, [baseToken, appendVal, balanceObj]);

  useEffect(() => {
    if (!baseToken?.address) {
      setWBtnDisabled(true);
      return;
    }

    if (!withdrawVal) {
      setWBtnDisabled(true);
      return;
    }

    if (Number(withdrawVal) > Number(marginAmount)) {
      setWBtnDisabled(true);
      setWBtnText(`Insufficient Margin`);
      return;
    }

    setWBtnDisabled(false);
    setWBtnText("Confirm");
  }, [baseToken, withdrawVal, marginAmount]);

  return (
    <div className="flex flex-col items-stretch gap-y-6">
      <div className="flex flex-col">
        <div className="flex justify-between rounded-xl border-2 border-black p-4">
          <div className="flex flex-col gap-y-3">
            <TitleText>P/L</TitleText>
            {currentPriceRes.isLoading || !pnlAmount.value ? (
              <>
                <Skeleton className="h-8 w-[200px]" />
              </>
            ) : (
              <PlText
                profit={pnlAmount.formatted!}
                percent={pnlPercent.formatted}
              />
            )}
          </div>

          <div className="flex flex-col gap-y-2">
            <TitleText>
              {quoteToken?.symbol}/{baseToken?.symbol}
            </TitleText>
            <div className="flex flex-col gap-y-[4px]">
              {currentPriceRes.isLoading ? (
                <>
                  <Skeleton className="h-5 w-[100px]" />
                  <Skeleton className="h-1 w-[100px]" />
                </>
              ) : (
                <>
                  <ContentText>${currentPriceRes.data.formatted}</ContentText>
                  <LoopProgress className="rotate-180" />
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-[9px] flex items-center justify-between border-b border-lightgray py-3">
          <div className="flex flex-col gap-y-2">
            <TitleText>Size</TitleText>
            <ContentText>{size.formatted}</ContentText>
          </div>

          <div className="flex flex-col items-end gap-y-2">
            <TitleText>Avg. Open Price</TitleText>
            <ContentText>${openPrice.formatted}</ContentText>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2 py-3">
            <TitleText>Margin</TitleText>

            <ContentText>
              <div className="flex items-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Image
                        width={20}
                        height={20}
                        src={baseToken?.logoURI || ""}
                        alt="token"
                      ></Image>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{baseToken?.symbol}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div className="ml-1">{marginAmount.formatted}</div>
              </div>
            </ContentText>
          </div>

          <div className="flex flex-col items-end gap-y-2">
            <TitleText>Expiration</TitleText>
            <ContentText>
              <div className="flex items-center">
                <Image
                  width={20}
                  height={20}
                  src="/icons/clock.svg"
                  alt="expiration"
                ></Image>
                <div className="ml-2">{expiration.simple}</div>
              </div>
            </ContentText>
          </div>
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
            tokenDisplay={<TokenDisplay token={baseToken!} />}
            balanceDisplay={
              <BalanceDisplay
                isLoading={isBalanceLoading}
                balance={balanceObj?.formatted || null}
                setMax={() => setAppendVal(balanceObj?.formatted || "")}
              />
            }
            isActive={true}
            className="rounded-tl-none"
            value={appendVal}
            setValue={setAppendVal}
          />
        )}
        {activeTab === tabs[1] && (
          <InputPanel
            tokenDisplay={<TokenDisplay token={baseToken!} />}
            balanceDisplay={
              <BalanceDisplay
                isLoading={false}
                balance={marginAmount.formatted}
                setMax={() => setWithdrawVal(marginAmount.value)}
              />
            }
            isActive={true}
            className="rounded-tl-none"
            value={withdrawVal}
            setValue={setWithdrawVal}
          />
        )}
      </div>

      {activeTab === tabs[0] && (
        <WithApproveBtn
          token={baseToken}
          disabled={aBtnDisabled}
          willUseAmount={appendVal}
          balanceAmount={balanceObj?.formatted || "0"}
          className="flex-1"
          isLoading={isAppendLoading}
          onClick={() => handleABtnClick()}
        >
          {aBtnText}
        </WithApproveBtn>
      )}

      {activeTab === tabs[1] && (
        <WithWalletBtn
          isLoading={isWithdrawLoading}
          disabled={wBtnDisabled}
          className="flex-1"
          onClick={() => handleWBtnClick()}
        >
          {wBtnText}
        </WithWalletBtn>
      )}
    </div>
  );
}

function PlText({ profit, percent }: { profit: string; percent: string }) {
  const isLoss = Number(profit) < 0;
  const absProfit = Math.abs(Number(profit));
  const absPercent = Math.abs(Number(percent));

  return (
    <div
      data-state={isLoss ? "loss" : "profit"}
      className="text-[28px] leading-[34px] data-[state=loss]:text-red data-[state=profit]:text-green"
    >
      {isLoss && "-"}${absProfit} ({isLoss && "-"} {absPercent}%)
    </div>
  );
}

function TitleText({ children }: { children: ReactNode }) {
  return (
    <div className="mr-1 text-sm leading-[20px] text-gray">{children}</div>
  );
}

function ContentText({ children }: { children: ReactNode }) {
  return <div className="text-xl leading-[30px] text-black">{children}</div>;
}
