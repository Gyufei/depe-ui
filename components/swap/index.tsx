"use client";

import Image from "next/image";
import SettingIcon from "/public/icons/setting.svg";

import { useActivePanel } from "@/lib/hooks/use-active-panel";
import PanelLeaderButton from "../common/panel-leader-button";
import InputPanel from "../common/input-panel";
import { useState } from "react";
import PoolSelect from "./pool-select";
import NFTCheck from "./nft-check";
import FormBtn from "../common/form-btn";

export default function Swap() {
  const { isActivePanel, setPanelActive } = useActivePanel("Swap");
  const [token1, setToken1] = useState("USDT");
  const [token2, setToken2] = useState("DOGE");

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  return (
    <div onClick={setPanelActive} className="flex flex-col">
      <PanelLeaderButton className="bg-brown" isActive={isActivePanel}>
        <div className="flex items-center">
          Margin Swap
          <Image
            width={24}
            height={24}
            src={SettingIcon}
            alt="setting"
            className="ml-4"
          ></Image>
        </div>
      </PanelLeaderButton>

      <div
        data-state={isActivePanel ? "active" : "inactive"}
        className="c-shadow-panel w-[480px]"
      >
        <div className="flex flex-col">
          <InputPanel
            token={token1}
            setToken={setToken1}
            value={value1}
            setValue={setValue1}
          />
          <InputPanel
            className="mt-3"
            token={token2}
            setToken={setToken2}
            value={value2}
            setValue={setValue2}
          />
          <div className="mt-[26px] mb-[23px] flex items-center justify-between">
            <PoolSelect />
            <NFTCheck />
          </div>
          <FormBtn>Confirm</FormBtn>
        </div>
      </div>
    </div>
  );
}
