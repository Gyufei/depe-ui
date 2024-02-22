import { cn } from "@/lib/utils/common";
import { useContext } from "react";
import { IsActivePanelContext } from "../simple/hover-active-panel";

export default function PanelLeaderButton({
  children,
  className,
  defaultActive,
}: {
  children: React.ReactNode;
  className?: string;
  defaultActive?: boolean;
}) {
  const isActive = useContext(IsActivePanelContext);
  const activeState = defaultActive || isActive ? "active" : "inactive";

  return (
    <div
      data-state={activeState}
      className="c-active-border ml-6 inline-block h-11 leading-[44px] w-fit rounded-t-xl border-2 border-b-0 p-2"
    >
      <div
        data-state={activeState}
        className="c-active-border h-9 rounded-t-md border-2 border-b-0 px-2"
      >
        <button
          data-state={activeState}
          className={cn(
            "c-active-border c-active-shadow c-font-title-65 relative -top-10 rounded-[32px] border-2 px-5 md:px-6 py-[16px] text-lg leading-5 text-black shadow-25 transition-all md:text-xl ",
            className,
          )}
        >
          {children}
        </button>
      </div>
    </div>
  );
}
