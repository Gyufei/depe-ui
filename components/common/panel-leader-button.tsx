import { cn } from "@/lib/utils";

export default function PanelLeaderButton({
  isActive,
  children,
  className,
}: {
  isActive: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const activeState = isActive ? "active" : "inactive";
  return (
    <div
      data-state={activeState}
      className="c-active-border ml-6 inline-block h-11 w-fit rounded-t-xl border-2 border-b-0 p-2"
    >
      <div
        data-state={activeState}
        className="c-active-border h-9 rounded-t-md border-2 border-b-0 px-2"
      >
        <button
          data-state={activeState}
          className={cn(
            "c-shadow-btn c-active-border c-active-shadow relative -top-10 rounded-[32px] text-xl",
            className,
          )}
        >
          {children}
        </button>
      </div>
    </div>
  );
}
