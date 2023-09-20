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
    contract: {
      UniswapV3Quoter: "0xd6fA380B1e78b5d502EaB2D87A8C90f85CfFe9f7",
      UnisawpV3Router: "0x99072cf13462c99b11757bC81e730A69837FD6d0",
      IPIBone: "0x1dC6Ce581D4A5b0232dce7962b7105F76A848570",
      PriceOracle: "0xF9D7fb8Fec1441cC5bD68b85Fa1bd8693e0b1Ed9",
      DepePoolManager: "0xC120189a93cCdb9d41867958135218363279c741",
      DepePositionManager: "0x0507EfC997Ec2b12Cdd98143D9fB655D8D0b6C36",
    },
  },
  {
    name: "Sepolia",
    logo: SepoliaLogo,
    api: EndPointPathMap.sepoliaApi,
    gqlApi: EndPointPathMap.sepoliaGql,
    contract: {
      UniswapV3Quoter: "0xd6fA380B1e78b5d502EaB2D87A8C90f85CfFe9f7",
      UnisawpV3Router: "0x99072cf13462c99b11757bC81e730A69837FD6d0",
      IPIBone: "0x1dC6Ce581D4A5b0232dce7962b7105F76A848570",
      PriceOracle: "0xF9D7fb8Fec1441cC5bD68b85Fa1bd8693e0b1Ed9",
      DepePoolManager: "0xC120189a93cCdb9d41867958135218363279c741",
      DepePositionManager: "0x0507EfC997Ec2b12Cdd98143D9fB655D8D0b6C36",
    },
  },
  {
    name: "OP Mainnet",
    logo: OptimismLogo,
    api: EndPointPathMap.opApi,
    gqlApi: EndPointPathMap.opGql,
    contract: {
      UniswapV3Quoter: "0xd6fA380B1e78b5d502EaB2D87A8C90f85CfFe9f7",
      UnisawpV3Router: "0x99072cf13462c99b11757bC81e730A69837FD6d0",
      IPIBone: "0x1dC6Ce581D4A5b0232dce7962b7105F76A848570",
      PriceOracle: "0xF9D7fb8Fec1441cC5bD68b85Fa1bd8693e0b1Ed9",
      DepePoolManager: "0xC120189a93cCdb9d41867958135218363279c741",
      DepePositionManager: "0x0507EfC997Ec2b12Cdd98143D9fB655D8D0b6C36",
    },
  },
  {
    name: "Base",
    logo: BaseLogo,
    api: EndPointPathMap.baseApi,
    gqlApi: EndPointPathMap.baseGql,
    contract: {
      UniswapV3Quoter: "0xd6fA380B1e78b5d502EaB2D87A8C90f85CfFe9f7",
      UnisawpV3Router: "0x99072cf13462c99b11757bC81e730A69837FD6d0",
      IPIBone: "0x1dC6Ce581D4A5b0232dce7962b7105F76A848570",
      PriceOracle: "0xF9D7fb8Fec1441cC5bD68b85Fa1bd8693e0b1Ed9",
      DepePoolManager: "0xC120189a93cCdb9d41867958135218363279c741",
      DepePositionManager: "0x0507EfC997Ec2b12Cdd98143D9fB655D8D0b6C36",
    },
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
