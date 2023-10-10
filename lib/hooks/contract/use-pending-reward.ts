import { useAccount, useContractRead } from "wagmi";
import { IPool } from "../../types/pool";
import { useChainConfig } from "../common/use-chain-config";
import { formatUnits } from "viem";
import { useMemo } from "react";
import { formatNum } from "../../utils/number";
import { DepePoolABI } from "../../abi/DepePool";
import { useTokensInfo } from "../api/use-token-info";

export function usePendingReward(pool: IPool | null) {
  const { address: account } = useAccount();

  const { chainConfig } = useChainConfig();
  const PositionManagerAddress = chainConfig?.contract?.DepePositionManager;

  const [baseToken] = useTokensInfo([pool?.baseToken || null]);

  const rewardRes = useContractRead({
    address: pool?.poolAddr,
    abi: DepePoolABI,
    functionName: "pendingRewards",
    args: [account!, PositionManagerAddress!],
    enabled: !!(pool && pool.poolAddr && PositionManagerAddress && account),
  });

  const dataValue = useMemo(() => {
    if (
      !rewardRes.data ||
      !pool ||
      !account ||
      !baseToken ||
      rewardRes.isLoading
    )
      return null;
    const unitVal = formatUnits(rewardRes.data[0], baseToken.decimals);

    return unitVal;
  }, [rewardRes, baseToken, pool, account]);

  const dataFormatted = useMemo(() => {
    if (!dataValue) return null;
    const fmtVal = formatNum(dataValue);
    return fmtVal;
  }, [dataValue]);

  return {
    ...rewardRes,
    data: {
      value: dataValue,
      formatted: dataFormatted,
    },
  };
}
