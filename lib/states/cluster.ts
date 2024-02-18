import { atomWithStorage } from "jotai/utils";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl, Connection } from "@solana/web3.js";

const MAINNET_RPC_ENDPOINT =
  "http://realms-realms-c335.mainnet.rpcpool.com/258d3727-bb96-409d-abea-0b1b4c48af29/";
// "https://api.mainnet-beta.solana.com";
const DEVNET_RPC_ENDPOINT = "https://api.devnet.solana.com";

export enum ClusterType {
  Mainnet,
  Devnet,
}

interface Cluster {
  type: ClusterType;
  connection: Connection;
  endpoint: string;
  network: WalletAdapterNetwork;
  rpcEndpoint: string;
}

export const MainnetCluster: Cluster = {
  type: ClusterType.Mainnet,
  connection: new Connection(MAINNET_RPC_ENDPOINT, "recent"),
  endpoint: clusterApiUrl("mainnet-beta"),
  network: WalletAdapterNetwork.Mainnet,
  rpcEndpoint: MAINNET_RPC_ENDPOINT,
};

export const DevnetCluster: Cluster = {
  type: ClusterType.Devnet,
  connection: new Connection(DEVNET_RPC_ENDPOINT, "recent"),
  endpoint: clusterApiUrl("devnet"),
  network: WalletAdapterNetwork.Testnet,
  rpcEndpoint: DEVNET_RPC_ENDPOINT,
};

export const ClusterAtom = atomWithStorage<ClusterType>(
  "cluster",
  ClusterType.Mainnet,
);
