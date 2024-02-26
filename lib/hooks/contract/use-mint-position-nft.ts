import { IPosition } from "../../types/position";
import { useClusterConfig } from "../common/use-cluster-config";
import { DepePositionManagerABI } from "../../abi/DepePositionManager";
import { useTxWrite } from "./use-tx-write";

export function useMintPositionNft(position: IPosition) {
  const { chainConfig } = useClusterConfig();

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
