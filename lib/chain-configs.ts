import BaseLogo from "/public/icons/base.svg";
import EthereumLogo from "/public/icons/ethereum.svg";
import SepoliaLogo from "/public/icons/sepolia.svg";
import OptimismLogo from "/public/icons/optimism.svg";

export const ChainConfigs = [
  {
    name: "Ethereum",
    logo: EthereumLogo,
  },
  {
    name: "Sepolia",
    logo: SepoliaLogo,
  },
  {
    name: "OP Mainnet",
    logo: OptimismLogo,
  },
  {
    name: "Base",
    logo: BaseLogo,
  },
];

export function getChainLogo(chainName: string) {
  return ChainConfigs.find((c) => c.name === chainName)?.logo;
}
