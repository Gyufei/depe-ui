"use client";
import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Triangle from "/public/icons/triangle.svg";
import { Skeleton } from "../../ui/skeleton";
import { useAtom } from "jotai";
import { ClusterAtom, ClusterType } from "@/lib/states/cluster";

export default function NetworkSelect() {
  const [cluster, setCluster] = useAtom(ClusterAtom);

  const [popOpen, setPopOpen] = useState(false);

  const handleSelectNet = async (c: ClusterType) => {
    if (c === cluster) return;
    setCluster(c);
    setPopOpen(false);
  };

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger asChild>
        <div className="relative flex h-12 w-[88px] cursor-pointer items-center rounded-xl bg-transparent px-2">
          <CurrChainLogo />
          <div
            data-state={popOpen ? "open" : "close"}
            className="ml-2 flex h-6 w-6 items-center justify-center data-[state=open]:rotate-180"
          >
            <Image width={14} height={8} src={Triangle} alt="triangle"></Image>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="flex w-[256px] flex-col items-stretch space-y-2 border-[2px] border-black bg-white p-2"
        align="start"
        alignOffset={-170}
      >
        <div
          onClick={() => handleSelectNet(ClusterType.Mainnet)}
          data-state={ClusterType.Mainnet === cluster ? "active" : "inactive"}
          className="flex cursor-pointer items-center space-x-3 rounded-xl px-4 py-3 text-black data-[state=active]:bg-black data-[state=active]:text-yellow"
        >
          <Image
            width={24}
            height={24}
            src="/icons/solana.svg"
            alt="chain logo"
            className="c-image-shadow z-10 bg-white"
          />
          <div className="flex-1 text-sm">Solana Mainnet</div>
        </div>
        <div
          onClick={() => handleSelectNet(ClusterType.Devnet)}
          data-state={ClusterType.Devnet === cluster ? "active" : "inactive"}
          className="flex cursor-pointer items-center space-x-3 rounded-xl px-4 py-3 text-black data-[state=active]:bg-black data-[state=active]:text-yellow"
        >
          <div className="relative">
            <Image
              width={24}
              height={24}
              src="/icons/solana.svg"
              alt="current chain logo"
              className="c-image-shadow z-10 bg-white"
            ></Image>

            <Image
              width={12}
              height={12}
              src="/icons/dev-flag.svg"
              alt="dev flag"
              className="absolute bottom-0 -right-1 z-[11]"
            ></Image>
          </div>
          <div className="flex-1 text-sm">Solana Testnet</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

const CurrChainLogo = dynamic(() => import("./curr-chain-logo"), {
  loading: () => <Skeleton className="h-10 w-10 rounded-full" />,
});
