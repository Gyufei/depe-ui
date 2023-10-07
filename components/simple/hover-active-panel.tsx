import { cn } from "@/lib/utils/utils";
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ActivePanelAtom,
  HoverPanelAtom,
  PanelOrderAtom,
  TPanel,
} from "@/lib/states/active-panel";
import { useAtom } from "jotai";
import { cloneDeep } from "lodash";

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

  const isActivePanel = activePanel === name || hoverPanel === name;

  const handleClickToActive = () => {
    setActivePanel(name);
    if (orderArr && orderArr[1] === name) return;

    const prevOrder = cloneDeep(orderArr);
    const newOrder = prevOrder.filter((t) => t !== name);
    newOrder.splice(1, 0, name);
    setOrderArr(newOrder);
    return newOrder;
  };

  const orderNum = useMemo(() => {
    return orderArr.findIndex((t) => t === name) + 1;
  }, [orderArr, name]);

  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  const handleSize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    handleSize();
    window.addEventListener("resize", handleSize);
  }, [handleSize]);

  useEffect(() => {
    setIsRender(true);
  }, []);

  const [isRender, setIsRender] = useState(false);

  const left = useMemo(() => {
    const conWidth = windowSize.width > 1566 ? 1566 : windowSize.width;
    const avgPartWidth = conWidth / 3;

    if (orderNum === 1) return "0";
    if (orderNum === 2) return avgPartWidth + "px";
    if (orderNum === 3) return 2 * avgPartWidth + "px";
  }, [windowSize.width, orderNum]);

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
          position: isRender ? "absolute" : "static",
          left: left ? left : "unset",
          order: orderNum,
          zIndex: orderNum === 2 ? 100 : 10,
          transform: orderNum !== 2 ? "scale(0.9)" : "scale(1)",
        }}
      >
        {activePanel !== name && (
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
