import { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useConnectModal } from "@/lib/hooks/use-connect";
import { Loader2 } from "lucide-react";

export default function FormBtnWithWallet({
  isLoading,
  children,
  className,
  isActive = true,
  onClick,
  ...props
}: {
  isLoading?: boolean;
  isActive?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  [key: string]: any;
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
        "c-active-border-light c-active-bg c-font-title-65 flex items-center justify-center rounded-xl border-2 py-[18px] leading-5 text-white outline-none transition-colors hover:brightness-110 disabled:cursor-not-allowed disabled:border-lightgray disabled:bg-lightgray data-[state=active]:text-yellow",
        className,
      )}
      onClick={() => handleClick()}
    >
      {showText}
      {isLoading && (
        <Loader2
          className={cn("text-primary ml-1 h-4 w-4 animate-spin", className)}
        />
      )}
    </button>
  );
}
