import { useContractRead } from "wagmi";
import { IPool } from "../../types/pool";
import { useChainConfig } from "../use-chain-config";
import { formatUnits } from "viem";
import { useMemo } from "react";
import { useTokensInfo } from "../use-token-info";
import { formatNum } from "../../utils/number";
import { DepePoolABI } from "../../abi/DepePool";

export function usePoolRemainingTokenAmount(pool: IPool | null) {
  const { chainConfig } = useChainConfig();
  const PositionManagerAddress = chainConfig?.contract?.DepePositionManager;

  const [baseToken] = useTokensInfo([pool?.baseToken || null]);

  const remainTokenRes = useContractRead({
    address: pool?.poolAddr,
    abi: DepePoolABI,
    functionName: "getRemainingTokenAmount",
    args: [PositionManagerAddress || "0x"],
    enabled: !!(pool && pool.poolAddr && PositionManagerAddress),
  });

  const dataValue = useMemo(() => {
    if (!remainTokenRes.data || !pool || !baseToken) return null;
    const unitVal = formatUnits(remainTokenRes.data, baseToken.decimals);

    return unitVal;
  }, [remainTokenRes.data, baseToken, pool]);

  const dataFormatted = useMemo(() => {
    if (!dataValue) return null;
    const fmtVal = formatNum(dataValue);
    return fmtVal;
  }, [dataValue]);

  return {
    ...remainTokenRes,
    data: {
      value: dataValue,
      formatted: dataFormatted,
    },
  };
}
