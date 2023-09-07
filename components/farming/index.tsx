"use client";
import { useActivePanel } from "@/lib/hooks/use-active-panel";
import PanelLeaderButton from "../common/panel-leader-button";

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
      </div>
    </div>
  );
}
