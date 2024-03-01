import { useContext } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useDebouncedCallback } from "use-debounce";

import { useClusterConfig } from "@/lib/hooks/common/use-cluster-config";
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

import InputPanel from "@/components/share/input-panel";
import { TokenSelectDisplay } from "@/components/share/input-panel-token-display";
import { usePoolFormat } from "@/lib/hooks/use-pool-format";
import { IsActivePanelContext } from "../hover-active-panel";
import useSwapPickPool from "@/lib/hooks/use-swap-pick-pool";
import { IToken } from "@/lib/types/token";

export default function QuoteTokenInput() {
  const isActive = useContext(IsActivePanelContext);

  const { clusterConfig } = useClusterConfig();
  const { notMarginTokens, isLoading: tokenLoading } = useTokens();

  const leverage = useAtomValue(SLeverageAtom);
  const slippage = useAtomValue(SSlippageAtom);
  const pool = useAtomValue(SPoolAtom);
  console.log(slippage);

  const { swapPickPool } = useSwapPickPool();

  const [quoteToken, setQuoteToken] = useAtom(SQuoteTokenAtom);
  const [quoteTokenAmount, setQuoteTokenAmount] = useAtom(
    SQuoteTokenAmountAtom,
  );
  const baseToken = useAtomValue(SBaseTokenAtom);
  const setBaseTokenAmount = useSetAtom(SBaseTokenAmountAtom);
  const setAmountInMax = useSetAtom(SAmountInMaxAtom);

  const { tradingFeeRate } = usePoolFormat(pool);
  console.log(tradingFeeRate);

  const onTokenSelected = (t: IToken) => {
    setQuoteToken(() => {
      swapPickPool({
        quoteToken: t,
      });

      return t;
    });
  };

  const handleValueChange = (value: string) => {
    setQuoteTokenAmount(value);
    debounceCalcPairValue(value);
  };

  const debounceCalcPairValue = useDebouncedCallback((value) => {
    calcPairValue(value);
  }, 1000);

  const calcPairValue = async (quoteV: string) => {
    if (!clusterConfig) return;
    if (!baseToken || !quoteToken) return;
    if (!quoteV) return;
    if (!leverage) return;
    if (!pool) return;

    setAmountInMax(BigInt(1));
    setBaseTokenAmount("1");
  };

  return (
    <InputPanel
      tokenDisplay={
        <TokenSelectDisplay
          isLoading={tokenLoading}
          tokens={notMarginTokens || []}
          token={quoteToken!}
          setToken={onTokenSelected}
        />
      }
      isActive={isActive}
      value={quoteTokenAmount || ""}
      setValue={handleValueChange}
    />
  );
}
