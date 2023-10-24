import { useEffect } from "react";

import { useChainConfig } from "@/lib/hooks/common/use-chain-config";
import { useTxWrite } from "./use-tx-write";
import { IPool } from "../../types/pool";
import { DepePositionManagerABI } from "../../abi/DepePositionManager";
import { usePoolAsset } from "../api/use-pool-asset";

export function usePoolWithdraw(poolAddr: IPool["poolAddr"] | null) {
  const { chainConfig } = useChainConfig();
  const PositionManagerAddress = chainConfig?.contract?.DepePositionManager;

  const { data, error, isLoading, isSuccess, isError, write } = useTxWrite({
    address: PositionManagerAddress,
    abi: DepePositionManagerABI,
    functionName: "withdraw",
  });

  const writeAction = (amount: bigint) => {
    if (!poolAddr || !amount) return;

    const TxArgs = [poolAddr, amount];

    write({
      args: TxArgs as any,
    });
  };

  const { mutate: refetchPoolAsset } = usePoolAsset();

  useEffect(() => {
    if (isSuccess) {
      refetchPoolAsset();
    }
  }, [isSuccess, refetchPoolAsset]);

  return {
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    write: writeAction,
  };
}
