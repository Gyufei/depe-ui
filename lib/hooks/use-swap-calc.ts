import { formatUnits, parseUnits } from "viem";
import NP from "number-precision";
import { usePublicClient } from "wagmi";

import { useClusterConfig } from "./common/use-cluster-config";
import { UniswapQuoterABI } from "@/lib/abi/UniswapQuoter";

export function useSwapBaseCalc() {
  const { chainConfig } = useClusterConfig();
  const publicClient = usePublicClient();

  const calcAmountInMax = (
    value: string,
    decimals: number,
    leverage: number,
    slippage: string,
    tradingFeeRate: number,
  ): {
    aInMax: bigint;
    aInMaxWithSlippage: bigint;
  } => {
    const amount = parseUnits(value, decimals);
    const withLeverageAmount = NP.times(amount.toString(), leverage);

    const slippageVal = NP.divide(slippage, 100);
    const withLeverageFee = NP.times(tradingFeeRate, leverage);

    const aInMax = NP.divide(
      NP.times(withLeverageAmount, NP.minus(1, slippageVal)),
      NP.plus(1, withLeverageFee),
    );

    const aInMaxWithSlippage = NP.divide(aInMax, NP.minus(1, slippageVal));

    return {
      aInMax: BigInt(aInMax.toFixed()),
      aInMaxWithSlippage: BigInt(aInMaxWithSlippage.toFixed()),
    };
  };

  const calcQuoteToken = async (
    aInMax: bigint,
    decimals: number,
    ePath: string,
  ) => {
    const QuoterAddress = chainConfig!.contract.UniswapV3Quoter;
    const { result } = await publicClient.simulateContract({
      address: QuoterAddress,
      abi: UniswapQuoterABI,
      functionName: "quoteExactInput",
      args: [ePath as any, aInMax],
    });

    const quoteVal = formatUnits(result, decimals);
    return quoteVal;
  };

  return {
    calcAmountInMax,
    calcQuoteToken,
  };
}

export function useSwapQuoteCalc() {
  const { chainConfig } = useClusterConfig();
  const publicClient = usePublicClient();

  const calcAmountInMax = async (
    quoteV: string,
    decimals: number,
    ePath: string,
    slippage: string,
    baseDecimals: number,
  ): Promise<{
    aInMax: bigint;
    aInMaxWithSlippage: bigint;
  }> => {
    const amount = parseUnits(quoteV, decimals);
    const slippageVal = NP.divide(slippage, 100);

    const toParam = chainConfig!.contract.UniswapV3Quoter;
    const { result } = await publicClient.simulateContract({
      address: toParam,
      abi: UniswapQuoterABI,
      functionName: "quoteExactOutput",
      args: [ePath as any, amount as any],
    });

    const aInMaxWithSlippage = NP.divide(
      formatUnits(result, baseDecimals),
      NP.minus(1, slippageVal),
    );

    return {
      aInMax: result,
      aInMaxWithSlippage: parseUnits(
        aInMaxWithSlippage.toString(),
        baseDecimals,
      ),
    };
  };

  const calcBaseToken = (
    aInMax: bigint,
    decimals: number,
    leverage: number,
    slippage: string,
    tradingFeeRate: number,
  ): string => {
    const slippageVal = NP.divide(slippage, 100);
    const withLeverageFee = NP.times(tradingFeeRate, leverage);

    const aInMaxAmount = formatUnits(aInMax, decimals);

    const baseVal = NP.divide(
      NP.times(aInMaxAmount, NP.plus(1, withLeverageFee)),
      NP.times(NP.minus(1, slippageVal), leverage),
    );
    const withUnitBaseVal = parseUnits(baseVal.toString(), decimals);
    const formatBaseVal = formatUnits(withUnitBaseVal, decimals);
    return formatBaseVal;
  };

  return {
    calcAmountInMax,
    calcBaseToken,
  };
}
