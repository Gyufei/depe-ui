import { cn } from "@/lib/utils/utils";

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
            "c-active-border c-active-shadow c-font-title-65 relative -top-10 rounded-[32px] border-2 px-6 py-[16px] text-xl leading-5 text-black shadow-25 transition-all ",
            className,
          )}
        >
          {children}
        </button>
      </div>
    </div>
  );
}
