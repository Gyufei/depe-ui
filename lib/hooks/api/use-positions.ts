import { IPosition } from "../../types/position";
import { useGqlRequest } from "./use-graphql-request";
import { PositionsDoc } from "../../gql-document/position";
import { useWallet } from "@solana/wallet-adapter-react";
import toPubString from "@/lib/utils/pub-string";

export function usePositions() {
  const { publicKey } = useWallet();

  const positionsRes = useGqlRequest(
    PositionsDoc(
      publicKey ? [{ key: "trader", value: toPubString(publicKey) }] : [],
    ),
  );
  console.log(positionsRes);
  console.log([] as Array<IPosition>);

  return {
    data: [
      {
        positionAddr: "123",
        dpPoolAddr: "p1",
        trader: "123",
        leverage: "10",
        positionSize: "0.1",
        debtAmount: "1",
        marginAmount: "100",
        apr: "0.05",
        pendingFundingFee: "0.04",
        remnantAsset: "0.1",
        updateTimestamp: "1231313131",
        positionStatus: 1,
        isNFT: false,
        tokenId: "So11111111111111111111111111111111111111112",
      },
    ],
    isLoading: false,
    mutate: () => {},
  };
  // {
  //   ...positionsRes,
  //   data: (positionsRes?.data?.positions?.data || []) as Array<IPosition>,
  // };
}
