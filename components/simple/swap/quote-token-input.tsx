import { useEffect } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { usePublicClient } from "wagmi";
import { formatUnits, parseUnits, Address } from "viem";
import { useDebouncedCallback } from "use-debounce";
import NP from "number-precision";

import { useActivePanel } from "@/lib/hooks/use-active-panel";
import { useChainConfig } from "@/lib/hooks/use-chain-config";
import { useTokens } from "@/lib/hooks/use-tokens";
import {
  SAmountInMaxAtom,
  SBaseTokenAmountAtom,
  SBaseTokenAtom,
  SLeverageAtom,
  SPoolAtom,
  SQuoteTokenAmountAtom,
  SQuoteTokenAtom,
  SSlippageAtom,
} from "@/lib/states/swap";

import InputPanel from "@/components/share/input-panel";
import { encodePath } from "@/lib/utils/web3";
import { UniswapQuoterABI } from "@/lib/abi/UniswapQuoter";
import { useSwapFeeParams } from "@/lib/hooks/use-swap-fee-params";
import { UNISWAP_FEES } from "@/lib/constant";
import { TokenSelectDisplay } from "@/components/share/input-panel-token-display";

export default function QuoteTokenInput() {
  const { isActivePanel } = useActivePanel("Swap");

  const publicClient = usePublicClient();
  const { chainConfig } = useChainConfig();
  const { notMarginTokens, isLoading: tokenLoading } = useTokens();

  const { calcFeeParams } = useSwapFeeParams();

  const leverage = useAtomValue(SLeverageAtom);
  const slippage = useAtomValue(SSlippageAtom);
  const pool = useAtomValue(SPoolAtom);

  const [quoteToken, setQuoteToken] = useAtom(SQuoteTokenAtom);
  const [quoteTokenAmount, setQuoteTokenAmount] = useAtom(
    SQuoteTokenAmountAtom,
  );
  const baseToken = useAtomValue(SBaseTokenAtom);
  const setBaseTokenAmount = useSetAtom(SBaseTokenAmountAtom);
  const setAmountInMax = useSetAtom(SAmountInMaxAtom);

  useEffect(() => {
    if (notMarginTokens?.length) {
      setQuoteToken(notMarginTokens[0]);
    }
  }, [notMarginTokens, setQuoteToken]);

  const handleValueChange = (value: string) => {
    setQuoteTokenAmount(value);
    debounceCalcPairValue(value);
  };

  const debounceCalcPairValue = useDebouncedCallback((value) => {
    calcPairValue(value);
  }, 1000);

  const calcPairValue = async (quoteV: string) => {
    if (!chainConfig) return;
    if (!baseToken || !quoteToken) return;
    if (!quoteV) return;
    if (!leverage) return;
    if (!pool) return;

    const aInMax = await calcAmountInMax(quoteV);
    const baseVal = calcBaseTokenValue(aInMax);

    setAmountInMax(aInMax);
    setBaseTokenAmount(baseVal);
  };

  const calcAmountInMax = async (quoteV: string): Promise<bigint> => {
    const amount = parseUnits(quoteV, quoteToken!.decimals);

    const path = [quoteToken!.address, baseToken!.address];
    const encodedPath = encodePath(path, UNISWAP_FEES);

    const toParam = chainConfig!.contract.UniswapV3Quoter as Address;
    const { result } = await publicClient.simulateContract({
      address: toParam,
      abi: UniswapQuoterABI,
      functionName: "quoteExactOutput",
      args: [encodedPath as any, amount as any],
    });

    return result;
  };

  const calcBaseTokenValue = (aInMax: bigint): string => {
    const aInMaxAmount = formatUnits(aInMax, baseToken!.decimals);
    const feeParams = calcFeeParams(leverage, slippage, pool!.tradingFeeRate);

    const baseVal = NP.divide(NP.times(aInMaxAmount, feeParams), leverage);
    const withUnitBaseVal = parseUnits(baseVal.toString(), baseToken!.decimals);
    const formatBaseVal = formatUnits(withUnitBaseVal, baseToken!.decimals);
    return formatBaseVal;
  };

  return (
    <InputPanel
      tokenDisplay={
        <TokenSelectDisplay
          isLoading={tokenLoading}
          tokens={notMarginTokens || []}
          token={quoteToken!}
          setToken={setQuoteToken}
        />
      }
      isActive={isActivePanel}
      value={quoteTokenAmount || ""}
      setValue={handleValueChange}
    />
  );
}
