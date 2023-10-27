"use client";

import { useEffect, useState } from "react";
import { usePublicClient } from "wagmi";

export default function BgLayout({ children }: { children: React.ReactNode }) {
  const { chain } = usePublicClient();
  const [chainName, setChainName] = useState("Ethereum");

  useEffect(() => {
    setChainName(chain?.name.replace(" ", ""));
  }, [chain]);

  return (
    <div
      data-chain={chainName}
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
