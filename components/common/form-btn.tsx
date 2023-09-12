import { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useConnectModal } from "@/lib/hooks/use-connect";

export default function FormBtnWithWallet({
  children,
  className,
  isActive = true,
  onClick,
  ...props
}: {
  isActive?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const { openConnectModal, isDisconnected, isConnecting } = useConnectModal();

  const handleClick = () => {
    if (isDisconnected) {
      openConnectModal();
    } else {
      onClick && onClick();
    }
  };

  const showText = isDisconnected
    ? "Connect Wallet"
    : isConnecting
    ? "Connecting..."
    : children;

  return (
    <button
      {...props}
      data-state={isActive ? "active" : "inactive"}
      className={cn(
        "c-active-border-light c-active-bg c-font-title-65 items-center justify-center rounded-xl border-2 py-[18px] leading-5 text-white outline-none transition-colors hover:brightness-110 data-[state=active]:text-yellow",
        className,
      )}
      onClick={() => handleClick()}
    >
      {showText}
    </button>
  );
}
