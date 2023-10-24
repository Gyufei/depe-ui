import { cn } from "@/lib/utils/common";
import { ReactNode, createContext, useMemo } from "react";
import {
  ActivePanelAtom,
  HoverPanelAtom,
  PanelOrderAtom,
  TPanel,
} from "@/lib/states/active-panel";
import { useAtom } from "jotai";
import { cloneDeep } from "lodash";
import { useWindowSize } from "@/lib/hooks/common/use-window-size";

export const IsActivePanelContext = createContext(false);

export default function HoverActivePanel({
  children,
  className,
  name,
}: {
  name: TPanel;
  children: ReactNode;
  className?: string;
}) {
  const [orderArr, setOrderArr] = useAtom(PanelOrderAtom);
  const [activePanel, setActivePanel] = useAtom(ActivePanelAtom);
  const [hoverPanel, setHoverPanel] = useAtom(HoverPanelAtom);

  const windowSize = useWindowSize();

  const isBigScreen = useMemo(
    () => !windowSize.width || windowSize.width > 1480,
    [windowSize.width],
  );

  const orderNum = useMemo(() => {
    return orderArr.findIndex((t) => t === name) + 1;
  }, [orderArr, name]);

  const isActivePanel =
    isBigScreen || activePanel === name || hoverPanel === name;

  const position = useMemo(() => {
    if (isBigScreen) return "static";

    return "absolute";
  }, [isBigScreen]);

  const transform = useMemo(() => {
    if (isBigScreen) return "scale(1)";
    return orderNum === 2 ? "scale(1)" : "scale(0.9)";
  }, [isBigScreen, orderNum]);

  const left = useMemo(() => {
    if (isBigScreen) return "unset";

    const conWidth = windowSize.width > 1566 ? 1566 : windowSize.width;
    const avgPartWidth = conWidth / 3;

    const right3 = avgPartWidth > 480 ? 2 * avgPartWidth : conWidth - 480;

    if (orderNum === 1) return "0";
    if (orderNum === 2) return avgPartWidth + "px";
    if (orderNum === 3) return right3 + "px";
  }, [windowSize.width, orderNum, isBigScreen]);

  const handleClickToActive = () => {
    if (isBigScreen) return true;

    setActivePanel(name);
    if (orderArr && orderArr[1] === name) return;

    const prevOrder = cloneDeep(orderArr);
    const newOrder = prevOrder.filter((t) => t !== name);
    newOrder.splice(1, 0, name);
    setOrderArr(newOrder);
    return newOrder;
  };

  return (
    <IsActivePanelContext.Provider value={isActivePanel}>
      <div
        data-state={activePanel === name ? "active" : "inactive"}
        onClick={() => handleClickToActive()}
        onMouseEnter={() => setHoverPanel(name)}
        onMouseLeave={() => setHoverPanel(null)}
        className={cn(
          "flex h-fit flex-col transition-all duration-1000",
          className,
        )}
        style={{
          position,
          left: left ? left : "unset",
          order: orderNum,
          zIndex: orderNum === 2 ? 2 : 1,
          transform,
        }}
      >
        {!isBigScreen && activePanel !== name && (
          <div
            className="inset-shadow absolute top-[44px] z-20 w-full rounded-3xl bg-white opacity-50 shadow-lg"
            style={{
              height: "calc(100% - 44px)",
            }}
          ></div>
        )}
        {children}
      </div>
    </IsActivePanelContext.Provider>
  );
}
