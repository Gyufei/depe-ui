import BaseLogo from "/public/icons/base.svg";
import EthereumLogo from "/public/icons/ethereum.svg";
import SepoliaLogo from "/public/icons/sepolia.svg";
import OptimismLogo from "/public/icons/optimism.svg";

import { EndPointPathMap } from "./PathMap";

export const ChainConfigs = [
  {
    name: "Ethereum",
    logo: EthereumLogo,
    gqlApi: EndPointPathMap.ethGql,
    api: EndPointPathMap.ethApi,
  },
  {
    name: "Sepolia",
    logo: SepoliaLogo,
    api: EndPointPathMap.sepoliaApi,
    gqlApi: EndPointPathMap.sepoliaGql,
  },
  {
    name: "OP Mainnet",
    logo: OptimismLogo,
    api: EndPointPathMap.opApi,
    gqlApi: EndPointPathMap.opGql,
  },
  {
    name: "Base",
    logo: BaseLogo,
    api: EndPointPathMap.baseApi,
    gqlApi: EndPointPathMap.baseGql,
  },
];

export function getChainLogo(chainName: string) {
  return ChainConfigs.find((c) => c.name === chainName)?.logo;
}

export function getChainApiPath(chainName: string) {
  return ChainConfigs.find((c) => c.name === chainName)?.api;
}

export function getChainGqlApiPath(chainName: string) {
  return ChainConfigs.find((c) => c.name === chainName)?.gqlApi;
}
