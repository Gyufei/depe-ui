import Image from "next/image";
import SettingIcon from "/public/icons/setting.svg";
import StrokeArrowIcon from "@/components/share/icons/stroke-arrow";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Switch } from "../ui/switch";
import SlippageSwitch from "./slippage-switch";
import { useStrNum } from "@/lib/hooks/use-str-num";

function TitleText({ children }: { children: React.ReactNode }) {
  return (
    <div className="c-font-text-65 leading-[17px] text-[#333]">{children}</div>
  );
}

export default function SwapSetting() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uniX, setUniX] = useState(false);
  const [localRouting, setLocalRouting] = useState(false);

  const [slippage, setSlippage] = useStrNum("0.1");
  const [showSlippageOp, setShowSlippageOp] = useState(false);
  const [opMode, setOpMode] = useState<"Auto" | "Custom">("Auto");

  return (
    <Dialog open={dialogOpen} onOpenChange={(isOpen) => setDialogOpen(isOpen)}>
      <DialogTrigger asChild>
        <Image
          width={24}
          height={24}
          src={SettingIcon}
          alt="setting"
          className="inline-flex"
        ></Image>
      </DialogTrigger>
      <DialogContent className="w-[320px] md:w-[320px]" showClose={false}>
        <div>
          <TitleText>UniswapX</TitleText>
          <div className="mt-1 flex items-center justify-between border-b border-lightgray pb-4">
            <div className="text-xs leading-[17px] text-gray">
              When available, aggregates
              <br /> liquidity sources for better prices and gas frees wwaps.{" "}
              <span className="font-semibold text-black underline">
                Learn more
              </span>
            </div>
            <Switch checked={uniX} onCheckedChange={setUniX} />
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-lightgray pb-4">
          <TitleText>Local routing</TitleText>
          <Switch checked={localRouting} onCheckedChange={setLocalRouting} />
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <TitleText>Max slippage</TitleText>
            <div
              className="flex cursor-pointer items-center text-[#b2b3bd]"
              onClick={() => setShowSlippageOp(!showSlippageOp)}
            >
              <div className="mr-[4px]">{slippage}%</div>
              <div
                data-state={showSlippageOp ? "open" : "close"}
                className="scale-75 fill-current data-[state=open]:rotate-180"
              >
                <StrokeArrowIcon />
              </div>
            </div>
          </div>
          {showSlippageOp && (
            <div className="flex items-center justify-between">
              <SlippageSwitch
                checked={opMode === "Custom"}
                onCheckedChange={(v) => setOpMode(v ? "Custom" : "Auto")}
              />
              <div>
                <input
                  disabled={opMode === "Auto"}
                  className="flex h-10 w-[106px] rounded-xl border-2 border-black bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-lightgray focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  value={slippage}
                  onChange={(e) => setSlippage(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
