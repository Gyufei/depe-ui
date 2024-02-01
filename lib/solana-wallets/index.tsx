import React, { ReactNode, useCallback, useMemo } from "react";
import { useRouter } from "next/router";

import { WalletError, Adapter } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { SolflareWalletAdapter } from "@solflare-wallet/wallet-adapter";
import { clusterApiUrl } from "@solana/web3.js";
import { OKXWalletAdapter } from "./okx-wallet-adapter";
import { useRpc } from "../hooks/common/use-rpc";

export function SolanaWalletProviders({ children }: { children?: ReactNode }) {
  const rpc = useRpc();
  const { pathname } = useRouter();

  const endpoint = useMemo(
    () => rpc.endpoint ?? clusterApiUrl("devnet"),
    [rpc],
  );

  const wallets = [
    new PhantomWalletAdapter(),
    ...(typeof window === "undefined" ? [] : [new SolflareWalletAdapter()]),
    new OKXWalletAdapter(),
  ];

  const onError = useCallback((err: WalletError, adapter?: Adapter) => {
    console.error(err);
    console.log(adapter?.name, "error");
  }, []);

  return (
    <ConnectionProvider
      endpoint={endpoint}
      config={{ disableRetryOnRateLimit: true }}
    >
      <WalletProvider
        wallets={wallets}
        onError={onError}
        autoConnect={pathname !== "/" && (!!endpoint)}
      >
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
}
