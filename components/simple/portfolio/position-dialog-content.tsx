import { ReactNode, useState } from "react";
import Image from "next/image";

import FormBtnWithWallet from "../../share/form-btn";
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

export default function PositionDialogContent({
  pool,
  position,
}: {
  position: IPosition;
  pool: IPool;
}) {
  const [activeTab, setActiveTab] = useState("Append Margin");
  const [value, setValue] = useState("");
  const { baseToken, quoteToken, size, marginAmount, expiration } =
    usePositionFormat(position, pool);

  return (
    <div className="flex flex-col items-stretch gap-y-6">
      <div className="flex flex-col">
        <div className="flex justify-between rounded-xl border-2 border-black p-4">
          <div className="flex flex-col gap-y-3">
            <TitleText>P/L</TitleText>
            <div className="text-[28px] leading-[34px] text-red">
              -$0.48 (-0.21%)
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <TitleText>
              {quoteToken?.symbol}/{baseToken?.symbol}
            </TitleText>
            <div className="flex flex-col gap-y-[4px]">
              <ContentText>$13.0497</ContentText>
              <LoopProgress className="rotate-180" />
            </div>
          </div>
        </div>

        <div className="mt-[9px] flex items-center justify-between border-b border-lightgray py-3">
          <div className="flex flex-col gap-y-2">
            <TitleText>Size</TitleText>
            <ContentText>{size}</ContentText>
          </div>

          <div className="flex flex-col items-end gap-y-2">
            <TitleText>Avg. Open Price</TitleText>
            <ContentText>$12.8063</ContentText>
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
                <div className="ml-1">{marginAmount}</div>
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
                <div className="ml-2">{expiration}</div>
              </div>
            </ContentText>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <SwitchTab
          tabs={["Append Margin", "Withdraw Margin"]}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <InputPanel
          balance={"100"}
          balanceText=""
          isActive={true}
          isJustToken={true}
          className="rounded-tl-none"
          value={value}
          setValue={setValue}
          token={baseToken}
        />
      </div>

      <FormBtnWithWallet className="flex-1">Confirm</FormBtnWithWallet>
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
