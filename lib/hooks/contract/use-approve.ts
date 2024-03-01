import { useEffect, useMemo } from "react";

import { useTokensInfo } from "@/lib/hooks/api/use-token-info";
import { useSpecialToken } from "../use-special-token";
import useTxStatus from "./use-tx-status";

export function useApprove(
  tokenAddress: string | null,
  tokenAmount: string | null,
) {
  const [tokenInfo] = useTokensInfo([tokenAddress]);

  const { checkIsSol } = useSpecialToken();

  const isEth = useMemo(() => {
    return checkIsSol(tokenInfo);
  }, [tokenInfo, checkIsSol]);

  const {
    data: allowanceValue,
    isLoading: isAllowanceLoading,
    refetch: getAllowance,
  } = {
    data: 1,
    isLoading: false,
    refetch: () => {},
  };

  const allowance = useMemo(() => {
    if (!allowanceValue || !tokenInfo) return 0;
    console.log(tokenInfo);

    return allowanceValue;
  }, [allowanceValue, tokenInfo]);

  const shouldApprove = useMemo(() => {
    if (isEth) return false;

    return (
      tokenAddress &&
      (allowance === 0 || Number(tokenAmount) > Number(allowance))
    );
  }, [tokenAddress, allowance, tokenAmount, isEth]);

  const writeAction = async () => {};

  const wrapRes = useTxStatus(writeAction);

  useEffect(() => {
    if (wrapRes.isSuccess) {
      getAllowance();
    }
  }, [wrapRes.isSuccess, getAllowance]);

  return {
    allowance,
    isAllowanceLoading,
    shouldApprove,
    ...wrapRes,
  };
}
