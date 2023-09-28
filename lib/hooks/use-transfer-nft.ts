import { Address } from "viem";
import { useAccount } from "wagmi";

import { IPosition } from "../types/position";
import { useChainConfig } from "./use-chain-config";
import { DepePositionManagerABI } from "../abi/DepePositionManager";
import { useTxWrite } from "./use-tx-write";

export function useTransferNFT(position: IPosition) {
  const { chainConfig } = useChainConfig();
  const { address: account } = useAccount();

  const PositionManagerAddress = chainConfig?.contract?.DepePositionManager;

  const { data, isLoading, isSuccess, isError, error, write } = useTxWrite({
    address: PositionManagerAddress,
    abi: DepePositionManagerABI,
    functionName: "transferFrom",
  });

  const writeAction = (to: Address) => {
    if (!position?.isNFT || !to) return;

    const nftTokenId = "3";
    const TxArgs = [account, to, nftTokenId];

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
