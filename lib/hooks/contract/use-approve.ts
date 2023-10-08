import { useEffect, useMemo } from "react";
import { Address, formatUnits } from "viem";

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
    data: allowanceValue,
    isLoading: isAllowanceLoading,
    refetch: getAllowance,
  } = useContractRead({
    address: tokenAddress!,
    abi: erc20ABI,
    functionName: "allowance",
    args: [account!, IPIBoneAddress!],
    enabled: !!(account && IPIBoneAddress && tokenAddress),
  });

  const allowance = useMemo(() => {
    if (!allowanceValue || !tokenInfo) return 0;

    return formatUnits(allowanceValue, tokenInfo?.decimals);
  }, [allowanceValue, tokenInfo]);

  const shouldApprove = useMemo(
    () =>
      tokenAddress &&
      (allowance === 0 || Number(tokenAmount) > Number(allowance)),
    [tokenAddress, allowance, tokenAmount],
  );

  const { data, isLoading, error, isError, isSuccess, write } = useTxWrite({
    address: tokenAddress!,
    abi: isUSDT ? (IUSDTABI as any) : erc20ABI,
    functionName: "approve",
    successTip: "Approve successfully",
  });

  const writeAction = () => {
    if (!IPIBoneAddress || !tokenAddress || !tokenInfo) return;

    let amountVal;
    if (isUSDT) {
      amountVal = allowance === 0 ? MAX_UNIT256 : 0;
    } else {
      amountVal = MAX_UNIT256;
    }

    const amount = BigInt(amountVal);

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
