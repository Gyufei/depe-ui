import { useEffect, useMemo, useState } from "react";
import { useTokensInfo } from "../api/use-token-info";
import { useSpecialToken } from "../use-special-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import NP from "number-precision";
import { SOLDecimals } from "@/lib/constant";
import { formatNum } from "@/lib/utils/number";

export function useTokenBalance(tokenAddress: string | null) {
  const { connection } = useConnection();
  const { publicKey: account } = useWallet();

  const [tokenInfo] = useTokensInfo([tokenAddress || "0x"]);
  const { checkIsSol } = useSpecialToken();

  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [bValue, setBValue] = useState("0");
  const [bFormatted, setBFormatted] = useState("");

  const isSol = useMemo(() => {
    return checkIsSol(tokenInfo);
  }, [checkIsSol, tokenInfo]);

  useEffect(() => {
    async function getTokenBalance() {
      if (!tokenAddress || !account) return;

      setIsLoading(true);

      try {
        if (isSol) {
          const res = await connection.getBalance(account);
          const solB = NP.divide(res, 10 ** SOLDecimals);
          setBalance(res);
          setBValue(String(solB));
          setBFormatted(formatNum(solB, 4));
          return;
        }

        const tokenAddr = new PublicKey(tokenAddress);
        const balance = await connection.getParsedTokenAccountsByOwner(
          account,
          {
            mint: tokenAddr,
          },
        );
        const accounts = balance.value;
        const tokenAmount = accounts[0].account.data.parsed.info;
        setBalance(tokenAmount.amount);
        setBValue(tokenAmount.uiAmount);
        setBFormatted(formatNum(tokenAmount.uiAmount, 4));
      } catch (error) {
        console.error("error", error);
      }
    }

    getTokenBalance();
  }, [tokenAddress, account, connection, isSol]);

  return {
    isLoading,

    data: balance
      ? {
          data: balance,
          value: bValue,
          formatted: bFormatted,
          decimals: tokenInfo?.decimals,
        }
      : undefined,
  };
}
