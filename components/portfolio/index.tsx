"use client";
import Image from "next/image";

import { useActivePanel } from "@/lib/hooks/use-active-panel";
import PanelLeaderButton from "../common/panel-leader-button";

export default function Portfolio() {
  const { isActivePanel, setPanelActive } = useActivePanel("Portfolio");

  return (
    <div onClick={setPanelActive} className="flex flex-col">
      <PanelLeaderButton className="bg-pink" isActive={isActivePanel}>
        Portfolio
      </PanelLeaderButton>
      <div
        data-state={isActivePanel ? "active" : "inactive"}
        className="c-shadow-panel h-[520px] w-[480px]"
      >
        <div
          data-state={isActivePanel ? "active" : "inactive"}
          className="c-active-border rounded-xl border-2 p-2"
        >
          <div className="c-title-text px-2 text-base">Farming</div>
          {[1, 2, 3].map((i: number) => {
            return (
              <div key={i} className="flex py-3 px-2">
                <div className="relative">
                  <Image
                    width={32}
                    height={32}
                    src="/icons/dev/DOGE.svg"
                    alt="token"
                    className="c-image-shadow"
                  ></Image>
                  <Image
                    width={16}
                    height={16}
                    src="/icons/dev/usdt.svg"
                    alt="token"
                    className="absolute right-0 bottom-0 z-10 rounded-full border border-black shadow-1 shadow-black"
                  ></Image>
                </div>
                <div>
                  
                </div>
              </div>
            );
          })}
        </div>
        <div></div>
      </div>
    </div>
  );
}
