"use client";

import { useActivePanel } from "@/lib/hooks/use-active-panel";
import PanelLeaderButton from "../share/panel-leader-button";
import InputPanel from "../share/input-panel";
import { useState } from "react";
import PoolSelect from "./pool-select";
import NFTCheck from "./nft-check";
import FormBtnWithWallet from "../share/form-btn";
import SwapSetting from "./swap-setting";
import OrderOverview from "./order-overview";
import LeverageSelectInput from "./leverage-select-input";
import ActionTip, { IActionType } from "../share/action-tip";

export default function Swap() {
  const { isActivePanel, setPanelActive } = useActivePanel("Swap");
  const [token1, setToken1] = useState("USDT");
  const [token2, setToken2] = useState("DOGE");

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const [sendTxResult, setSendTxResult] = useState<{
    type: IActionType;
    message: string;
  } | null>();

  return (
    <div onClick={setPanelActive} className="flex flex-col">
      <PanelLeaderButton className="bg-brown" isActive={isActivePanel}>
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
          <InputPanel
            isActive={isActivePanel}
            token={token1}
            setToken={setToken1}
            value={value1}
            setValue={setValue1}
          />
          <div className="relative h-3 px-[68px]">
            <LeverageSelectInput className="relative -top-[20px] mx-auto" />
          </div>
          <InputPanel
            isActive={isActivePanel}
            token={token2}
            setToken={setToken2}
            value={value2}
            setValue={setValue2}
          />
          <div className="mt-[26px] mb-[23px] flex items-center justify-between">
            <PoolSelect />
            <NFTCheck />
          </div>
          <FormBtnWithWallet isActive={isActivePanel}>
            Confirm
          </FormBtnWithWallet>

          <ActionTip
            type={sendTxResult?.type || "success"}
            handleClose={() => setSendTxResult(null)}
            message={sendTxResult?.message || null}
          />
        </div>
      </div>

      <OrderOverview className="mt-12" />
    </div>
  );
}
