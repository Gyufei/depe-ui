import { random } from "lodash";
import { useTokens } from "./use-tokens";
import type { IToken } from "../types/token";
import type { AddressType } from "../types/address";

export function useTokensInfo(
  address: Array<AddressType>,
): Array<IToken | null> {
  const { data } = useTokens();

  function getTokenInfo(addr: AddressType) {
    if (!data?.length) return null;

    const tIndex = random(data.length - 1);
    const tInfo = {
      ...data[tIndex],
      address: addr,
    };

    return tInfo!;
  }

  const tInfos = address.map((addr) => getTokenInfo(addr));

  return tInfos;
}
