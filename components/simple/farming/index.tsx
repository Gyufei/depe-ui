"use client";

import { useContext } from "react";
import PanelLeaderButton from "../../share/panel-leader-button";
import { MarginCoin } from "./margin-coin";
import { AssetRatingLevel } from "./asset-rating-level";
import { MaxLeverage } from "./max-leverage";
import { FarmingPoolSelect } from "./farming-pool-select";
import { Deposit } from "./deposit";
import FarmBtn from "./farm-btn";
import HoverActivePanel, { IsActivePanelContext } from "../hover-active-panel";
import { useMediaQuery } from "@/lib/hooks/common/use-media-query";
import { MobileMarginCoin } from "./mobile-margin-coin";

export default function Farming() {
  return (
    <HoverActivePanel name="Farming">
      <FarmingBase />
    </HoverActivePanel>
  );
}

function FarmingBase() {
  const isActive = useContext(IsActivePanelContext);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <PanelLeaderButton className="bg-sea">Farming</PanelLeaderButton>
      <div
        data-state={isActive ? "active" : "inactive"}
        className="c-shadow-panel w-[calc(100vw-52px)]  md:w-[480px]"
      >
        <div className="flex flex-col items-stretch gap-y-6">
          {isDesktop && <MarginCoin />}
          <AssetRatingLevel />
          <MaxLeverage />
          <FarmingPoolSelect />
          {isDesktop && <Deposit />}
          {!isDesktop && <MobileMarginCoin />}
          <FarmBtn />
        </div>
      </div>
    </>
  );
}
