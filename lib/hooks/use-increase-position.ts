import { parseUnits } from "viem";

import { useChainConfig } from "@/lib/hooks/use-chain-config";
import { DepePositionManagerABI } from "@/lib/abi/DepePositionManager";
import { encodeTxExtendedParamsBytes } from "@/lib/utils/web3";
import { IPool } from "../types/pool";
import { IPosition } from "../types/position";
import { useTokensInfo } from "./use-token-info";
import { useTxWrite } from "./use-tx-write";

export function useIncreasePosition(
  pool: IPool,
  position: IPosition,
  amount: string,
  aInMax: bigint,
) {
  const { chainConfig } = useChainConfig();

  const PositionManagerAddress = chainConfig?.contract?.DepePositionManager;
  const SwapRouterAddress = chainConfig?.contract?.UniswapV3Router;

  const [quoteToken] = useTokensInfo([pool.quoteToken]);

  const { data, isLoading, isSuccess, isError, error, write } = useTxWrite({
    address: PositionManagerAddress,
    abi: DepePositionManagerABI,
    functionName: "increasePosition",
  });

  const writeAction = () => {
    if (!pool || !position || !quoteToken || !amount || !aInMax) return;

    const abiEncodedPath = encodeTxExtendedParamsBytes(
      pool.quoteToken,
      pool.baseToken,
    );

    const increaseSize = parseUnits(amount, quoteToken?.decimals);

    const TxArgs = [
      pool.poolAddr,
      position.positionAddr,
      SwapRouterAddress,
      increaseSize,
      aInMax,
      abiEncodedPath,
    ];

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
