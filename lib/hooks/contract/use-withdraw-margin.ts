import { useEffect } from "react";
import { Address } from "viem";

import { useClusterConfig } from "@/lib/hooks/common/use-cluster-config";
import { DepePositionManagerABI } from "@/lib/abi/DepePositionManager";
import { useTxWrite } from "./use-tx-write";
import { usePositions } from "../api/use-positions";

export function useWithdrawMargin(poolAddr: Address, positionAddr: Address) {
  const { chainConfig } = useClusterConfig();
  const PositionManagerAddress = chainConfig?.contract?.DepePositionManager;

  const { data, isLoading, isSuccess, isError, error, write } = useTxWrite({
    address: PositionManagerAddress,
    abi: DepePositionManagerABI,
    functionName: "decreaseMargin",
  });

  const writeAction = (amount: bigint) => {
    if (!poolAddr || !positionAddr) return;

    const TxArgs = [poolAddr, positionAddr, amount];

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
