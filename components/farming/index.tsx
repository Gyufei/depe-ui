"use client";

import { useState } from "react";
import Image from "next/image";

import { useActivePanel } from "@/lib/hooks/use-active-panel";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Triangle from "/public/icons/triangle.svg";

import PanelLeaderButton from "../share/panel-leader-button";
import FormBtnWithWallet from "../share/form-btn";
import InputPanel from "../share/input-panel";
import DialogGimp from "../share/dialog-gimp";
import SelectPoolDialogContent from "../share/select-pool-dialog-content";

export default function Farming() {
  const { isActivePanel, setPanelActive } = useActivePanel("Farming");

  return (
    <div onClick={setPanelActive} className="flex flex-col">
      <PanelLeaderButton className="bg-sea" isActive={isActivePanel}>
        Farming
      </PanelLeaderButton>
      <div
        data-state={isActivePanel ? "active" : "inactive"}
        className="c-shadow-panel w-[480px]"
      >
        <div className="flex flex-col items-stretch gap-y-6">
          <MarginCoin isActivePanel={isActivePanel} />
          <AssetRatingLevel isActivePanel={isActivePanel} />
          <MaxLeverage isActivePanel={isActivePanel} />
          <Pool isActivePanel={isActivePanel} />
          <Deposit isActivePanel={isActivePanel} />

          <FormBtnWithWallet isActive={isActivePanel}>
            Farm it
          </FormBtnWithWallet>
        </div>
      </div>
    </div>
  );
}

function TitleText({ children }: { children: React.ReactNode }) {
  return (
    <div className="c-font-title-65 text-sm leading-5 text-black">
      {children}
    </div>
  );
}

function OptionBtn({
  isActive,
  children,
  className,
  ...rest
}: {
  isActive: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      {...rest}
      data-state={isActive ? "active" : "inactive"}
      className={cn(
        "c-active-border flex h-14 w-full items-center justify-center rounded-xl border-2 bg-white text-sm leading-5",
        className,
      )}
    >
      {children}
    </button>
  );
}

function ContentCon({ children }: { children: React.ReactNode }) {
  return <div className="mt-3 flex justify-between gap-x-3">{children}</div>;
}

function CoinIcon({ src }: { src: string }) {
  return (
    <Image
      width={16}
      height={16}
      src={src}
      alt="token"
      className="c-image-shadow mr-2 -translate-y-[1px]"
    ></Image>
  );
}

function MarginCoin({ isActivePanel }: { isActivePanel: boolean }) {
  return (
    <div>
      <TitleText>Margin Coin</TitleText>
      <ContentCon>
        <OptionBtn isActive={isActivePanel}>
          <div className="flex items-center">
            <CoinIcon src={`/icons/dev/USDT.svg`} />
            USDT
          </div>
        </OptionBtn>
        <OptionBtn isActive={isActivePanel}>
          <div className="flex items-center">
            <CoinIcon src={`/icons/dev/USDC.svg`} />
            USDC
          </div>
        </OptionBtn>
        <OptionBtn isActive={isActivePanel}>
          <div className="flex items-center">
            <CoinIcon src={`/icons/ethereum.svg`} />
            ETH
          </div>
        </OptionBtn>
      </ContentCon>
    </div>
  );
}

function AssetRatingLevel({ isActivePanel }: { isActivePanel: boolean }) {
  const levels = ["High", "Moderate", "Low"];
  const [activeLevel] = useState("Moderate");

  return (
    <div>
      <TitleText>Asset Rating Level</TitleText>
      <ContentCon>
        <OptionBtn
          isActive={isActivePanel}
          data-check={levels[0] === activeLevel ? "true" : "false"}
          className="data-[check=true]:border-green  data-[check=true]:text-green"
        >
          <div className="relative w-[60px] text-center">
            <div className="relative z-10">{levels[0]}</div>
            {levels[0] === activeLevel && (
              <div className="absolute -left-[60%] bottom-[1px] z-0 h-[6px] w-[60px] bg-[#ADEED3]"></div>
            )}
          </div>
        </OptionBtn>
        <OptionBtn
          isActive={isActivePanel}
          data-check={levels[1] === activeLevel ? "true" : "false"}
          className="data-[check=true]:border-tan  data-[check=true]:text-tan"
        >
          <div className="relative w-[60px] text-center">
            <div className="relative z-10">{levels[1]}</div>
            {levels[1] === activeLevel && (
              <div className="absolute bottom-[1px] z-0 h-[6px] w-[60px] bg-[#F0D270]"></div>
            )}
          </div>
        </OptionBtn>
        <OptionBtn
          isActive={isActivePanel}
          data-check={levels[2] === activeLevel ? "true" : "false"}
          className="data-[check=true]:border-red  data-[check=true]:text-red"
        >
          <div className="relative w-[60px] text-center">
            <div className="relative z-10">{levels[2]}</div>
            {levels[2] === activeLevel && (
              <div className="absolute -left-[60%] bottom-[5px] z-0  h-[6px] w-[60px] bg-[#FFC8C8]"></div>
            )}
          </div>
        </OptionBtn>
      </ContentCon>
    </div>
  );
}

function MaxLeverage({ isActivePanel }: { isActivePanel: boolean }) {
  const leverages = [5, 10, 20, 50];
  const [activeLeverage] = useState(5);

  return (
    <div>
      <TitleText>Max Leverage</TitleText>
      <ContentCon>
        {leverages.map((l) => (
          <OptionBtn
            key={l}
            isActive={isActivePanel}
            data-check={l === activeLeverage ? "true" : "false"}
            className="data-[check=true]:bg-yellow"
          >
            {l}×
          </OptionBtn>
        ))}
      </ContentCon>
    </div>
  );
}

function Pool({ isActivePanel }: { isActivePanel: boolean }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div>
      <TitleText>
        <div className="flex items-center justify-between">
          <div>Pool</div>
          <div className="c-font-text-65 flex items-center text-xs leading-[18px]">
            <div className="mr-2 text-gray">Est. APY</div>
            <div
              data-state={isActivePanel ? "active" : "inactive"}
              className="text-black data-[state=active]:text-green"
            >
              10%
            </div>
          </div>
        </div>
      </TitleText>
      <ContentCon>
        <Dialog
          open={dialogOpen}
          onOpenChange={(isOpen) => setDialogOpen(isOpen)}
        >
          <DialogTrigger asChild>
            <div
              data-state={isActivePanel ? "active" : "inactive"}
              className=" c-active-border flex flex-1 cursor-pointer items-center justify-between rounded-xl border-2 p-4 hover:contrast-50"
            >
              <div className="flex items-center text-sm leading-[17px] text-black ">
                <div className="mr-[14px]">Automatch</div>
                <div className="rounded-full border border-black py-1 pl-4 pr-5">
                  #102
                </div>
              </div>
              <Image
                width={14}
                height={8}
                src={Triangle}
                alt="triangle"
                className="-rotate-90"
              ></Image>
            </div>
          </DialogTrigger>
          <DialogContent className="w-[400px] p-0 pb-6 md:w-[400px]">
            <DialogGimp />
            <DialogTitle className="px-6 pt-6">Select Pool</DialogTitle>
            <SelectPoolDialogContent />
          </DialogContent>
        </Dialog>
      </ContentCon>
    </div>
  );
}

function Deposit({ isActivePanel }: { isActivePanel: boolean }) {
  const [token1, setToken1] = useState("USDT");
  const [value1, setValue1] = useState("");

  return (
    <div>
      <TitleText>Deposit</TitleText>
      <ContentCon>
        <InputPanel
          className="flex-1"
          isActive={isActivePanel}
          token={token1}
          setToken={setToken1}
          value={value1}
          setValue={setValue1}
        />
      </ContentCon>
    </div>
  );
}
