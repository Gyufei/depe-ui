import { useMemo } from "react";
import { useContractRead } from "wagmi";
import { formatUnits, Address } from "viem";

import { PriceOracleABI } from "../abi/PriceOracle";
import { useChainConfig } from "./use-chain-config";
import { formatNum } from "../utils/number";

export function useTokenPrice(
  tokenAddress: Address | null,
  decimals: number = 18,
) {
  const { chainConfig } = useChainConfig();

  const priceOracleAddress = chainConfig?.contract?.PriceOracle;

  const priceRes = useContractRead({
    address: priceOracleAddress,
    abi: PriceOracleABI,
    functionName: "getLatestMixinPrice",
    args: [tokenAddress || "0x"],
    enabled: !!tokenAddress,
  });

  const dataFormatted = useMemo(() => {
    if (!tokenAddress || !priceRes.data) return null;

    const unitVal = formatUnits(priceRes.data, decimals);
    const fmtVal = formatNum(unitVal);

    return fmtVal;
  }, [tokenAddress, decimals, priceRes.data]);

  return {
    dataFormatted,
    ...priceRes,
  };
}
