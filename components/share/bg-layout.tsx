"use client";

import { usePublicClient } from "wagmi";

export default function BgLayout({ children }: { children: React.ReactNode }) {
  const { chain } = usePublicClient();

  return (
    <div
      data-chain={chain?.name.replace(" ", "")}
      className="
      h-screen
      w-screen overflow-y-auto
      overflow-x-hidden
      bg-white
      data-[chain='OPMainnet']:bg-[#ffeeee] data-[chain='Ethereum']:bg-sky data-[chain='Sepolia']:bg-sky data-[chain='Base']:bg-[#e7f1ff]"
    >
      {children}
    </div>
  );
}
