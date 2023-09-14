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
  },
  {
    name: "Sepolia",
    logo: SepoliaLogo,
    gqlApi: EndPointPathMap.sepoliaGql,
  },
  {
    name: "OP Mainnet",
    logo: OptimismLogo,
    gqlApi: EndPointPathMap.opGql,
  },
  {
    name: "Base",
    logo: BaseLogo,
    gqlApi: EndPointPathMap.baseGql,
  },
];

export function getChainLogo(chainName: string) {
  return ChainConfigs.find((c) => c.name === chainName)?.logo;
}

export function getChainGqlApi(chainName: string) {
  return ChainConfigs.find((c) => c.name === chainName)?.gqlApi;
}
