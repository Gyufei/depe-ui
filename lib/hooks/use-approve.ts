import { erc20ABI, useAccount, useContractRead, useContractWrite } from "wagmi";
import { useChainConfig } from "./use-chain-config";
import { AddressType } from "../types/address";
import { useEffect, useMemo } from "react";

export default function useApprove(
  tokenAddress: AddressType | null,
  tokenAmount: string | null,
) {
  const { address: account } = useAccount();
  const { chainConfig } = useChainConfig();

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

  const {
    data: approveData,
    isLoading: isApproveLoading,
    isSuccess: isApproveSuccess,
    write: approveAction,
  } = useContractWrite({
    address: tokenAddress!,
    abi: erc20ABI,
    functionName: "approve",
  });

  useEffect(() => {
    getAllowance();
  }, [isApproveSuccess, getAllowance]);

  const handleApprove = () => {
    if (!IPIBoneAddress || !tokenAddress) return;

    const Max =
      "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
    const amount = BigInt(tokenAmount || Max);
    approveAction({
      args: ["0x695B7297EF2B2b4616616F894a83f78bF62F5EC6", amount!],
    });
  };

  return {
    allowance,
    isAllowanceLoading,
    shouldApprove,
    approveData,
    isApproveLoading,
    isApproveSuccess,
    handleApprove,
  };
}
