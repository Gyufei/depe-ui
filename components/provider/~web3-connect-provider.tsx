"use client";

import { walletConnectProvider } from "@web3modal/wagmi";
import { createWeb3Modal, useWeb3ModalTheme } from "@web3modal/wagmi/react";

import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { base, mainnet, optimism, sepolia } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const chains = [mainnet, optimism, base, sepolia];
const projectId = "bb5e726f6ba3a2f3f7b43e645f4786c4";

const { publicClient } = configureChains(chains, [
  infuraProvider({ apiKey: "534d2ca5a3a84db7accafc2eab774a3a" }),
  walletConnectProvider({ projectId }),
]);

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: { projectId, showQrModal: false, metadata },
    }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
  ],
  publicClient,
});

createWeb3Modal({ wagmiConfig, projectId, chains });

export default function Web3ConnectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setThemeVariables } = useWeb3ModalTheme();

  setThemeVariables({
    "--w3m-font-family": "var(--font-haas-text)"
  });

  return (
    <>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
    </>
  );
}
