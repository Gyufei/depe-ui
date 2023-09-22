"use client";

import { useActivePanel } from "@/lib/hooks/use-active-panel";

import PanelLeaderButton from "../../share/panel-leader-button";
import { MarginCoin } from "./margin-coin";
import { AssetRatingLevel } from "./asset-rating-level";
import { MaxLeverage } from "./max-leverage";
import { Pool } from "./pool";
import { Deposit } from "./deposit";
import FarmBtn from "./farm-btn";

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
          <MarginCoin isActive={isActivePanel} />
          <AssetRatingLevel isActive={isActivePanel} />
          <MaxLeverage isActive={isActivePanel} />
          <Pool isActive={isActivePanel} />
          <Deposit isActive={isActivePanel} />
          <FarmBtn isActive={isActivePanel} />
        </div>
      </div>
    </div>
  );
}
