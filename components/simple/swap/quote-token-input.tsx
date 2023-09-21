import { useEffect } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { usePublicClient } from "wagmi";
import { useDebouncedCallback } from "use-debounce";

import { useActivePanel } from "@/lib/hooks/use-active-panel";
import { useChainConfig } from "@/lib/hooks/use-chain-config";
import { useTokens } from "@/lib/hooks/use-tokens";
import {
  SBaseTokenAmountAtom,
  SBaseTokenAtom,
  SLeverageAtom,
  SQuoteTokenAmountAtom,
  SQuoteTokenAtom,
} from "@/lib/states/swap";

import InputPanel from "@/components/share/input-panel";
import { formatUnits, parseUnits } from "viem";
import { encodePath } from "@/lib/web3/utils";
import { AddressType } from "@/lib/types/address";
import { UniswapQuoterABI } from "@/lib/abi/UniswapQuoter";

export default function QuoteTokenInput() {
  const { isActivePanel } = useActivePanel("Swap");

  const publicClient = usePublicClient();
  const { chainConfig } = useChainConfig();

  const { notMarginTokens, isLoading: tokenLoading } = useTokens();
  const [quoteToken, setQuoteToken] = useAtom(SQuoteTokenAtom);
  const [quoteTokenAmount, setQuoteTokenAmount] = useAtom(
    SQuoteTokenAmountAtom,
  );
  const leverage = useAtomValue(SLeverageAtom);

  const baseToken = useAtomValue(SBaseTokenAtom);
  const setBaseTokenAmount = useSetAtom(SBaseTokenAmountAtom);

  useEffect(() => {
    if (notMarginTokens?.length) {
      setQuoteToken(notMarginTokens[0]);
    }
  }, [notMarginTokens, setQuoteToken]);

  const handleValueChange = (value: string) => {
    setQuoteTokenAmount(value);
    debouncedChange(value);
  };

  const debouncedChange = useDebouncedCallback((value) => {
    getQuoteTokenValue(value);
  }, 1000);

  const getQuoteTokenValue = async (value: string) => {
    if (!chainConfig) return;
    if (!baseToken || !quoteToken) return;
    if (!value) return;

    const amount = parseUnits(value, quoteToken?.decimals);
    const path = [quoteToken?.address, baseToken?.address];
    const fees = [3000];
    const encodedPath = encodePath(path, fees);

    const toParam = chainConfig.contract.UniswapV3Quoter as AddressType;
    const { result } = await publicClient.simulateContract({
      address: toParam,
      abi: UniswapQuoterABI,
      functionName: "quoteExactInput",
      args: [encodedPath as any, amount as any],
    });

    console.log("result", result);
    console.log((result * 1000n) / 1005n);
    const withLeverage = result / BigInt(leverage || 1);
    const withSlippage = (withLeverage * 1000n) / 995n;
    const amountOut = formatUnits(withSlippage, baseToken.decimals);
    setBaseTokenAmount(amountOut.toString());
  };

  return (
    <InputPanel
      isLoading={tokenLoading}
      isActive={isActivePanel}
      tokens={notMarginTokens || []}
      token={quoteToken}
      setToken={setQuoteToken}
      value={quoteTokenAmount || ""}
      setValue={handleValueChange}
    />
  );
}
