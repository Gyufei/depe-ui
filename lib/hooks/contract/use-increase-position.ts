import { parseUnits } from "viem";

import { useChainConfig } from "@/lib/hooks/common/use-chain-config";
import { DepePositionManagerABI } from "@/lib/abi/DepePositionManager";
import { encodeTxExtendedParamsBytes } from "@/lib/utils/web3";
import { IPool } from "../../types/pool";
import { IPosition } from "../../types/position";
import { useTokensInfo } from "../api/use-token-info";
import { useTxWrite } from "./use-tx-write";
import { useSpecialToken } from "../use-eth-token";

export function useIncreasePosition(pool: IPool, position: IPosition) {
  const { chainConfig } = useChainConfig();

  const PositionManagerAddress = chainConfig?.contract?.DepePositionManager;
  const SwapRouterAddress = chainConfig?.contract?.UniswapV3Router;

  const [baseToken, quoteToken] = useTokensInfo([
    pool.baseToken,
    pool.quoteToken,
  ]);

  const { getEthTxValueParams: getEthValueParams } = useSpecialToken();

  const { data, isLoading, isSuccess, isError, error, write } = useTxWrite({
    address: PositionManagerAddress,
    abi: DepePositionManagerABI,
    functionName: "increasePosition",
    actionName: "IncreasePosition",
  });

  const writeAction = (
    amount: string,
    aInMax: bigint,
    estPayout: string | null,
  ) => {
    if (!pool || !position || !quoteToken || !amount || !aInMax || !estPayout)
      return;

    const increaseSize = parseUnits(amount, quoteToken?.decimals);

    const abiEncodedPath = encodeTxExtendedParamsBytes(
      pool.quoteToken,
      pool.baseToken,
    );

    const extraParams = getEthValueParams(baseToken, estPayout);

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
      ...extraParams,
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
