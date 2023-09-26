import { useEffect, useMemo } from "react";
import { useSetAtom } from "jotai";
import { Address, parseUnits } from "viem";

import {
  erc20ABI,
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { useChainConfig } from "@/lib/hooks/use-chain-config";
import { useTokensInfo } from "@/lib/hooks/use-token-info";
import { IUSDTABI } from "@/lib/abi/IUSDT";
import { MAX_UNIT256 } from "@/lib/constant";
import { GlobalMessageAtom } from "@/lib/states/global-message";

export function useApprove(
  tokenAddress: Address | null,
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
    isLoading: isCallLoading,
    error: callError,
    isError: isCallError,
    isSuccess: isCallSuccess,
    write: callAction,
  } = useContractWrite({
    address: tokenAddress!,
    abi: isUSDT ? (IUSDTABI as any) : erc20ABI,
    functionName: "approve",
  });

  const write = () => {
    if (!IPIBoneAddress || !tokenAddress || !tokenInfo) return;

    const amount = parseUnits(tokenAmount || MAX_UNIT256, tokenInfo.decimals);
    callAction({
      args: [IPIBoneAddress, amount!],
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
        message: "Approve successfully",
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
    if (isTxSuccess) {
      getAllowance();
    }
  }, [isTxSuccess, getAllowance]);

  return {
    allowance,
    isAllowanceLoading,
    shouldApprove,
    data: txData,
    error: callError || txError,
    isLoading: isCallLoading || isTxLoading,
    isSuccess: isCallSuccess && isTxSuccess,
    write,
  };
}
