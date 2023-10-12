import NP from "number-precision";
import { usePublicClient } from "wagmi";
import { formatUnits, parseUnits } from "viem";

import { useChainConfig } from "@/lib/hooks/common/use-chain-config";
import { DepePositionManagerABI } from "@/lib/abi/DepePositionManager";
import { useTokenRoutes } from "../api/use-token-routes";
import { IPool } from "../../types/pool";
import { IPosition } from "../../types/position";
import { useTokensInfo } from "../api/use-token-info";
import { UniswapQuoterABI } from "../../abi/UniswapQuoter";
import { DEFAULT_SLIPPAGE } from "../../constant";
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
  const { encodeTokenPath, encodeTxExtendedParamsBytes } = useTokenRoutes();

  const { data, isLoading, isSuccess, isError, error, write } = useTxWrite({
    address: PositionManagerAddress,
    abi: DepePositionManagerABI,
    functionName: "decreasePosition",
    actionName: "DecreasePosition",
  });

  const getAmountOutMin = async (size: bigint) => {
    const QuoterAddress = chainConfig!.contract.UniswapV3Quoter;

    const ePath = encodeTokenPath(pool.baseToken, pool.quoteToken, true);

    const { result } = await publicClient.simulateContract({
      address: QuoterAddress,
      abi: UniswapQuoterABI,
      functionName: "quoteExactInput",
      args: [ePath as any, size],
    });

    const slippageValue = NP.divide(DEFAULT_SLIPPAGE, 100);
    const withSlippage = NP.minus(1, slippageValue);

    const aOutMinVal = formatUnits(result, baseToken!.decimals);
    const aOutMin = NP.times(aOutMinVal, withSlippage).toFixed(
      baseToken!.decimals,
    );
    const aOutMinBig = parseUnits(aOutMin, baseToken!.decimals);

    return aOutMinBig;
  };

  const writeAction = async (amount: string) => {
    if (!pool || !position || !baseToken || !quoteToken || !amount) return;

    const abiEncodedPath = encodeTxExtendedParamsBytes(
      pool.baseToken,
      pool.quoteToken,
      true,
    );

    const decreaseSize = parseUnits(amount, quoteToken?.decimals);
    const aOutMin = await getAmountOutMin(decreaseSize);
    console.log(decreaseSize, aOutMin);

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
