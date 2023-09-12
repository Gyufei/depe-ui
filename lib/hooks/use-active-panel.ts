import { useAtom } from "jotai";
import { ActivePanelAtom, TPanel } from "../states/active-panel";

export function useActivePanel(panelName: TPanel) {
  const [activePanel, setActivePanel] = useAtom(ActivePanelAtom);

  const isActivePanel = activePanel === panelName;

  const setPanelActive = () => {
    if (isActivePanel) return;
    setActivePanel(panelName);
  };

  return {
    activePanel,
    isActivePanel,
    setPanelActive,
  };
}
