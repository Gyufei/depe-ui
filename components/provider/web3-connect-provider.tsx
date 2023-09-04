"use client";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { base, mainnet, optimism, sepolia } from "wagmi/chains";

const chains = [mainnet, optimism, base, sepolia];
const projectId = "bb5e726f6ba3a2f3f7b43e645f4786c4";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export default function Web3ConnectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
      <Web3Modal
        themeVariables={{
          "--w3m-font-family": "var(--font-haas-text)",
          "--w3m-text-big-bold-font-family": "var(--font-haas-disp)",
        }}
        projectId={projectId}
        ethereumClient={ethereumClient}
      />
    </>
  );
}
