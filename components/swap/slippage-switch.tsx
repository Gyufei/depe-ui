"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function CheckText({
  active: checked,
  className,
  children,
}: {
  active: boolean | undefined;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      data-state={checked ? "active" : "inactive"}
      className={cn(
        "absolute z-10 text-sm text-black data-[state=active]:text-yellow",
        className,
      )}
    >
      {children}
    </span>
  );
}

const SlippageSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer relative inline-flex h-10 w-[152px] shrink-0 cursor-pointer items-center rounded-xl border-2 border-black p-1 transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
      ref={ref}
    >
      <CheckText active={!props.checked} className="left-5">
        Auto
      </CheckText>
      <CheckText active={props.checked} className="right-3">
        Custom
      </CheckText>
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-8 w-[72px] rounded-lg bg-black shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[70px] data-[state=unchecked]:translate-x-0",
        )}
      />
    </SwitchPrimitives.Root>
  );
});

SlippageSwitch.displayName = "SlippageSwitch";

export default SlippageSwitch;
