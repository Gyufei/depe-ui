import { useChainConfig } from "@/lib/hooks/common/use-chain-config";

import { useTxWrite } from "./use-tx-write";
import { IPool } from "../../types/pool";
import { DepePositionManagerABI } from "../../abi/DepePositionManager";

export function usePoolWithdraw(poolAddr: IPool["poolAddr"] | null) {
  const { chainConfig } = useChainConfig();
  const PositionManagerAddress = chainConfig?.contract?.DepePositionManager;

  const { data, error, isLoading, isSuccess, isError, write } = useTxWrite({
    address: PositionManagerAddress,
    abi: DepePositionManagerABI,
    functionName: "withdraw",
    actionName: "Withdraw",
  });

  const writeAction = (amount: bigint) => {
    if (!poolAddr || !amount) return;

    const TxArgs = [poolAddr, amount];

    write({
      args: TxArgs as any,
    });
  };

  return {
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    write: writeAction,
  };
}
