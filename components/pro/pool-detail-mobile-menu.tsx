"use client";

import * as React from "react";
import Image from "next/image";
import { useAtom } from "jotai";
import {
  PDActivePanelAtom,
  TPDPanel,
} from "@/lib/states/mobile-pool-detail-panel";

export default function PoolDetailMobileMenu() {
  const [activePanel, setActivePanel] = useAtom(PDActivePanelAtom);

  const isPortActive = activePanel === "Portfolio";
  const isPositionActive = activePanel === "Positions";

  const handleClick = (n: TPDPanel) => {
    if (n === activePanel) return;

    setActivePanel(n);
  };

  return (
    <div className="mt-6 flex items-center justify-between rounded-full border-[1.5px] border-black bg-white p-1 md:hidden">
      <div
        data-active={isPortActive ? true : false}
        className="flex items-center gap-x-1 data-[active=false]:h-10 data-[active=false]:w-10 data-[active=false]:justify-center data-[active=true]:rounded-full data-[active=true]:bg-[#f5f6f7] data-[active=true]:px-3 data-[active=true]:py-[6px]"
        onClick={() => handleClick("Portfolio")}
      >
        <Image
          width={28}
          height={28}
          src={
            isPortActive
              ? "/icons/portfolio-menu-item-active.svg"
              : "/icons/portfolio-menu-item.svg"
          }
          alt="menu item"
        />
        {isPortActive && (
          <div className="font-title text-sm font-medium leading-5 text-black">
            Portfolio
          </div>
        )}
      </div>
      <div
        data-active={isPositionActive ? true : false}
        className="flex items-center gap-x-1 data-[active=false]:h-10 data-[active=false]:w-10  data-[active=false]:justify-center  data-[active=true]:rounded-full data-[active=true]:bg-[#f5f6f7] data-[active=true]:px-3 data-[active=true]:py-[6px]"
        onClick={() => handleClick("Positions")}
      >
        <Image
          width={28}
          height={28}
          src={
            isPositionActive
              ? "/icons/positions-menu-item-active.svg"
              : "/icons/positions-menu-item.svg"
          }
          alt="swap menu item"
        />
        {isPositionActive && (
          <div className="font-title text-sm font-medium leading-5 text-black">
            Positions
          </div>
        )}
      </div>
    </div>
  );
}
