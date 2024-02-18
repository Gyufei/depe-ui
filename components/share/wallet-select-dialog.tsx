import { atom, useAtom } from "jotai";
import DialogGimp from "./dialog-gimp";
import Image from "next/image";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Wallet, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { WalletReadyState } from "@solana/wallet-adapter-base";

export const WalletSelectDialogVisibleAtom = atom(false);

export default function WalletSelectDialog() {
  const { wallets, select } = useWallet();
  const [walletSelectDialogVisible, setWalletSelectDialogVisible] = useAtom(
    WalletSelectDialogVisibleAtom,
  );

  const showWallets = wallets.filter(
    (w: Wallet) => w.adapter.name !== "MetaMask",
  );

  const [hoverWallet, setHoverWallet] = useState<string | null>(null);

  const handleMouseEnter = (w: Wallet) => {
    setHoverWallet(w.adapter.name);
  };

  const handleMouseLeave = () => {
    setHoverWallet(null);
  };

  function goToWallet(w: Wallet) {
    window.open(w.adapter.url, "_blank");
  }

  function handleConnect(w: Wallet) {
    if (w.readyState !== WalletReadyState.Installed) {
      goToWallet(w);
    } else {
      select(w.adapter.name);
      setWalletSelectDialogVisible(false);
    }
  }

  return (
    <Dialog
      open={walletSelectDialogVisible}
      onOpenChange={(isOpen) => setWalletSelectDialogVisible(isOpen)}
    >
      <DialogContent className="w-[400px] p-0 pb-6 md:w-[400px]">
        <DialogGimp />
        <DialogTitle className="px-6 pt-6">
          Connect a wallet to continue
        </DialogTitle>
        <div className="flex flex-col space-y-4 px-6 py-4">
          {showWallets.map((wallet) => (
            <div
              onClick={() => handleConnect(wallet)}
              onMouseEnter={() => handleMouseEnter(wallet)}
              onMouseLeave={handleMouseLeave}
              className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-black p-4 hover:bg-black"
              key={wallet.adapter.name}
            >
              <div className="flex items-center space-x-3">
                <Image
                  src={wallet.adapter.icon}
                  alt="wallet"
                  width={24}
                  height={24}
                  className="c-image-shadow"
                />
                <span
                  data-state={hoverWallet === wallet.adapter.name}
                  className="text-sm font-semibold leading-[17px] data-[state=true]:text-yellow"
                >
                  {wallet.adapter.name}
                </span>
              </div>

              {wallet.readyState !== WalletReadyState.Installed && (
                <div
                  data-state={hoverWallet === wallet.adapter.name}
                  className="flex cursor-pointer items-center justify-center rounded-full border border-black py-[2px] px-[12px] data-[state=true]:border-yellow"
                  onClick={() => goToWallet(wallet)}
                >
                  <div
                    data-state={hoverWallet === wallet.adapter.name}
                    className="text-sm leading-5 data-[state=true]:text-yellow"
                  >
                    Install
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
