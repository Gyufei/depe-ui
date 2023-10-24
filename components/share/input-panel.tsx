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
        "c-active-border input-panel flex h-[88px] rounded-xl border-2 px-4 transition-colors focus-within:bg-yellow",
        className,
      )}
    >
      {tokenDisplay && <div className="mr-4">{tokenDisplay}</div>}
      <div className="flex flex-1 flex-col items-stretch justify-between py-3">
        <NumericalInput
          className="h-6 text-right"
          value={value}
          onUserInput={setValue}
          placeholder="0"
        />
        {balanceDisplay}
      </div>
    </div>
  );
}
