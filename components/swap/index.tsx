"use client";

import Image from "next/image";
import SettingIcon from "/public/icons/setting.svg";

import { useActivePanel } from "@/lib/hooks/use-active-panel";
import PanelLeaderButton from "../common/panel-leader-button";

export default function Swap() {
  const { isActivePanel, setPanelActive } = useActivePanel("Swap");

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
        className="c-shadow-panel h-[520px] w-[480px]"
      ></div>
    </div>
  );
}
