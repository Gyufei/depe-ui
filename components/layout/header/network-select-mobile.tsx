"use client";
import { useState } from "react";
import Image from "next/image";

import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useAtom } from "jotai";
import { ClusterAtom, ClusterType } from "@/lib/states/cluster";

export default function NetworkSelectMobile() {
  const [cluster, setCluster] = useAtom(ClusterAtom);

  const [popOpen, setPopOpen] = useState(false);

  const handleSelectNet = async (c: ClusterType) => {
    if (c === cluster) return;
    setCluster(c);
    setPopOpen(false);
  };

  return (
    <Drawer open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <DrawerTrigger asChild>
        <Image
          width={20}
          height={20}
          src="icons/operate-dot.svg"
          alt="dot"
          className="block cursor-pointer md:hidden"
        ></Image>
      </DrawerTrigger>
      <DrawerContent className="p-2 pt-4">
        <DrawerTitle>Network switching</DrawerTitle>
        <div
          onClick={() => handleSelectNet(ClusterType.Mainnet)}
          data-state={ClusterType.Mainnet === cluster ? "active" : "inactive"}
          className="mt-3 mb-2 flex cursor-pointer items-center justify-between px-1 py-3 text-black data-[state=active]:text-gray md:px-4"
          style={{
            boxShadow: "inset 0px -1px 0px 0px rgba(14, 4, 62, 0.1)",
          }}
        >
          <div className="flex items-center space-x-3">
            <Image
              width={24}
              height={24}
              src="/icons/solana.svg"
              alt="chain logo"
              className="c-image-shadow z-10 bg-white"
            />
            <div className="flex-1 text-sm">Solana Mainnet</div>
          </div>
          {ClusterType.Mainnet === cluster && <CircleFlag />}
        </div>
        <div
          onClick={() => handleSelectNet(ClusterType.Devnet)}
          data-state={ClusterType.Devnet === cluster ? "active" : "inactive"}
          className="flex cursor-pointer items-center justify-between space-x-3 px-1 py-3 text-black data-[state=active]:text-gray md:px-4"
        >
          <div className="flex items-center space-x-3">
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
          {ClusterType.Devnet === cluster && <CircleFlag />}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function CircleFlag() {
  return (
    <div className="h-3 w-3 rounded-full border-2 border-black bg-yellow"></div>
  );
}
