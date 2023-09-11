import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function FormBtn({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      {...props}
      className={cn(
        "items-center justify-center rounded-xl border-2 border-black bg-black py-[18px] font-title leading-5 text-yellow outline-none transition-colors hover:border-black/90 hover:bg-black/90",
        className,
      )}
    >
      {children}
    </button>
  );
}
