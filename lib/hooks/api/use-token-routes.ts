import { Address, encodeAbiParameters } from "viem";
import useSWRImmutable from "swr/immutable";

import fetcher from "../../fetcher";
import { useEndPoint } from "./use-endpoint";
import { TokenRouters } from "@/lib/types/token-router";
import { useCallback } from "react";

export function useTokenRoutes() {
  const { routerEndPoint } = useEndPoint();

  const { data, isLoading, error } = useSWRImmutable<TokenRouters>(
    routerEndPoint,
    fetcher,
  );

  const getTokenRoutePathAndFee = useCallback(
    (firstToken: Address, secondToken: Address) => {
      if (!data) return null;
      return data[firstToken][secondToken][0];
    },
    [data],
  );

  const encodeTokenPath = useCallback(
    (firstToken: Address, secondToken: Address, isReverse?: boolean) => {
      const targetRoute = getTokenRoutePathAndFee(firstToken, secondToken);
      if (!targetRoute) return null;

      const { path, fee } = targetRoute;

      const ePath = isReverse ? path.reverse() : path;
      return encodePath(ePath, fee);
    },
    [getTokenRoutePathAndFee],
  );

  const encodeTxExtendedParamsBytes = useCallback(
    (
      firstToken: Address,
      secondToken: Address,
      isReverse: boolean,
    ): Address | null => {
      const ePath = encodeTokenPath(firstToken, secondToken, isReverse);
      if (!ePath) return null;

      const abiEncodedPath = encodeAbiParameters(
        [
          {
            name: "extendedParamsBytes",
            type: "bytes",
          },
        ],
        [ePath],
      );

      return abiEncodedPath;
    },
    [encodeTokenPath],
  );

  return {
    data: data,
    isLoading,
    error,
    getTokenRoutePathAndFee,
    encodeTokenPath,
    encodeTxExtendedParamsBytes,
  };
}

export function encodePath(path: Array<Address>, fees: number[]): Address {
  if (path.length != fees.length + 1) {
    throw new Error("path/fee lengths do not match");
  }

  let encoded = "";
  for (let i = 0; i < fees.length; i++) {
    // 20 byte encoding of the address
    encoded += path[i].slice(2);
    // 3 byte encoding of the fee
    encoded += fees[i].toString(16).padStart(2 * 3, "0");
  }

  // encode the final token
  encoded += path[path.length - 1].slice(2);

  return `0x${encoded.toLowerCase()}`;
}
