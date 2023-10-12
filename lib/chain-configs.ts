import BaseLogo from "/public/icons/base.svg";
import EthereumLogo from "/public/icons/ethereum.svg";
import SepoliaLogo from "/public/icons/sepolia.svg";
import OptimismLogo from "/public/icons/optimism.svg";

import { EndPointPathMap } from "./PathMap";
import { Address } from "viem";

interface IChainConfig {
  name: string;
  logo: string;
  api: {
    default: string;
    tokenApi: string;
    routerApi: string;
  };
  marginTokens: Array<Address>;
  contract: {
    UniswapV3Quoter: Address;
    UniswapV3Router: Address;
    IPIBone: Address;
    PriceOracle: Address;
    DepePoolManager: Address;
    DepePositionManager: Address;
  };
}

export const ChainConfigs: Array<IChainConfig> = [
  {
    name: "Ethereum",
    logo: EthereumLogo,
    api: {
      default: EndPointPathMap.ethApi,
      tokenApi: EndPointPathMap.ethTokens,
      routerApi: EndPointPathMap.ethRouter,
    },
    marginTokens: [
      "0xd2bB751e65fD6DBb224872ED7Df807f29b0F98aa",
      "0x7BdabA369F4554A4F3b39AF031C9D8355BBa6161",
    ],
    contract: {
      UniswapV3Quoter: "0xd6fA380B1e78b5d502EaB2D87A8C90f85CfFe9f7",
      UniswapV3Router: "0x99072cf13462c99b11757bC81e730A69837FD6d0",
      PriceOracle: "0x6703587462eFFE4712C5458FB427b4AD42b73ac2",
      IPIBone: "0x51bFb46a073D011720Ab6e6083C261631472Ae90",
      DepePositionManager: "0xC9904D9581d92c4A47aFd01bd9EAb37925636E08",
      DepePoolManager: "0x563730dE23BB3C66Df583c3602c72f614bF0170d",
    },
  },
  {
    name: "Sepolia",
    logo: SepoliaLogo,
    api: {
      default: EndPointPathMap.sepoliaApi,
      tokenApi: EndPointPathMap.sepoliaTokens,
      routerApi: EndPointPathMap.sepoliaRouter,
    },
    marginTokens: [
      "0xd2bB751e65fD6DBb224872ED7Df807f29b0F98aa",
      "0x7BdabA369F4554A4F3b39AF031C9D8355BBa6161",
    ],
    contract: {
      UniswapV3Quoter: "0xd6fA380B1e78b5d502EaB2D87A8C90f85CfFe9f7",
      UniswapV3Router: "0x99072cf13462c99b11757bC81e730A69837FD6d0",
      PriceOracle: "0x6703587462eFFE4712C5458FB427b4AD42b73ac2",
      IPIBone: "0x51bFb46a073D011720Ab6e6083C261631472Ae90",
      DepePositionManager: "0xC9904D9581d92c4A47aFd01bd9EAb37925636E08",
      DepePoolManager: "0x563730dE23BB3C66Df583c3602c72f614bF0170d",
    },
  },
  {
    name: "OP Mainnet",
    logo: OptimismLogo,
    api: {
      default: EndPointPathMap.opApi,
      tokenApi: EndPointPathMap.opTokens,
      routerApi: EndPointPathMap.opRouter,
    },
    marginTokens: [
      "0xd2bB751e65fD6DBb224872ED7Df807f29b0F98aa",
      "0x7BdabA369F4554A4F3b39AF031C9D8355BBa6161",
    ],
    contract: {
      UniswapV3Quoter: "0xd6fA380B1e78b5d502EaB2D87A8C90f85CfFe9f7",
      UniswapV3Router: "0x99072cf13462c99b11757bC81e730A69837FD6d0",
      PriceOracle: "0x6703587462eFFE4712C5458FB427b4AD42b73ac2",
      IPIBone: "0x51bFb46a073D011720Ab6e6083C261631472Ae90",
      DepePositionManager: "0xC9904D9581d92c4A47aFd01bd9EAb37925636E08",
      DepePoolManager: "0x563730dE23BB3C66Df583c3602c72f614bF0170d",
    },
  },
  {
    name: "Base",
    logo: BaseLogo,
    api: {
      default: EndPointPathMap.baseApi,
      tokenApi: EndPointPathMap.baseTokens,
      routerApi: EndPointPathMap.baseRouter,
    },
    marginTokens: [
      "0xd2bB751e65fD6DBb224872ED7Df807f29b0F98aa",
      "0x7BdabA369F4554A4F3b39AF031C9D8355BBa6161",
    ],
    contract: {
      UniswapV3Quoter: "0xd6fA380B1e78b5d502EaB2D87A8C90f85CfFe9f7",
      UniswapV3Router: "0x99072cf13462c99b11757bC81e730A69837FD6d0",
      PriceOracle: "0x6703587462eFFE4712C5458FB427b4AD42b73ac2",
      IPIBone: "0x51bFb46a073D011720Ab6e6083C261631472Ae90",
      DepePositionManager: "0xC9904D9581d92c4A47aFd01bd9EAb37925636E08",
      DepePoolManager: "0x563730dE23BB3C66Df583c3602c72f614bF0170d",
    },
  },
];

export function getChainLogo(chainName: string) {
  return ChainConfigs.find((c) => c.name === chainName)?.logo;
}

export function getChainMarginTokens(chainName: string) {
  return ChainConfigs.find((c) => c.name === chainName)?.marginTokens;
}
