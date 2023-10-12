import { useContext } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useDebouncedCallback } from "use-debounce";

import { useChainConfig } from "@/lib/hooks/common/use-chain-config";
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
import { useTokenRoutes } from "@/lib/hooks/api/use-token-routes";
import { TokenSelectDisplay } from "@/components/share/input-panel-token-display";
import { useSwapQuoteCalc } from "@/lib/hooks/use-swap-calc";
import { usePoolFormat } from "@/lib/hooks/use-pool-format";
import { IsActivePanelContext } from "../hover-active-panel";
import useSwapPickPool from "@/lib/hooks/use-swap-pick-pool";
import { IToken } from "@/lib/types/token";

export default function QuoteTokenInput() {
  const isActive = useContext(IsActivePanelContext);

  const { chainConfig } = useChainConfig();
  const { notMarginTokens, isLoading: tokenLoading } = useTokens();
  const { encodeTokenPath } = useTokenRoutes();

  const leverage = useAtomValue(SLeverageAtom);
  const slippage = useAtomValue(SSlippageAtom);
  const pool = useAtomValue(SPoolAtom);

  const { swapPickPool } = useSwapPickPool();

  const [quoteToken, setQuoteToken] = useAtom(SQuoteTokenAtom);
  const [quoteTokenAmount, setQuoteTokenAmount] = useAtom(
    SQuoteTokenAmountAtom,
  );
  const baseToken = useAtomValue(SBaseTokenAtom);
  const setBaseTokenAmount = useSetAtom(SBaseTokenAmountAtom);
  const setAmountInMax = useSetAtom(SAmountInMaxAtom);

  const { calcAmountInMax, calcBaseToken } = useSwapQuoteCalc();
  const { tradingFeeRate } = usePoolFormat(pool);

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
    if (!chainConfig) return;
    if (!baseToken || !quoteToken) return;
    if (!quoteV) return;
    if (!leverage) return;
    if (!pool) return;

    const ePath = encodeTokenPath(
      baseToken!.address,
      quoteToken!.address,
      true,
    );
    if (!ePath) return;

    const aInMaxRes = await calcAmountInMax(
      quoteV,
      quoteToken!.decimals,
      ePath,
      slippage,
      baseToken!.decimals,
    );

    const baseVal = calcBaseToken(
      aInMaxRes.aInMax,
      baseToken!.decimals,
      leverage,
      slippage,
      tradingFeeRate!,
    );

    setAmountInMax(aInMaxRes.aInMaxWithSlippage);
    setBaseTokenAmount(baseVal);
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
