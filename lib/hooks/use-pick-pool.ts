import NP from "number-precision";

import { useTokens } from "./api/use-tokens";
import { IPool } from "../types/pool";
import { RATING_LEVELS } from "../constant";
import { IToken } from "../types/token";
import { maxBy } from "lodash";
import { getTokenRating } from "../token-rate";

export function usePickPool() {
  const { data: tokens } = useTokens();

  const handlePickPool = (
    pools: Array<IPool>,
    marginToken: IToken | null,
    leverage: number | null,
    ratingLevel: (typeof RATING_LEVELS)[number] | null,
    quoteToken: IToken | null,
  ) => {
    const marginMatchArr = pools
      .filter((pool) => {
        if (!marginToken) return false;
        return pool.baseToken === marginToken?.address;
      })
      .map((p) => p.poolId);
    if (marginToken && !marginMatchArr.length) return null;

    const quoteMatchArr = pools
      .filter((pool) => {
        if (!quoteToken) return false;
        return pool.quoteToken === quoteToken?.address;
      })
      .map((p) => p.poolId);
    if (quoteToken && !quoteMatchArr.length) return null;

    const ratingMatchArr = pools
      .filter((pool) => {
        if (!ratingLevel) return false;

        const quoteToken = tokens?.find((t) => pool.quoteToken === t.address);
        const pRating = getTokenRating(quoteToken?.ratingScore);
        if (!pRating) return false;

        if (ratingLevel === RATING_LEVELS[0]) {
          return pRating > 0;
        } else if (ratingLevel === RATING_LEVELS[1]) {
          return pRating > 4;
        } else if (ratingLevel === RATING_LEVELS[2]) {
          return pRating > 7;
        }
      })
      .map((p) => p.poolId);
    if (ratingLevel && !ratingMatchArr.length) return null;

    const leverageMatchArr = pools
      .filter((pool) => {
        if (!leverage) return false;

        const pLeverage = NP.divide(pool.maxleverage, 100);
        return pLeverage >= (leverage || 0);
      })
      .map((p) => p.poolId);
    if (leverage && !leverageMatchArr.length) return null;

    const poolIdHitMap: Record<string, number> = {};

    pools.forEach((pool) => {
      poolIdHitMap[pool.poolId] = 0;

      if (marginMatchArr.includes(pool.poolId)) {
        poolIdHitMap[pool.poolId] += 3;
      }

      if (quoteMatchArr.includes(pool.poolId)) {
        poolIdHitMap[pool.poolId] += 2;
      }

      if (ratingMatchArr.includes(pool.poolId)) {
        poolIdHitMap[pool.poolId] += 1;
      }

      if (leverageMatchArr.includes(pool.poolId)) {
        poolIdHitMap[pool.poolId] += 1;
      }
    });

    const allHitArr = pools.map((p) => ({
      poolId: p.poolId,
      pool: p,
      hit: poolIdHitMap[p.poolId],
    }));

    const hitPoolObj = maxBy(allHitArr, (p) => p.hit);

    if (!hitPoolObj) return null;
    return hitPoolObj?.hit !== 0 ? hitPoolObj.pool : null;
  };

  const onPoolSelected = (selectedPool: IPool) => {
    const marginToken = tokens?.find(
      (t) => t.address === selectedPool.baseToken,
    );

    const quoteToken = tokens?.find(
      (t) => selectedPool.quoteToken === t.address,
    );

    const pRating = getTokenRating(quoteToken!.ratingScore) || 10;
    let ratingLevel: (typeof RATING_LEVELS)[number] | null = null;

    if (pRating < 4) {
      ratingLevel = RATING_LEVELS[0];
    } else if (pRating >= 4 && pRating < 77) {
      ratingLevel = RATING_LEVELS[1];
    } else if (pRating >= 7) {
      ratingLevel = RATING_LEVELS[2];
    }

    const leverage = NP.divide(selectedPool.maxleverage, 100);

    return {
      marginToken,
      quoteToken,
      ratingLevel,
      leverage,
    };
  };

  return {
    handlePickPool,
    onPoolSelected,
  };
}
