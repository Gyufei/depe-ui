import { useTokens } from "./use-tokens";
import type { IToken } from "../types/token";
import type { AddressType } from "../types/address";

export function useTokensInfo(
  address: Array<AddressType>,
): Array<IToken | null> {
  const { data: tokens } = useTokens();

  const getTokenInfo = (addr: AddressType) => {
    if (!tokens?.length) return null;

    const tInfo = tokens.find((t) => t.address === addr);

    return tInfo!;
  };

  const tInfos = address.map((addr) => getTokenInfo(addr));
  return tInfos;
}
