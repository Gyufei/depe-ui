import { atom, useAtom } from "jotai";
import DialogGimp from "./dialog-gimp";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useWallet } from "@solana/wallet-adapter-react";

export const WalletSelectDialogVisibleAtom = atom(false);

export default function WalletSelectDialog() {
  const { wallets } = useWallet();
  const [walletSelectDialogVisible, setWalletSelectDialogVisible] = useAtom(
    WalletSelectDialogVisibleAtom,
  );

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
          {wallets.map((wallet) => (
            <div
              className="flex items-center justify-between"
              key={wallet.adapter.name}
            >
              {wallet.adapter.name}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
