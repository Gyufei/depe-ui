import { useAccount, useBalance } from "wagmi";
import { Address, formatUnits } from "viem";
import { useMemo } from "react";

export function useTokenBalance(tokenAddress: Address | null) {
  const { address: account } = useAccount();

  const balanceRes = useBalance({
    address: account,
    token: tokenAddress || "0x",
    enabled: !!tokenAddress,
  });

  const dataValue = useMemo(() => {
    if (!balanceRes.data) return undefined;

    const unitVal = formatUnits(
      balanceRes.data?.value,
      balanceRes.data?.decimals,
    );

    return unitVal;
  }, [balanceRes.data]);

  return {
    ...balanceRes,

    data: balanceRes.data
      ? {
          ...balanceRes.data,
          value: dataValue,
        }
      : undefined,
  };
}
