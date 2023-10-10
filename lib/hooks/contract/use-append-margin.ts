import { Address, formatUnits } from "viem";
import { useChainConfig } from "@/lib/hooks/common/use-chain-config";
import { DepePositionManagerABI } from "@/lib/abi/DepePositionManager";
import { useTxWrite } from "./use-tx-write";
import { useSpecialToken } from "../use-eth-token";
import { IToken } from "@/lib/types/token";

export function useAppendMargin(
  poolAddr: Address,
  positionAddr: Address,
  baseToken: IToken | null,
) {
  const { chainConfig } = useChainConfig();
  const PositionManagerAddress = chainConfig?.contract?.DepePositionManager;

  const { getEthTxValueParams: getEthValueParams } = useSpecialToken();

  const { data, error, isLoading, isSuccess, isError, write } = useTxWrite({
    address: PositionManagerAddress,
    abi: DepePositionManagerABI,
    functionName: "increaseMargin",
    actionName: "AppendMargin",
  });

  const writeAction = (amount: bigint) => {
    if (!poolAddr || !positionAddr || !amount) return;

    const extraParams = getEthValueParams(
      baseToken,
      formatUnits(amount, baseToken?.decimals || 18),
    );
    const TxArgs = [poolAddr, positionAddr, amount];

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
