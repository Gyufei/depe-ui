import { ReactNode, useState } from "react";
import { HelpCircle } from "lucide-react";
import Image from "next/image";

import FormBtnWithWallet from "../share/form-btn";
import SwitchTab from "../share/switch-tab";
import InputPanel from "../share/input-panel";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DexSelect from "./dex-select";

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

export default function TradeDialogContent() {
  const [token, setToken] = useState("BUNNY");
  const [value, setValue] = useState("");
  const [activeTab, setActiveTab] = useState("Increase Position");

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

          <ContentText>$13.56 per {token}</ContentText>
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
                    <p>BNB</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="ml-1">84.45</div>
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
          balanceText=""
          isActive={true}
          className="rounded-tl-none"
          value={value}
          setValue={setValue}
          token={token}
          setToken={setToken}
        />
      </div>

      <div className="flex items-center space-x-4">
        <DexSelect />
        <FormBtnWithWallet className="flex-1">Submit Order</FormBtnWithWallet>
      </div>
    </div>
  );
}
