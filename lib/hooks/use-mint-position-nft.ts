import { IPosition } from "../types/position";
import { useChainConfig } from "./use-chain-config";
import { DepePositionManagerABI } from "../abi/DepePositionManager";
import { useTxWrite } from "./use-tx-write";

export function useMintPositionNft(position: IPosition) {
  const { chainConfig } = useChainConfig();

  const PositionManagerAddress = chainConfig?.contract?.DepePositionManager;

  const { data, isLoading, isSuccess, isError, error, write } = useTxWrite({
    address: PositionManagerAddress,
    abi: DepePositionManagerABI,
    functionName: "mintPosition",
  });

  const writeAction = () => {
    if (!position?.positionAddr) return;

    const TxArgs = [position.positionAddr];

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
