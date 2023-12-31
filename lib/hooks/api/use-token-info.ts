import { useTokens } from "./use-tokens";
import type { IToken } from "../../types/token";
import type { Address } from "viem";

export function useTokensInfo(
  address: Array<Address | null>,
): Array<IToken | null> {
  const { data: tokens } = useTokens();

  const getTokenInfo = (addr: Address | null) => {
    if (!addr) return null;
    if (!tokens?.length) return null;

    const tInfo = tokens.find((t) => t.address === addr);

    return tInfo!;
  };

  const tInfos = address.map((addr) => getTokenInfo(addr));
  return tInfos;
}
