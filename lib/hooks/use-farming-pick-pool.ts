import { useAtom, useSetAtom } from "jotai";
import {
  FLeverageAtom,
  FMarginTokenAtom,
  FPoolAtom,
  FRatingLevelAtom,
} from "../states/farming";
import { usePools } from "./api/use-pools";
import { usePickPool } from "./use-pick-pool";
import { IPool } from "../types/pool";
import { IToken } from "../types/token";

export default function useFarmingMatchPool() {
  const { data: pools, isLoading } = usePools();
  const { handlePickPool, onPoolSelected } = usePickPool();

  const [marginToken, setMarginToken] = useAtom(FMarginTokenAtom);
  const [ratingLevel, setRatingLevel] = useAtom(FRatingLevelAtom);
  const [leverage, setLeverage] = useAtom(FLeverageAtom);
  const setPool = useSetAtom(FPoolAtom);

  const farmingPickPool = (conditions?: {
    token?: IToken;
    leverage?: number;
    level?: string;
  }) => {
    if (isLoading) return null;

    const pool = handlePickPool(
      pools,
      conditions?.token || marginToken,
      conditions?.leverage || leverage,
      conditions?.level || ratingLevel,
      null,
    );
    setPool(pool);

    return pool;
  };

  const onFarmingPoolSelected = (selPool: IPool) => {
    const {
      marginToken: mt,
      leverage: l,
      ratingLevel: rt,
    } = onPoolSelected(selPool);

    setPool(selPool);
    setMarginToken(mt || null);
    setLeverage(l);
    setRatingLevel(rt);

    return {
      marginToken: mt || null,
      leverage: l,
      ratingLevel: rt,
    };
  };

  return {
    farmingPickPool,
    onFarmingPoolSelected,
  };
}
