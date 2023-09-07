"use client";

import { useNetwork } from "wagmi";

export default function BgLayout({ children }: { children: React.ReactNode }) {
  const { chain } = useNetwork();

  return (
    <div
      data-chain={chain?.name.replace(" ", "")}
      className="
      h-screen
      w-screen overflow-x-auto
      overflow-y-auto
      bg-white
      data-[chain='OPMainnet']:bg-yellow data-[chain='Ethereum']:bg-sky data-[chain='Sepolia']:bg-brown data-[chain='Base']:bg-pink"
    >
      {children}
    </div>
  );
}
