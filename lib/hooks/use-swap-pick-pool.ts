import { useAtom, useSetAtom } from "jotai";

import { usePools } from "./api/use-pools";
import { usePickPool } from "./use-pick-pool";
import { IPool } from "../types/pool";
import {
  SBaseTokenAtom,
  SLeverageAtom,
  SPoolAtom,
  SQuoteTokenAtom,
} from "../states/swap";
import { IToken } from "../types/token";

export default function useSwapPickPool() {
  const { data: pools, isLoading } = usePools();
  const { handlePickPool, onPoolSelected } = usePickPool();

  const [baseToken, setBaseToken] = useAtom(SBaseTokenAtom);
  const [quoteToken, setQuoteToken] = useAtom(SQuoteTokenAtom);
  const [leverage, setLeverage] = useAtom(SLeverageAtom);
  const setPool = useSetAtom(SPoolAtom);

  const swapPickPool = (conditions?: {
    baseToken?: IToken;
    quoteToken?: IToken;
    leverage?: number;
  }) => {
    if (isLoading) return null;

    const pool = handlePickPool(
      pools,
      conditions?.baseToken || baseToken,
      conditions?.leverage || leverage,
      null,
      conditions?.quoteToken || quoteToken,
    );
    setPool(pool);

    return pool;
  };

  const onSwapPoolSelected = (selPool: IPool) => {
    const {
      marginToken: mt,
      quoteToken: qt,
      leverage: l,
    } = onPoolSelected(selPool);

    setPool(selPool);
    setBaseToken(mt || null);
    setQuoteToken(qt || null);
    setLeverage(l);

    return {
      marginToken: mt || null,
      quoteToken: qt || null,
      leverage: l,
    };
  };

  return {
    swapPickPool,
    onSwapPoolSelected,
  };
}
