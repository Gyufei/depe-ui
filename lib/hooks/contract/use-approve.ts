import { useEffect, useMemo } from "react";
import { Address, formatUnits, parseUnits } from "viem";

import { erc20ABI, useAccount, useContractRead } from "wagmi";

import { useChainConfig } from "@/lib/hooks/common/use-chain-config";
import { useTokensInfo } from "@/lib/hooks/api/use-token-info";
import { IUSDTABI } from "@/lib/abi/IUSDT";
import { useTxWrite } from "./use-tx-write";
import { useSpecialToken } from "../use-eth-token";

export function useApprove(
  tokenAddress: Address | null,
  tokenAmount: string | null,
) {
  const { address: account } = useAccount();
  const { chainConfig } = useChainConfig();
  const [tokenInfo] = useTokensInfo([tokenAddress]);
  const IPIBoneAddress = chainConfig?.contract.IPIBone;

  const { checkIsEth, checkIsUSDT } = useSpecialToken();
  const isUSDT = useMemo(() => {
    return checkIsUSDT(tokenInfo);
  }, [tokenInfo, checkIsUSDT]);

  const isEth = useMemo(() => {
    return checkIsEth(tokenInfo);
  }, [tokenInfo, checkIsEth]);

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

  const shouldApprove = useMemo(() => {
    if (isEth) return false;

    return (
      tokenAddress &&
      (allowance === 0 || Number(tokenAmount) > Number(allowance))
    );
  }, [tokenAddress, allowance, tokenAmount, isEth]);

  const { data, isLoading, error, isError, isSuccess, write } = useTxWrite({
    address: tokenAddress!,
    abi: isUSDT ? (IUSDTABI as any) : erc20ABI,
    functionName: "approve",
    successTip: "Approve successfully",
  });

  const writeAction = () => {
    if (!IPIBoneAddress || !tokenAddress || !tokenInfo) return;

    let amountVal = String(10 ** tokenInfo.decimals);
    if (isUSDT) {
      amountVal = allowance === 0 ? amountVal : "0";
    }

    const amount = parseUnits(amountVal, tokenInfo.decimals);

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
