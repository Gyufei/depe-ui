import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";
import { truncateAddr } from "../../utils/web3";
import { useMemo } from "react";

export function useConnectModal() {
  const modal = useWeb3Modal();
  const { address, isDisconnected, isConnecting } = useAccount();

  const shortAddress = useMemo(
    () => (address ? truncateAddr(address) : ""),
    [address],
  );

  const openConnectModal = modal.open;

  return {
    shortAddress,
    address,
    openConnectModal,
    isDisconnected,
    isConnecting,
  };
}
