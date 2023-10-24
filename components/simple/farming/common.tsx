import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils/common";

export function TitleText({ children }: { children: React.ReactNode }) {
  return (
    <div className="c-font-title-65 text-sm leading-5 text-black">
      {children}
    </div>
  );
}

export function OptionBtn({
  isActive,
  children,
  className,
  ...rest
}: {
  isActive: boolean;
  children: React.ReactNode;
  className?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      {...rest}
      data-state={isActive ? "active" : "inactive"}
      className={cn(
        "c-active-border flex h-14 w-full items-center justify-center rounded-xl border-2 bg-white text-sm leading-5",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function ContentCon({ children }: { children: React.ReactNode }) {
  return <div className="mt-3 flex justify-between gap-x-3">{children}</div>;
}

export function CoinIcon({ src }: { src: string }) {
  return (
    <Image
      width={16}
      height={16}
      src={src}
      alt="token"
      className="c-image-shadow mr-2 -translate-y-[1px]"
    ></Image>
  );
}
