import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";
import { truncateAddr } from "@/lib/utils";

export function useConnectModal() {
  const modal = useWeb3Modal();
  const { address, isDisconnected, isConnecting } = useAccount();
  const shortAddress = truncateAddr(address);

  const openConnectModal = modal.open;

  return {
    shortAddress,
    address,
    openConnectModal,
    isDisconnected,
    isConnecting,
  };
}
