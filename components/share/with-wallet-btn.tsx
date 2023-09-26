import { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/utils";
import { useConnectModal } from "@/lib/hooks/use-connect";
import { Loader2 } from "lucide-react";

export default function WithWalletBtn({
  isActive = true,
  isLoading = false,
  children,
  onClick,
  ...rest
}: {
  isActive?: boolean;
  isLoading?: boolean;
  onClick: () => void;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { openConnectModal, isDisconnected, isConnecting } = useConnectModal();

  const handleClick = () => {
    if (isDisconnected) {
      openConnectModal();
    } else {
      onClick && onClick();
    }
  };

  const btnText = isDisconnected ? "Connect Wallet" : children;

  return (
    <button
      {...rest}
      data-state={isActive ? "active" : "inactive"}
      className={cn(
        "c-active-border-light c-active-bg c-font-title-65 flex items-center justify-center rounded-xl border-2 py-[18px] leading-5 text-white outline-none transition-colors hover:brightness-110 disabled:cursor-not-allowed disabled:border-lightgray disabled:bg-lightgray data-[state=active]:text-yellow disabled:data-[state=active]:text-white",
        rest.className,
      )}
      onClick={() => handleClick()}
    >
      {btnText}
      {(isConnecting || isLoading) && (
        <Loader2 className="text-primary ml-1 h-4 w-4 animate-spin" />
      )}
    </button>
  );
}
