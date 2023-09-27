import NP from "number-precision";
import { useSetAtom } from "jotai";
import {
  useContractWrite,
  usePublicClient,
  useWaitForTransaction,
} from "wagmi";
import { formatUnits, parseUnits } from "viem";

import { useChainConfig } from "@/lib/hooks/use-chain-config";
import { DepePositionManagerABI } from "@/lib/abi/DepePositionManager";
import { encodePath, encodeTxExtendedParamsBytes } from "@/lib/utils/web3";
import { useEffect } from "react";
import { GlobalMessageAtom } from "../states/global-message";
import { IPool } from "../types/pool";
import { IPosition } from "../types/position";
import { useTokensInfo } from "./use-token-info";
import { UniswapQuoterABI } from "../abi/UniswapQuoter";
import { DEFAULT_SLIPPAGE, UNISWAP_FEES } from "../constant";

export function useDecreasePosition(
  pool: IPool,
  position: IPosition,
  amount: string,
) {
  const publicClient = usePublicClient();
  const { chainConfig } = useChainConfig();
  const setGlobalMessage = useSetAtom(GlobalMessageAtom);

  const PositionManagerAddress = chainConfig?.contract?.DepePositionManager;
  const SwapRouterAddress = chainConfig?.contract?.UniswapV3Router;

  const [baseToken, quoteToken] = useTokensInfo([
    pool.baseToken,
    pool.quoteToken,
  ]);

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

  const {
    data: callData,
    isLoading: isCallLoading,
    isSuccess: isCallSuccess,
    isError: isCallError,
    error: callError,
    write,
  } = useContractWrite({
    address: PositionManagerAddress,
    abi: DepePositionManagerABI,
    functionName: "increasePosition",
  });

  const handleDecrease = async () => {
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

  const {
    data: txData,
    error: txError,
    isError: isTxError,
    isLoading: isTxLoading,
    isSuccess: isTxSuccess,
  } = useWaitForTransaction({
    hash: callData?.hash,
  });

  useEffect(() => {
    if (isTxSuccess) {
      setGlobalMessage({
        type: "success",
        message: "Your funds have been staked in the pool.",
      });
    }

    if (isCallError || isTxError) {
      setGlobalMessage({
        type: "error",
        message:
          txError?.message || callError?.message || "Fail: Some error occur",
      });
    }
  }, [
    isTxSuccess,
    isCallError,
    isTxError,
    callError,
    txError,
    setGlobalMessage,
  ]);

  return {
    data: txData,
    error: callError || txError,
    isLoading: isCallLoading || isTxLoading,
    isSuccess: isCallSuccess && isTxSuccess,
    isError: isCallError || isTxError,
    write: handleDecrease,
  };
}
