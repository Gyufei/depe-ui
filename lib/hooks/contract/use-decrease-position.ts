import NP from "number-precision";
import { usePublicClient } from "wagmi";
import { formatUnits, parseUnits } from "viem";

import { useChainConfig } from "@/lib/hooks/common/use-chain-config";
import { DepePositionManagerABI } from "@/lib/abi/DepePositionManager";
import { encodePath, encodeTxExtendedParamsBytes } from "@/lib/utils/web3";
import { IPool } from "../../types/pool";
import { IPosition } from "../../types/position";
import { useTokensInfo } from "../api/use-token-info";
import { UniswapQuoterABI } from "../../abi/UniswapQuoter";
import { DEFAULT_SLIPPAGE, UNISWAP_FEES } from "../../constant";
import { useTxWrite } from "./use-tx-write";

export function useDecreasePosition(pool: IPool, position: IPosition) {
  const publicClient = usePublicClient();
  const { chainConfig } = useChainConfig();

  const PositionManagerAddress = chainConfig?.contract?.DepePositionManager;
  const SwapRouterAddress = chainConfig?.contract?.UniswapV3Router;

  const [baseToken, quoteToken] = useTokensInfo([
    pool.baseToken,
    pool.quoteToken,
  ]);

  const { data, isLoading, isSuccess, isError, error, write } = useTxWrite({
    address: PositionManagerAddress,
    abi: DepePositionManagerABI,
    functionName: "decreasePosition",
    actionName: "DecreasePosition",
  });

  const getAmountOutMin = async (size: bigint) => {
    const QuoterAddress = chainConfig!.contract.UniswapV3Quoter;

    const ePath = encodePath([pool.quoteToken, pool.baseToken], UNISWAP_FEES);

    const { result } = await publicClient.simulateContract({
      address: QuoterAddress,
      abi: UniswapQuoterABI,
      functionName: "quoteExactInput",
      args: [ePath as any, size],
    });

    const aOutMinVal = formatUnits(result, baseToken!.decimals);
    const slippage = NP.divide(
      NP.minus(1000, NP.times(DEFAULT_SLIPPAGE, 1000)),
      1000,
    );
    const aOutMin = NP.divide(aOutMinVal, slippage).toFixed(
      baseToken!.decimals,
    );
    const aOutMinBig = parseUnits(aOutMin, baseToken!.decimals);

    return aOutMinBig;
  };

  const writeAction = async (amount: string) => {
    if (!pool || !position || !baseToken || !quoteToken || !amount) return;

    const abiEncodedPath = encodeTxExtendedParamsBytes(
      pool.quoteToken,
      pool.baseToken,
    );

    const decreaseSize = parseUnits(amount, quoteToken?.decimals);
    const aOutMin = await getAmountOutMin(decreaseSize);

    const TxArgs = [
      pool.poolAddr,
      position.positionAddr,
      SwapRouterAddress,
      decreaseSize,
      aOutMin,
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
