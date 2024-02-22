import { ReactElement } from "react";

import { NumericalInput } from "@/components/share/numerical-input";
import { cn } from "@/lib/utils/common";

export default function InputPanel({
  isActive = true,
  tokenDisplay,
  balanceDisplay,
  value,
  setValue,
  className,
}: {
  tokenDisplay?: ReactElement;
  balanceDisplay?: ReactElement;
  value: string;
  setValue: (_v: string) => void;
  className?: string;
  isActive?: boolean;
}) {
  return (
    <div
      data-state={isActive ? "active" : "inactive"}
      className={cn(
        "c-active-border input-panel flex h-[88px] space-x-0 rounded-xl border-2 px-4 transition-colors focus-within:bg-yellow md:space-x-4",
        className,
      )}
    >
      {tokenDisplay && <div>{tokenDisplay}</div>}
      <div className="flex flex-1 flex-col items-stretch justify-between py-3">
        <NumericalInput
          className="h-6 w-[164px] text-right md:w-auto"
          value={value}
          onUserInput={setValue}
          placeholder="0"
        />
        {balanceDisplay}
      </div>
    </div>
  );
}
