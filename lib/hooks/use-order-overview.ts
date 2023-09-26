import { useAtomValue, useSetAtom } from "jotai";
import {
  SBaseTokenAmountAtom,
  SBaseTokenAtom,
  SLeverageAtom,
  SOrderOverViewAtom,
  SPoolAtom,
  SQuoteTokenAmountAtom,
  SQuoteTokenAtom,
} from "../states/swap";
import { useTokenPrice } from "./use-token-price";
import { usePoolFormat } from "./use-pool-format";
import { formatNum } from "../utils/number";

export function useOrderOverview() {
  const leverage = useAtomValue(SLeverageAtom);
  const pool = useAtomValue(SPoolAtom);

  const baseToken = useAtomValue(SBaseTokenAtom);
  const baseAmount = useAtomValue(SBaseTokenAmountAtom);
  const quoteToken = useAtomValue(SQuoteTokenAtom);
  const quoteAmount = useAtomValue(SQuoteTokenAmountAtom);
  const setOrderOverview = useSetAtom(SOrderOverViewAtom);

  const { dataFormatted: quotePrice } = useTokenPrice(
    quoteToken?.address || null,
    quoteToken?.decimals,
  );

  const { expiration } = usePoolFormat(pool);

  const handleOrderOverviewDisplay = () => {
    const size = quoteAmount ? formatNum(quoteAmount, 8, true) : null;
    const margin = baseAmount ? formatNum(baseAmount) : null;

    const ov = {
      leverage: `${leverage}×`,
      expiration: expiration.full || "",
      orderSize: `${size} ${quoteToken?.symbol}`,
      entryPrice: `$${quotePrice} per ${quoteToken?.symbol}`,
      marginAmount: `${margin} ${baseToken?.symbol}`,
    };

    setOrderOverview(ov);
  };

  return {
    handleOrderOverviewDisplay,
  };
}
