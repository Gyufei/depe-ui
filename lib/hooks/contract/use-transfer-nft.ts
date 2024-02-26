import { useEffect } from "react";
import { Address } from "viem";
import { useAccount } from "wagmi";

import { IPosition } from "../../types/position";
import { useClusterConfig } from "../common/use-cluster-config";
import { DepePositionManagerABI } from "../../abi/DepePositionManager";
import { useTxWrite } from "./use-tx-write";
import { usePositions } from "../api/use-positions";

export function useTransferNFT(position: IPosition) {
  const { chainConfig } = useClusterConfig();
  const { address: account } = useAccount();

  const PositionManagerAddress = chainConfig?.contract?.DepePositionManager;

  const { data, isLoading, isSuccess, isError, error, write } = useTxWrite({
    address: PositionManagerAddress,
    abi: DepePositionManagerABI,
    functionName: "transferFrom",
  });

  const writeAction = (to: Address) => {
    if (!position?.isNFT || !to) return;

    const nftTokenId = position.tokenId;
    const TxArgs = [account, to, nftTokenId];

    write({
      args: TxArgs as any,
    });
  };

  const { mutate: refetchPositions } = usePositions();

  useEffect(() => {
    if (isSuccess) {
      refetchPositions();
    }
  }, [isSuccess, refetchPositions]);

  return {
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    write: writeAction,
  };
}
