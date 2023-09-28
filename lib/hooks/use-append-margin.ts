import { Address } from "viem";
import { useChainConfig } from "@/lib/hooks/use-chain-config";
import { DepePositionManagerABI } from "@/lib/abi/DepePositionManager";
import { useTxWrite } from "./use-tx-write";

export function useAppendMargin(poolAddr: Address, positionAddr: Address) {
  const { chainConfig } = useChainConfig();
  const positionManagerAddress = chainConfig?.contract?.DepePositionManager;

  const { data, error, isLoading, isSuccess, isError, write } = useTxWrite({
    address: positionManagerAddress,
    abi: DepePositionManagerABI,
    functionName: "increaseMargin",
  });

  const writeAction = (amount: bigint) => {
    if (!poolAddr || !positionAddr) return;

    const TxArgs = [poolAddr, positionAddr, amount];

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
