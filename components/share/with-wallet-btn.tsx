import { ButtonHTMLAttributes, ReactNode, useCallback } from "react";

import { cn } from "@/lib/utils/common";
import { Loader2 } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useSetAtom } from "jotai";
import { WalletSelectDialogVisibleAtom } from "./wallet-select-dialog";

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
  const { connected, connecting } = useWallet();

  const setWalletSelectDialogVisible = useSetAtom(
    WalletSelectDialogVisibleAtom,
  );

  const openWalletSelectDialog = useCallback(() => {
    setWalletSelectDialogVisible(true);
  }, [setWalletSelectDialogVisible]);

  const handleClick = () => {
    if (!connected) {
      openWalletSelectDialog();
    } else {
      onClick && onClick();
    }
  };

  const btnText = !connected ? "Connect Wallet" : children;

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
      {(connecting || isLoading) && (
        <Loader2 className="text-primary ml-1 h-4 w-4 animate-spin" />
      )}
    </button>
  );
}
