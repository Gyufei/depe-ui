"use client";

import { getChainBgColor } from "@/lib/chain-configs";
import { useNetwork } from "wagmi";

export default function BgProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { chain } = useNetwork();
  const bgColor = getChainBgColor(chain?.name || "");

  return (
    <div
      className="h-full w-full"
      style={{
        backgroundColor: `hsl(${bgColor})`,
      }}
    >
      {children}
    </div>
  );
}
