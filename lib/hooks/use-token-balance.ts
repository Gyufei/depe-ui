import { useAccount, useBalance } from "wagmi";
import { Address } from "viem";

export function useTokenBalance(tokenAddress: Address | null) {
  const { address: account } = useAccount();

  const { data, isLoading } = useBalance({
    address: account,
    token: tokenAddress || "0x",
    enabled: !!tokenAddress,
  });

  return {
    data,
    isLoading,
  };
}
