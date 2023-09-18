"use client";

import { useActivePanel } from "@/lib/hooks/use-active-panel";
import PanelLeaderButton from "../../share/panel-leader-button";
import { FarmingList } from "./farming-list";
import { TradingList } from "./trading-list";

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
        <FarmingList isActivePanel={isActivePanel} />
        <TradingList className="mt-4" isActivePanel={isActivePanel} />
      </div>
    </div>
  );
}
