import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { truncateAddr } from "../../utils/web3";
import { useMemo } from "react";

export function useConnectModal() {
  const modal = useWeb3Modal();
  const accountRes = useAccount();

  const shortAddress = useMemo(
    () => (accountRes.address ? truncateAddr(accountRes.address) : ""),
    [accountRes.address],
  );

  const openConnectModal = modal.open;

  return {
    shortAddress,
    openConnectModal,
    ...accountRes,
  };
}
