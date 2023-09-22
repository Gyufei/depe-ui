import { useEffect, useMemo } from "react";
import { useSetAtom } from "jotai";

import {
  erc20ABI,
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { useChainConfig } from "@/lib/hooks/use-chain-config";
import { AddressType } from "@/lib/types/address";
import { useTokensInfo } from "@/lib/hooks/use-token-info";
import { IUSDTABI } from "@/lib/abi/IUSDT";
import { MAX_UNIT256 } from "@/lib/constant";
import { GlobalMessageAtom } from "@/lib/states/global-message";

export default function useApprove(
  tokenAddress: AddressType | null,
  tokenAmount: string | null,
) {
  const setGlobalMessage = useSetAtom(GlobalMessageAtom);

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

  const {
    data: callData,
    isLoading: isCalling,
    error: callError,
    isError: isCallError,
    write: callAction,
  } = useContractWrite({
    address: tokenAddress!,
    abi: isUSDT ? (IUSDTABI as any) : erc20ABI,
    functionName: "approve",
  });

  const handleApprove = () => {
    if (!IPIBoneAddress || !tokenAddress) return;

    const amount = BigInt(tokenAmount || MAX_UNIT256);
    callAction({
      args: [IPIBoneAddress, amount!],
    });
  };

  const {
    // data: txResultData,
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

    if (isCallError) {
      setGlobalMessage({
        type: "error",
        message: callError?.message || "Fail: Some error occur",
      });
    }

    if (isTxError) {
      setGlobalMessage({
        type: "error",
        message: txError?.message || "Fail: Some error occur",
      });
    }
  }, [
    isTxSuccess,
    isCallError,
    callError,
    isTxError,
    txError,
    setGlobalMessage,
  ]);

  useEffect(() => {
    getAllowance();
  }, [isTxSuccess, getAllowance]);

  return {
    allowance,
    isAllowanceLoading,
    shouldApprove,
    approveData: callData,
    isApproveLoading: isCalling || isTxLoading,
    isApproveSuccess: isTxSuccess,
    handleApprove,
  };
}
