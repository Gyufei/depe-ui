import { useAccount, useBalance } from "wagmi";
import { Address, formatUnits } from "viem";
import { useMemo } from "react";
import { useTokensInfo } from "../api/use-token-info";
import { useSpecialToken } from "../use-eth-token";

export function useTokenBalance(tokenAddress: Address | null) {
  const { address: account } = useAccount();

  const [tokenInfo] = useTokensInfo([tokenAddress || "0x"]);
  const { checkIsEth } = useSpecialToken();

  const isEth = useMemo(() => {
    return checkIsEth(tokenInfo);
  }, [checkIsEth, tokenInfo]);

  const balanceRes = useBalance({
    address: account,
    enabled: !!tokenAddress,
    ...(isEth
      ? {}
      : {
          token: tokenAddress || "0x",
        }),
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
