"use client";

import React, { ReactNode, useCallback, useMemo } from "react";

import { WalletError, Adapter } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { SolflareWalletAdapter } from "@solflare-wallet/wallet-adapter";
import { OKXWalletAdapter } from "./okx-wallet-adapter";
import { useCluster } from "@/lib/hooks/common/use-cluster";

export function SolanaWalletProviders({ children }: { children?: ReactNode }) {
  const { clusterConfig } = useCluster();

  const endpoint = useMemo(() => clusterConfig.rpcEndpoint, [clusterConfig]);

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
      <WalletProvider wallets={wallets} onError={onError} autoConnect={true}>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
}
