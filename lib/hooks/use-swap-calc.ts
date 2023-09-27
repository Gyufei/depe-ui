import { formatUnits, parseUnits } from "viem";
import NP from "number-precision";
import { usePublicClient } from "wagmi";

import { useChainConfig } from "./use-chain-config";
import { UniswapQuoterABI } from "@/lib/abi/UniswapQuoter";

const calcFeeParams = (
  leverage: number,
  slippage: string,
  tradingFeeRate: number,
) => {
  const slippageVal = NP.divide(slippage, 100);
  const withLeverageFee = NP.times(tradingFeeRate, leverage);

  const feeParams = NP.times(
    NP.minus(1, slippageVal),
    NP.plus(1, withLeverageFee),
  );

  return feeParams;
};

export function useSwapBaseCalc() {
  const { chainConfig } = useChainConfig();
  const publicClient = usePublicClient();

  const calcAmountInMax = (
    value: string,
    decimals: number,
    leverage: number,
    feeParams: number,
  ): bigint => {
    const amount = parseUnits(value, decimals);
    const withLeverageAmount = NP.times(amount.toString(), leverage);

    const aInMax = NP.divide(withLeverageAmount, feeParams);
    return BigInt(aInMax.toFixed());
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
    calcFeeParams,
    calcAmountInMax,
    calcQuoteToken,
  };
}

export function useSwapQuoteCalc() {
  const { chainConfig } = useChainConfig();
  const publicClient = usePublicClient();

  const calcAmountInMax = async (
    quoteV: string,
    decimals: number,
    ePath: string,
  ): Promise<bigint> => {
    const amount = parseUnits(quoteV, decimals);

    const toParam = chainConfig!.contract.UniswapV3Quoter;
    const { result } = await publicClient.simulateContract({
      address: toParam,
      abi: UniswapQuoterABI,
      functionName: "quoteExactOutput",
      args: [ePath as any, amount as any],
    });

    return result;
  };

  const calcBaseToken = (
    aInMax: bigint,
    decimals: number,
    leverage: number,
    feeParams: number,
  ): string => {
    const aInMaxAmount = formatUnits(aInMax, decimals);

    const baseVal = NP.divide(NP.times(aInMaxAmount, feeParams), leverage);
    const withUnitBaseVal = parseUnits(baseVal.toString(), decimals);
    const formatBaseVal = formatUnits(withUnitBaseVal, decimals);
    return formatBaseVal;
  };

  return {
    calcFeeParams,
    calcAmountInMax,
    calcBaseToken,
  };
}
