import { useMemo } from "react";
import { useContractRead } from "wagmi";
import { formatUnits, Address } from "viem";

import { PriceOracleABI } from "../../abi/PriceOracle";
import { useClusterConfig } from "../common/use-cluster-config";
import { formatNum } from "../../utils/number";

export function useTokenPrice(
  tokenAddress: Address | null,
  decimals: number = 18,
) {
  const { chainConfig } = useClusterConfig();

  const priceOracleAddress = chainConfig?.contract?.PriceOracle;

  const priceRes = useContractRead({
    address: priceOracleAddress,
    abi: PriceOracleABI,
    functionName: "getLatestMixinPrice",
    args: [tokenAddress || "0x"],
    enabled: !!tokenAddress,
  });

  const dataValue = useMemo(() => {
    if (!tokenAddress || !priceRes.data) return;
    const unitVal = formatUnits(priceRes.data, decimals);
    return unitVal;
  }, [tokenAddress, priceRes.data, decimals]);

  const dataFormatted = useMemo(() => {
    if (!dataValue) return;
    const fmtVal = formatNum(dataValue);

    return fmtVal;
  }, [dataValue]);

  return {
    ...priceRes,
    data: {
      value: dataValue,
      formatted: dataFormatted,
    },
  };
}
