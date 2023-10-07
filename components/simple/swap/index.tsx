"use client";

import PanelLeaderButton from "../../share/panel-leader-button";
import PoolSelect from "./pool-select";
import NFTCheck from "./nft-check";
import SwapSetting from "./swap-setting";
import OrderOverview from "./order-overview";
import LeverageSelectInput from "./leverage-select-input";
import BaseTokenInput from "./base-token-input";
import QuoteTokenInput from "./quote-token-input";
import SwapBtn from "./swap-btn";
import HoverActivePanel, { IsActivePanelContext } from "../hover-active-panel";
import { useContext } from "react";

export default function Swap() {
  return (
    <HoverActivePanel name="Swap">
      <SwapBase />
    </HoverActivePanel>
  );
}

function SwapBase() {
  const isActivePanel = useContext(IsActivePanelContext);

  return (
    <>
      <PanelLeaderButton className="bg-brown">
        <div className="flex items-center gap-x-4">
          <div className="flex items-center">Margin Swap</div>
          <SwapSetting />
        </div>
      </PanelLeaderButton>

      <div
        data-state={isActivePanel ? "active" : "inactive"}
        className="c-shadow-panel w-[480px]"
      >
        <div className="flex flex-col">
          <BaseTokenInput />
          <div className="relative h-3 px-[68px]">
            <LeverageSelectInput className="relative -top-[18px] mx-auto" />
          </div>
          <QuoteTokenInput />
          <div className="mt-[26px] mb-[23px] flex items-center justify-between">
            <PoolSelect />
            <NFTCheck />
          </div>

          <SwapBtn />
        </div>
      </div>

      <OrderOverview className="mt-12" />
    </>
  );
}
