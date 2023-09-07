"use client";
import { useActivePanel } from "@/lib/hooks/use-active-panel";
import PanelLeaderButton from "../common/panel-leader-button";

export default function Portfolio() {
  const { isActivePanel, setPanelActive } = useActivePanel("Portfolio");

  return (
    <div onClick={setPanelActive} className="flex flex-col">
      <PanelLeaderButton isActive={isActivePanel}>Portfolio</PanelLeaderButton>
      <div
        data-state={isActivePanel ? "active" : "inactive"}
        className="c-shadow-panel h-[520px] w-[480px]"
      ></div>
    </div>
  );
}
