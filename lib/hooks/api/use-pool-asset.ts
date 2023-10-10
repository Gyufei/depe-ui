import { useMemo } from "react";
import { PoolAsset } from "../../gql-document/pool";
import { useGqlRequest } from "./use-graphql-request";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { useSetApiRefresh } from "./use-set-api-refresh";

export interface IPoolAsset {
  dpPoolAddr: Address;
  amount: string;
}

export function usePoolAsset() {
  const { address: account } = useAccount();
  const res = useGqlRequest(
    PoolAsset(account ? [{ key: "account", value: account }] : []),
  );

  useSetApiRefresh("poolAsset", ["Deposit", "Withdraw"], res.mutate);

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
    }, {} as Record<Address, IPoolAsset>);
  }, [data]);

  return {
    ...res,
    data,
    dataMap,
  };
}
