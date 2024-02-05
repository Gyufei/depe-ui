import { useAccount } from "wagmi";
import { truncateAddr } from "../../utils/web3";
import { useCallback, useMemo } from "react";
import { WalletSelectDialogVisibleAtom } from "@/components/share/wallet-select-dialog";
import { useSetAtom } from "jotai";

export function useConnectModal() {
  const setWalletSelectDialogVisible = useSetAtom(
    WalletSelectDialogVisibleAtom,
  );

  const accountRes = useAccount();

  const shortAddress = useMemo(
    () => (accountRes.address ? truncateAddr(accountRes.address) : ""),
    [accountRes.address],
  );

  const openConnectModal = useCallback(() => {
    setWalletSelectDialogVisible(true);
  }, [setWalletSelectDialogVisible]);

  return {
    shortAddress,
    openConnectModal,
    ...accountRes,
  };
}
