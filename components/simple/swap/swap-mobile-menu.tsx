"use client";

import * as React from "react";
import Image from "next/image";
import { useAtom } from "jotai";
import { ActivePanelAtom, TPanel } from "@/lib/states/active-panel";

export default function SwapMobileMenu() {
  const [activePanel, setActivePanel] = useAtom(ActivePanelAtom);

  const isSwapActive = activePanel === "Swap";
  const isFarmingActive = activePanel === "Farming";
  const isPortfolioActive = activePanel === "Portfolio";

  const handleClick = (n: TPanel) => {
    if (n === activePanel) return;

    setActivePanel(n);
  };

  return (
    <div className="mt-6 flex items-center justify-between rounded-full border-[1.5px] border-black bg-white p-1 md:hidden">
      <div
        data-active={isSwapActive ? true : false}
        className="flex items-center gap-x-1 data-[active=false]:h-10 data-[active=false]:w-10 data-[active=false]:justify-center data-[active=true]:rounded-full data-[active=true]:bg-[#f5f6f7] data-[active=true]:px-3 data-[active=true]:py-[6px]"
        onClick={() => handleClick("Swap")}
      >
        <Image
          width={28}
          height={28}
          src={
            isSwapActive
              ? "/icons/swap-menu-item-active.svg"
              : "/icons/swap-menu-item.svg"
          }
          alt="swap menu item"
        />
        {isSwapActive && (
          <div className="font-title text-sm font-medium leading-5 text-black">
            Margin Swap
          </div>
        )}
      </div>
      <div
        data-active={isFarmingActive ? true : false}
        className="flex items-center gap-x-1 data-[active=false]:h-10 data-[active=false]:w-10  data-[active=false]:justify-center  data-[active=true]:rounded-full data-[active=true]:bg-[#f5f6f7] data-[active=true]:px-3 data-[active=true]:py-[6px]"
        onClick={() => handleClick("Farming")}
      >
        <Image
          width={28}
          height={28}
          src={
            isFarmingActive
              ? "/icons/farming-menu-item-active.svg"
              : "/icons/farming-menu-item.svg"
          }
          alt="swap menu item"
        />
        {isFarmingActive && (
          <div className="font-title text-sm font-medium leading-5 text-black">
            Farming
          </div>
        )}
      </div>
      <div
        data-active={isPortfolioActive ? true : false}
        className="flex items-center gap-x-1 data-[active=false]:h-10 data-[active=false]:w-10 data-[active=false]:justify-center data-[active=true]:rounded-full data-[active=true]:bg-[#f5f6f7] data-[active=true]:px-3 data-[active=true]:py-[6px]"
        onClick={() => handleClick("Portfolio")}
      >
        <Image
          width={28}
          height={28}
          src={
            isPortfolioActive
              ? "/icons/port-menu-item-active.svg"
              : "/icons/port-menu-item.svg"
          }
          alt="swap menu item"
        />
        {isPortfolioActive && (
          <div className="font-title text-sm font-medium leading-5 text-black">
            Portfolio
          </div>
        )}
      </div>
    </div>
  );
}
