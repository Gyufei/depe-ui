import { usePublicClient } from "wagmi";

const GlobalCacheMap = new Map();

export const POOL_APY_CACHE_KEY = "PoolApy";

export function useCacheMap(target: string) {
  const { chain } = usePublicClient();

  if (!GlobalCacheMap.has(chain.name)) {
    GlobalCacheMap.set(chain.name, new Map());
  }

  const chainCacheMap = GlobalCacheMap.get(chain.name);

  if (!chainCacheMap.has(target)) {
    chainCacheMap.set(target, new Map());
  }

  return chainCacheMap.get(target);
}
