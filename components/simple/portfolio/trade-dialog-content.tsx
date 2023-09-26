import { ReactNode, useState } from "react";
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

export default function TradeDialogContent({
  pool,
  position,
}: {
  position: IPosition;
  pool: IPool;
}) {
  const [value, setValue] = useState("");
  const [activeTab, setActiveTab] = useState("Increase Position");

  const { baseToken, quoteToken, marginAmount, currentPriceRes } =
    usePositionFormat(position, pool);

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
                    <p></p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </TitleText>

          {currentPriceRes.isLoading ? (
            <Skeleton className="h-[30px] w-[200px]" />
          ) : (
            <ContentText>
              ${currentPriceRes.dataFormatted} per {quoteToken?.symbol}
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
              <div className="ml-1">{marginAmount.formatted}</div>
            </div>
          </ContentText>
        </div>
      </div>

      <div className="flex flex-col">
        <SwitchTab
          tabs={["Increase Position", "Decrease Position"]}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <InputPanel
          tokenDisplay={<TokenDisplay token={baseToken!} />}
          balanceDisplay={
            <BalanceDisplay
              isLoading={false}
              balance={marginAmount.formatted}
              prefixText=""
              setMax={() => setValue(marginAmount.value)}
            />
          }
          isActive={true}
          className="rounded-tl-none"
          value={value}
          setValue={setValue}
        />
      </div>

      <div className="flex items-center space-x-4">
        <DexSelect />
        <WithWalletBtn className="flex-1" onClick={() => {}}>
          Submit Order
        </WithWalletBtn>
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
