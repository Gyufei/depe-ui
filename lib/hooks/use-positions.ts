import { IPosition } from "../types/position";
import { useGqlRequest } from "./use-graphql-request";
import { PositionsDoc } from "../gql-document/position";
import { useAccount } from "wagmi";

export function usePositions() {
  const { address: account } = useAccount();

  const positionsRes = useGqlRequest(
    // PositionsDoc(account ? [{ key: "trader", value: account }] : []),
    // TODO:  remove
    PositionsDoc(
      account
        ? [
            {
              key: "trader",
              value: "0xC9904D9581d92c4A47aFd01bd9EAb37925636E08",
            },
          ]
        : [],
    ),
  );

  return {
    ...positionsRes,
    data: (positionsRes?.data?.positions?.data || []) as Array<IPosition>,
  };
}
