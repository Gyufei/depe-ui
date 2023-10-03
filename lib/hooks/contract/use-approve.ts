import { useEffect, useMemo } from "react";
import { Address, parseUnits } from "viem";

import { erc20ABI, useAccount, useContractRead } from "wagmi";

import { useChainConfig } from "@/lib/hooks/use-chain-config";
import { useTokensInfo } from "@/lib/hooks/use-token-info";
import { IUSDTABI } from "@/lib/abi/IUSDT";
import { MAX_UNIT256 } from "@/lib/constant";
import { useTxWrite } from "./use-tx-write";

export function useApprove(
  tokenAddress: Address | null,
  tokenAmount: string | null,
) {
  const { address: account } = useAccount();
  const { chainConfig } = useChainConfig();
  const [tokenInfo] = useTokensInfo([tokenAddress]);
  const isUSDT = tokenInfo?.symbol === "USDT";
  const IPIBoneAddress = chainConfig?.contract.IPIBone;

  const {
    data: allowance,
    isLoading: isAllowanceLoading,
    refetch: getAllowance,
  } = useContractRead({
    address: tokenAddress!,
    abi: erc20ABI,
    functionName: "allowance",
    args: [account!, IPIBoneAddress!],
    enabled: !!(account && IPIBoneAddress && tokenAddress),
  });

  const shouldApprove = useMemo(
    () => allowance === 0n || Number(tokenAmount) > Number(allowance),
    [allowance, tokenAmount],
  );

  const { data, isLoading, error, isError, isSuccess, write } = useTxWrite({
    address: tokenAddress!,
    abi: isUSDT ? (IUSDTABI as any) : erc20ABI,
    functionName: "approve",
    successTip: "Approve successfully",
  });

  const writeAction = () => {
    if (!IPIBoneAddress || !tokenAddress || !tokenInfo) return;

    const amount = parseUnits(tokenAmount || MAX_UNIT256, tokenInfo.decimals);

    write({
      args: [IPIBoneAddress, amount!],
    });
  };

  useEffect(() => {
    if (isSuccess) {
      getAllowance();
    }
  }, [isSuccess, getAllowance]);

  return {
    allowance,
    isAllowanceLoading,
    shouldApprove,
    data,
    error,
    isError,
    isLoading,
    isSuccess,
    write: writeAction,
  };
}
