import { useContext } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useDebouncedCallback } from "use-debounce";

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
import { useChainConfig } from "@/lib/hooks/common/use-chain-config";
import { UNISWAP_FEES } from "@/lib/constant";
import { StableTokenSelectDisplay } from "@/components/share/input-panel-token-display";
import BalanceDisplay from "@/components/share/balance-display";
import { useTokenBalance } from "@/lib/hooks/contract/use-token-balance";
import { useSwapBaseCalc } from "@/lib/hooks/use-swap-calc";
import { usePoolFormat } from "@/lib/hooks/use-pool-format";
import { IsActivePanelContext } from "../hover-active-panel";
import { IToken } from "@/lib/types/token";
import useSwapPickPool from "@/lib/hooks/use-swap-pick-pool";

export default function BaseTokenInput() {
  const { chainConfig } = useChainConfig();
  const isActivePanel = useContext(IsActivePanelContext);

  const { swapPickPool } = useSwapPickPool();
  const { marginTokens, isLoading: isTokenLoading } = useTokens();
  const { calcAmountInMax, calcQuoteToken } = useSwapBaseCalc();

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

  const onTokenSelected = (t: IToken) => {
    setBaseToken(() => {
      swapPickPool({
        baseToken: t,
      });
      return t;
    });
  };

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

    const aInMaxRes = calcAmountInMax(
      baseV,
      baseToken!.decimals,
      leverage,
      slippage,
      tradingFeeRate!,
    );

    const ePath = encodePath(
      [baseToken!.address, quoteToken!.address],
      UNISWAP_FEES,
    );
    const quoteVal = await calcQuoteToken(
      aInMaxRes.aInMax,
      quoteToken!.decimals,
      ePath,
    );
    setAmountInMax(aInMaxRes.aInMaxWithSlippage);
    setQuoteTokenAmount(quoteVal);
  };

  return (
    <InputPanel
      tokenDisplay={
        <StableTokenSelectDisplay
          isLoading={isTokenLoading}
          tokens={marginTokens || []}
          token={baseToken!}
          setToken={onTokenSelected}
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
