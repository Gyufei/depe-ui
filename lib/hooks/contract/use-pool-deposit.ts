import { useAccount } from "wagmi";

import { useChainConfig } from "@/lib/hooks/common/use-chain-config";

import { useTxWrite } from "./use-tx-write";
import { IPool } from "../../types/pool";
import { DepePositionManagerABI } from "../../abi/DepePositionManager";
import { IToken } from "@/lib/types/token";
import { useSpecialToken } from "../use-eth-token";
import { formatUnits } from "viem";

export function usePoolDeposit(
  poolAddr: IPool["poolAddr"] | null,
  baseToken: IToken | null,
) {
  const { address: account } = useAccount();
  const { getEthTxValueParams: getEthValueParams } = useSpecialToken();

  const { chainConfig } = useChainConfig();
  const PositionManagerAddress = chainConfig?.contract?.DepePositionManager;

  const { data, error, isLoading, isSuccess, isError, write } = useTxWrite({
    address: PositionManagerAddress,
    abi: DepePositionManagerABI,
    functionName: "deposit",
    actionName: "Deposit",
  });

  const writeAction = (amount: bigint) => {
    if (!poolAddr || !amount) return;

    const TxArgs = [poolAddr, amount, account];

    const extraParams = getEthValueParams(
      baseToken,
      formatUnits(amount, baseToken?.decimals || 18),
    );

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
