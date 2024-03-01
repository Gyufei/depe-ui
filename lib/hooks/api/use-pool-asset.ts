import { useMemo } from "react";
// import { PoolAsset } from "../../gql-document/pool";
// import { useGqlRequest } from "./use-graphql-request";
// import { useWallet } from "@solana/wallet-adapter-react";
// import toPubString from "@/lib/utils/pub-string";

export interface IPoolAsset {
  dpPoolAddr: string;
  amount: string;
}

export function usePoolAsset() {
  // const { publicKey } = useWallet();

  // const res = useGqlRequest(
  //   PoolAsset(
  //     publicKey ? [{ key: "account", value: toPubString(publicKey) }] : [],
  //   ),
  // );
  //
  const res = {
    data: {
      poolAsset: {
        data: [
          {
            dpPoolAddr: "p1",
            amount: "1",
          },
        ],
      },
    },
    isLoading: false,
    mutate: () => {},
  };

  const data = useMemo<Array<IPoolAsset>>(() => {
    const resData = res.data?.poolAsset?.data;
    if (!resData) return [];

    return resData;
  }, [res.data?.poolAsset?.data]);

  const dataMap = useMemo(() => {
    if (!data.length) return {};

    return data.reduce((acc, cur) => {
      acc[cur.dpPoolAddr] = cur;
      return acc;
    }, {} as Record<string, IPoolAsset>);
  }, [data]);

  return {
    ...res,
    data,
    dataMap,
  };
}
