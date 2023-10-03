import { useEffect } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useDebouncedCallback } from "use-debounce";

import { useActivePanel } from "@/lib/hooks/use-active-panel";
import { useTokens } from "@/lib/hooks/api/use-tokens";
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
import { encodePath } from "@/lib/utils/web3";

import InputPanel from "@/components/share/input-panel";
import { useChainConfig } from "@/lib/hooks/use-chain-config";
import { UNISWAP_FEES } from "@/lib/constant";
import { StableTokenSelectDisplay } from "@/components/share/input-panel-token-display";
import BalanceDisplay from "@/components/share/balance-display";
import { useTokenBalance } from "@/lib/hooks/contract/use-token-balance";
import { useSwapBaseCalc } from "@/lib/hooks/use-swap-calc";
import { usePoolFormat } from "@/lib/hooks/use-pool-format";

export default function BaseTokenInput() {
  const { isActivePanel } = useActivePanel("Swap");
  const { chainConfig } = useChainConfig();

  const { marginTokens, isLoading: isTokenLoading } = useTokens();
  const { calcFeeParams, calcAmountInMax, calcQuoteToken } = useSwapBaseCalc();

  const leverage = useAtomValue(SLeverageAtom);
  const slippage = useAtomValue(SSlippageAtom);
  const pool = useAtomValue(SPoolAtom);

  const [baseToken, setBaseToken] = useAtom(SBaseTokenAtom);
  const [baseTokenAmount, setBaseTokenAmount] = useAtom(SBaseTokenAmountAtom);
  const quoteToken = useAtomValue(SQuoteTokenAtom);
  const setQuoteTokenAmount = useSetAtom(SQuoteTokenAmountAtom);
  const setAmountInMax = useSetAtom(SAmountInMaxAtom);

  const { tradingFeeRate } = usePoolFormat(pool);

  const { data: balanceData, isLoading: isBalanceLoading } = useTokenBalance(
    baseToken?.address || null,
  );
  const baseTokenBalance = balanceData?.formatted || null;

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

    const feeParams = calcFeeParams(leverage, slippage, tradingFeeRate!);
    const aInMax = calcAmountInMax(
      baseV,
      baseToken!.decimals,
      leverage,
      feeParams,
    );

    const ePath = encodePath(
      [baseToken!.address, quoteToken!.address],
      UNISWAP_FEES,
    );
    const quoteVal = await calcQuoteToken(aInMax, quoteToken!.decimals, ePath);
    setAmountInMax(aInMax);
    setQuoteTokenAmount(quoteVal);
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
          balance={baseTokenBalance || null}
          prefixText="Wallet Balance"
          setMax={() => handleValueChange(balanceData?.value || "")}
        />
      }
      isActive={isActivePanel}
      value={baseTokenAmount || ""}
      setValue={handleValueChange}
    />
  );
}
