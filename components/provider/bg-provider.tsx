"use client";

import { usePublicClient } from "wagmi";

export default function BgProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { chain } = usePublicClient();

  return (
    <div
      data-chain={chain?.name.replace(" ", "")}
      className="
      h-screen
      w-screen overflow-x-auto
      overflow-y-auto
      data-[chain='OPMainnet']:bg-sky data-[chain='Ethereum']:bg-sky data-[chain='Sepolia']:bg-sky data-[chain='Base']:bg-sky"
    >
      {children}
    </div>
  );
}
