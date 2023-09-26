import { useEffect } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useDebouncedCallback } from "use-debounce";
import NP from "number-precision";

import { useActivePanel } from "@/lib/hooks/use-active-panel";
import { useTokens } from "@/lib/hooks/use-tokens";
import {
  SAmountInMaxAtom,
  SBaseTokenAmountAtom,
  SBaseTokenAtom,
  SBaseTokenBalanceAtom,
  SLeverageAtom,
  SPoolAtom,
  SQuoteTokenAmountAtom,
  SQuoteTokenAtom,
  SSlippageAtom,
} from "@/lib/states/swap";
import { encodePath } from "@/lib/utils/web3";

import InputPanel from "@/components/share/input-panel";
import { UniswapQuoterABI } from "@/lib/abi/UniswapQuoter";
import { useChainConfig } from "@/lib/hooks/use-chain-config";
import { usePublicClient } from "wagmi";
import { formatUnits, parseUnits } from "viem";
import { useSwapFeeParams } from "@/lib/hooks/use-swap-fee-params";
import { UNISWAP_FEES } from "@/lib/constant";
import { StableTokenSelectDisplay } from "@/components/share/input-panel-token-display";
import BalanceDisplay from "@/components/share/balance-display";
import { useTokenBalance } from "@/lib/hooks/use-token-balance";

export default function BaseTokenInput() {
  const { isActivePanel } = useActivePanel("Swap");

  const publicClient = usePublicClient();
  const { chainConfig } = useChainConfig();

  const { marginTokens, isLoading: isTokenLoading } = useTokens();

  const { calcFeeParams } = useSwapFeeParams();

  const leverage = useAtomValue(SLeverageAtom);
  const slippage = useAtomValue(SSlippageAtom);
  const pool = useAtomValue(SPoolAtom);

  const [baseToken, setBaseToken] = useAtom(SBaseTokenAtom);
  const [baseTokenAmount, setBaseTokenAmount] = useAtom(SBaseTokenAmountAtom);
  const quoteToken = useAtomValue(SQuoteTokenAtom);
  const setQuoteTokenAmount = useSetAtom(SQuoteTokenAmountAtom);
  const setAmountInMax = useSetAtom(SAmountInMaxAtom);
  const setBaseBalance = useSetAtom(SBaseTokenBalanceAtom);

  const { data: balanceObj, isLoading: isBalanceLoading } = useTokenBalance(
    baseToken?.address || null,
  );

  useEffect(() => {
    setBaseBalance(balanceObj?.formatted || null);
  }, [balanceObj?.formatted, setBaseBalance]);

  useEffect(() => {
    if (marginTokens?.length) {
      setBaseToken(marginTokens[0]);
    }
  }, [marginTokens, setBaseToken]);

  const handleValueChange = (value: string) => {
    setBaseTokenAmount(value);
    debouncedCalcPairVal(value);
  };

  const debouncedCalcPairVal = useDebouncedCallback((baseV: string) => {
    calcPairValue(baseV);
  }, 1000);

  const calcPairValue = async (baseV: string) => {
    if (!chainConfig) return;
    if (!baseToken || !quoteToken) return;
    if (!baseV) return;
    if (!leverage) return;
    if (!pool) return;

    const aInMax = calcAmountInMaxValue(baseV);
    const quoteVal = await calcQuoteTokenValue(aInMax);
    setAmountInMax(aInMax);
    setQuoteTokenAmount(quoteVal);
  };

  const calcAmountInMaxValue = (value: string): bigint => {
    const feeParams = calcFeeParams(leverage, slippage, pool!.tradingFeeRate);

    const amount = parseUnits(value, baseToken!.decimals);
    const withLeverageAmount = NP.times(amount.toString(), leverage);

    const aInMax = NP.divide(withLeverageAmount, feeParams);
    return BigInt(aInMax.toFixed());
  };

  const calcQuoteTokenValue = async (aInMax: bigint) => {
    const path = [baseToken!.address, quoteToken!.address];
    const encodedPath = encodePath(path, UNISWAP_FEES);

    const toParam = chainConfig!.contract.UniswapV3Quoter;
    const { result } = await publicClient.simulateContract({
      address: toParam,
      abi: UniswapQuoterABI,
      functionName: "quoteExactInput",
      args: [encodedPath as any, aInMax],
    });

    const quoteVal = formatUnits(result, quoteToken!.decimals);
    return quoteVal;
  };

  return (
    <InputPanel
      tokenDisplay={
        <StableTokenSelectDisplay
          isLoading={isTokenLoading}
          tokens={marginTokens || []}
          token={baseToken!}
          setToken={setBaseToken}
        />
      }
      balanceDisplay={
        <BalanceDisplay
          isLoading={isBalanceLoading}
          balance={balanceObj?.formatted || null}
          prefixText="Wallet Balance"
          setMax={() => handleValueChange(balanceObj?.formatted || "")}
        />
      }
      isActive={isActivePanel}
      value={baseTokenAmount || ""}
      setValue={handleValueChange}
    />
  );
}
