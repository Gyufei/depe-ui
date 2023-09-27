import { useSetAtom } from "jotai";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { parseUnits } from "viem";

import { useChainConfig } from "@/lib/hooks/use-chain-config";
import { DepePositionManagerABI } from "@/lib/abi/DepePositionManager";
import { encodeTxExtendedParamsBytes } from "@/lib/utils/web3";
import { useEffect } from "react";
import { GlobalMessageAtom } from "../states/global-message";
import { IPool } from "../types/pool";
import { IPosition } from "../types/position";
import { useTokensInfo } from "./use-token-info";

export function useIncreasePosition(
  pool: IPool,
  position: IPosition,
  amount: string,
  aInMax: bigint,
) {
  const { chainConfig } = useChainConfig();
  const setGlobalMessage = useSetAtom(GlobalMessageAtom);

  const PositionManagerAddress = chainConfig?.contract?.DepePositionManager;
  const SwapRouterAddress = chainConfig?.contract?.UniswapV3Router;

  const [quoteToken] = useTokensInfo([pool.quoteToken]);

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

  const handleIncrease = () => {
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
    write: handleIncrease,
  };
}
