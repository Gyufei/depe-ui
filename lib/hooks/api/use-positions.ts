import { IPosition } from "../../types/position";
import { useGqlRequest } from "./use-graphql-request";
import { PositionsDoc } from "../../gql-document/position";
import { useAccount } from "wagmi";
import { useSetApiRefresh } from "./use-set-api-refresh";

export function usePositions() {
  const { address: account } = useAccount();

  const positionsRes = useGqlRequest(
    PositionsDoc(account ? [{ key: "trader", value: account }] : []),
  );

  useSetApiRefresh(
    "positions",
    [
      "OpenPosition",
      "IncreasePosition",
      "DecreasePosition",
      "AppendMargin",
      "WithdrawMargin",
      "Mint",
      "TransferNFT",
    ],
    positionsRes.mutate,
  );

  return {
    ...positionsRes,
    data: (positionsRes?.data?.positions?.data || []) as Array<IPosition>,
  };
}
