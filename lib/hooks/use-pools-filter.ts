import { useCallback, useMemo, useState } from "react";
import { IPool } from "../types/pool";

export function usePoolsFilter(pools: Array<IPool> | null) {
  const sortFields = useMemo(
    () => [
      {
        label: "Num",
        value: "Num",
      },
      {
        label: "APY",
        value: "APY",
      },
      {
        label: "Leverage",
        value: "Leverage",
      },
    ],
    [],
  );

  const filterLeverageFields = useMemo(
    () => [
      {
        label: "",
        value: "",
        hide: true,
      },
      {
        label: "1 ~ 5×",
        value: 5,
      },
      {
        label: "1 ~ 10×",
        value: 10,
      },
      {
        label: "1 ~ 20×",
        value: 20,
      },
      {
        label: "1 ~ 50×",
        value: 50,
      },
    ],
    [],
  );

  const expirationFields = useMemo(
    () => [
      {
        label: "",
        value: "",
        hide: true,
      },
      {
        label: "< 1 months",
        value: 30 * 24 * 60 * 60 * 1,
      },
      {
        label: "< 2 months",
        value: 30 * 24 * 60 * 60 * 2,
      },
      {
        label: "< 3 months",
        value: 30 * 24 * 60 * 60 * 3,
      },
    ],
    [],
  );

  const [sortBy, setSortBy] = useState("Num");
  const [searchStr, setSearchStr] = useState("");
  const [filterLeverage, setFilterLeverage] = useState("");
  const [expiration, setExpiration] = useState("");

  const [poolAPYs, setPoolAPYs] = useState<Record<string, string>>({});

  const filteredPools = useMemo<Array<IPool>>((): Array<IPool> => {
    if (!pools) return [];

    let sortedPools = pools;

    if (sortBy === "Num") {
      sortedPools = pools.sort((a, b) => Number(a.poolId) - Number(b.poolId));
    } else if (sortBy === "APY") {
      sortedPools = pools.sort((a, b) => {
        const aAPY = poolAPYs[a.poolId] || 0;
        const bAPY = poolAPYs[b.poolId] || 0;
        return Number(aAPY) - Number(bAPY);
      });
    } else if (sortBy === "Leverage") {
      sortedPools = pools.sort(
        (a, b) => Number(a.maxleverage) - Number(b.maxleverage),
      );
    }

    let filterPools = sortedPools;
    if (filterLeverage) {
      filterPools = sortedPools.filter((p) => {
        return (
          Number(p.maxleverage) / 100 <= Number(filterLeverage || Infinity)
        );
      });
    }

    if (expiration) {
      filterPools = sortedPools.filter((p) => {
        const past = new Date().getTime() / 1000 - Number(p.poolCreateTimes);
        const left = Number(p.durationDays) - past;

        return left <= Number(expiration || Infinity);
      });
    }

    let fPools = filterPools;
    if (!searchStr) {
      return fPools;
    } else {
      fPools = filterPools.filter((p) => {
        return p.poolId.toString().includes(searchStr);
      });
    }

    return fPools;
  }, [sortBy, pools, poolAPYs, searchStr, filterLeverage, expiration]);

  const recordPoolAPY = useCallback((poolId: string, poolAPY: string) => {
    setPoolAPYs((prev: Record<string, string>) => {
      return {
        ...prev,
        [poolId]: poolAPY,
      };
    });
  }, []);

  return {
    filterLeverageFields,
    filterLeverage,
    expiration,
    setExpiration,
    expirationFields,
    setFilterLeverage,
    sortFields,
    sortBy,
    searchStr,
    setSearchStr,
    setSortBy,
    filteredPools,
    poolAPYs,
    setPoolAPYs,
    recordPoolAPY,
  };
}
