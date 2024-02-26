import { atomWithStorage } from "jotai/utils";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { EndPointPathMap } from "../PathMap";

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
  customRpcEndPoint: string | null;
  api: {
    default: string;
    tokenApi: string;
  };
  marginTokens: Array<string>;
  program: Record<string, any>;
}

export const MainnetCluster: Cluster = {
  type: ClusterType.Mainnet,
  connection: new Connection(MAINNET_RPC_ENDPOINT, "recent"),
  endpoint: clusterApiUrl("mainnet-beta"),
  network: WalletAdapterNetwork.Mainnet,
  rpcEndpoint: MAINNET_RPC_ENDPOINT,
  customRpcEndPoint: null,
  api: {
    default: EndPointPathMap.ethApi,
    tokenApi: EndPointPathMap.ethTokens,
  },
  marginTokens: [
    "0xd2bB751e65fD6DBb224872ED7Df807f29b0F98aa",
    "0x7BdabA369F4554A4F3b39AF031C9D8355BBa6161",
  ],
  program: {},
};

export const DevnetCluster: Cluster = {
  type: ClusterType.Devnet,
  connection: new Connection(DEVNET_RPC_ENDPOINT, "recent"),
  endpoint: clusterApiUrl("devnet"),
  network: WalletAdapterNetwork.Testnet,
  rpcEndpoint: DEVNET_RPC_ENDPOINT,
  customRpcEndPoint: null,
  api: {
    default: EndPointPathMap.ethApi,
    tokenApi: EndPointPathMap.ethTokens,
  },
  marginTokens: [
    "0xd2bB751e65fD6DBb224872ED7Df807f29b0F98aa",
    "0x7BdabA369F4554A4F3b39AF031C9D8355BBa6161",
  ],
  program: {},
};

export const ClusterAtom = atomWithStorage<ClusterType>(
  "cluster",
  ClusterType.Mainnet,
);
