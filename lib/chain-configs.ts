import BaseLogo from "/public/icons/base.svg";
import EthereumLogo from "/public/icons/ethereum.svg";
import SepoliaLogo from "/public/icons/sepolia.svg";
import OptimismLogo from "/public/icons/optimism.svg";

export const ChainConfigs = [
  {
    name: "Ethereum",
    logo: EthereumLogo,
    bgColor: "var(--color-sky)",
  },
  {
    name: "Sepolia",
    logo: SepoliaLogo,
    bgColor: "var(--color-yellow)",
  },
  {
    name: "OP Mainnet",
    logo: OptimismLogo,
    bgColor: "var(--color-blue)",
  },
  {
    name: "Base",
    logo: BaseLogo,
    bgColor: "var(--color-pink)",
  },
];

export function getChainLogo(chainName: string) {
  return ChainConfigs.find((c) => c.name === chainName)?.logo;
}

export function getChainBgColor(chainName: string) {
  return (
    ChainConfigs.find((c) => c.name === chainName)?.bgColor ||
    "var(--color-sky)"
  );
}
