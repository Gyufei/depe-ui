import { useState } from "react";
import Image from "next/image";
import { useAtom } from "jotai";

import SettingIcon from "/public/icons/setting.svg";
import StrokeArrowIcon from "/public/icons/arrow-down.svg";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import AnimatedDropdown from "@/components/share/animated-dropdown";

import SlippageSwitch from "./slippage-switch";
import { NUMBER_WITH_MAX_TWO_DECIMAL_PLACES } from "@/lib/constant";
import { SSlippageAtom } from "@/lib/states/swap";

export default function SwapSetting() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uniX, setUniX] = useState(false);
  const [localRouting, setLocalRouting] = useState(false);

  const [slippage, setSlippage] = useAtom(SSlippageAtom);
  const [showSlippageOp, setShowSlippageOp] = useState(false);
  const [opMode, setOpMode] = useState<"Auto" | "Custom">("Auto");
  const isAuto = opMode === "Auto";

  const parseSlippageInput = (value: string) => {
    if (value.length > 0 && !NUMBER_WITH_MAX_TWO_DECIMAL_PLACES.test(value)) {
      return;
    }

    setSlippage(value);
  };

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
          <TitleText>Depe Pro</TitleText>
          <div className="mt-1 flex items-center justify-between border-b border-lightgray pb-4">
            <div className="text-xs leading-[17px] text-gray">
              When available, aggregates
              <br /> liquidity sources for better prices and gas frees wwaps.{" "}
              <a
                className="cursor-pointer font-semibold text-black underline hover:opacity-80"
                href="https://support.uniswap.org/hc/en-us/articles/17515415311501"
                rel="noreferrer"
                target="_blank"
              >
                Learn more
              </a>
            </div>
            <Switch checked={uniX} onCheckedChange={setUniX} />
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-lightgray pb-4">
          <TitleText>Routing Optimization</TitleText>
          <Switch checked={localRouting} onCheckedChange={setLocalRouting} />
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <TitleText>Max slippage</TitleText>
            <div
              className="flex cursor-pointer items-center text-[#b2b3bd]"
              onClick={() => setShowSlippageOp(!showSlippageOp)}
            >
              <div className="mr-[4px]">{isAuto ? opMode : `${slippage}%`}</div>
              <div
                data-state={showSlippageOp ? "open" : "close"}
                className="scale-75 fill-current data-[state=open]:rotate-180"
              >
                <Image
                  src={StrokeArrowIcon}
                  width={24}
                  height={24}
                  alt="arrow"
                  className="opacity-40"
                />
              </div>
            </div>
          </div>
          <AnimatedDropdown open={showSlippageOp}>
            <div className="flex items-center justify-between">
              <SlippageSwitch
                checked={!isAuto}
                onCheckedChange={(v) => setOpMode(v ? "Custom" : "Auto")}
              />
              <div className="relative text-black">
                <input
                  disabled={isAuto}
                  className="flex h-10 w-[106px] rounded-xl border-2 border-black bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-lightgray focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  value={slippage!}
                  onChange={(e) => parseSlippageInput(e.target.value)}
                />
                <div
                  data-state={isAuto ? "disabled" : ""}
                  className="absolute top-2 right-[10px] data-[state=disabled]:text-gray"
                >
                  %
                </div>
              </div>
            </div>
          </AnimatedDropdown>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function TitleText({ children }: { children: React.ReactNode }) {
  return (
    <div className="c-font-text-65 leading-[17px] text-[#333]">{children}</div>
  );
}
