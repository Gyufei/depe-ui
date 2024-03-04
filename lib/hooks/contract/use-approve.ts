import { useCallback, useEffect, useMemo, useState } from "react";

import { useTokensInfo } from "@/lib/hooks/api/use-token-info";
import { useSpecialToken } from "../use-special-token";
import useTxStatus from "./use-tx-status";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, Token } from "@solana/spl-token";

export function useApprove(
  tokenAddress: string | null,
  tokenAmount: string | null,
) {
  const { connection } = useConnection();
  const { publicKey: account } = useWallet();
  const [tokenInfo] = useTokensInfo([tokenAddress]);

  const { checkIsSol } = useSpecialToken();

  const isSol = useMemo(() => {
    return checkIsSol(tokenInfo);
  }, [tokenInfo, checkIsSol]);

  const [allowanceValue, setAllowanceValue] = useState(0);
  const [isAllowanceLoading, setIsAllowanceLoading] = useState(false);

  const getAllowance = useCallback(async () => {
    if (!tokenAddress || !account) return;

    setIsAllowanceLoading(true);
    try {
      const tokenAddr = new PublicKey(tokenAddress);
      const token = new Token(connection, tokenAddr, TOKEN_PROGRAM_ID, null);

      // 查询approve额度
      const approvalAmount = await token.getAccountInfo(account);

      setAllowanceValue(Number(approvalAmount.amount.toString()));
    } catch (error) {
      console.error(error);
    }
    setIsAllowanceLoading(false);
  }, [account, connection]);

  const allowance = useMemo(() => {
    if (!allowanceValue || !tokenInfo) return 0;
    console.log(tokenInfo);

    return allowanceValue;
  }, [allowanceValue, tokenInfo]);

  const shouldApprove = useMemo(() => {
    if (isSol) return false;

    return (
      tokenAddress &&
      (allowance === 0 || Number(tokenAmount) > Number(allowance))
    );
  }, [tokenAddress, allowance, tokenAmount, isSol]);

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
