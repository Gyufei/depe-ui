import { useEffect } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useDebouncedCallback } from "use-debounce";

import { useActivePanel } from "@/lib/hooks/use-active-panel";
import { useTokens } from "@/lib/hooks/use-tokens";
import {
  SBaseTokenAmountAtom,
  SBaseTokenAtom,
  SLeverageAtom,
  SQuoteTokenAmountAtom,
  SQuoteTokenAtom,
} from "@/lib/states/swap";
import { encodePath } from "@/lib/web3/utils";

import InputPanel from "@/components/share/input-panel";
import { UniswapQuoterABI } from "@/lib/abi/UniswapQuoter";
import { useChainConfig } from "@/lib/hooks/use-chain-config";
import { usePublicClient } from "wagmi";
import { formatUnits, parseUnits } from "viem";

export default function BaseTokenInput() {
  const { isActivePanel } = useActivePanel("Swap");

  const publicClient = usePublicClient();
  const { chainConfig } = useChainConfig();

  const { marginTokens, isLoading: tokenLoading } = useTokens();

  const [baseToken, setBaseToken] = useAtom(SBaseTokenAtom);
  const [baseTokenAmount, setBaseTokenAmount] = useAtom(SBaseTokenAmountAtom);
  const quoteToken = useAtomValue(SQuoteTokenAtom);
  const setQuoteTokenAmount = useSetAtom(SQuoteTokenAmountAtom);
  const leverage = useAtomValue(SLeverageAtom);

  useEffect(() => {
    if (marginTokens?.length) {
      setBaseToken(marginTokens[0]);
    }
  }, [marginTokens, setBaseToken]);

  const handleValueChange = (value: string) => {
    setBaseTokenAmount(value);
    debouncedChange(value);
  };

  const debouncedChange = useDebouncedCallback((value) => {
    getQuoteTokenValue(value);
  }, 1000);

  const getQuoteTokenValue = async (value: string) => {
    if (!chainConfig) return;
    if (!baseToken || !quoteToken) return;
    if (!value) return;

    const amount = parseUnits(value, baseToken?.decimals);
    const path = [baseToken?.address, quoteToken?.address];
    const fees = [3000];
    const encodedPath = encodePath(path, fees);

    const toParam = chainConfig.contract.UniswapV3Quoter;

    const { result } = await publicClient.simulateContract({
      address: toParam,
      abi: UniswapQuoterABI,
      functionName: "quoteExactInput",
      args: [encodedPath as any, amount as any],
    });

    const withLeverage = result * BigInt(leverage || 1);
    const withSlippage = (withLeverage * 1000n) / 1005n;
    const amountOut = formatUnits(withSlippage, quoteToken.decimals);
    setQuoteTokenAmount(amountOut.toString());
  };

  return (
    <InputPanel
      isLoading={tokenLoading}
      isStableToken={true}
      isActive={isActivePanel}
      tokens={marginTokens || []}
      token={baseToken}
      setToken={setBaseToken}
      value={baseTokenAmount || ""}
      setValue={handleValueChange}
    />
  );
}
