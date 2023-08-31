"use client";
import { useState } from "react";
import Image from "next/image";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const networks = [
  {
    name: "Ethereum Mainnet",
    src: "/icons/eth-net.svg",
  },
  {
    name: "Ethereum Sepolia",
    src: "/icons/sepolia-net.svg",
  },
];

export default function NetworkSelect() {
  const [network, setNetwork] = useState(networks[0]);
  const [popOpen, setPopOpen] = useState(false);

  const handleSelectNet = (net: typeof network) => {
    setNetwork(net);
    setTimeout(() => {
      setPopOpen(false);
    }, 100);
  };

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger asChild>
        <div
          data-state={popOpen ? "open" : "close"}
          className="relative flex h-12 w-[88px] cursor-pointer items-center rounded-xl px-2 data-[state=open]:bg-sky"
        >
          <Image
            width={40}
            height={40}
            src={network.src}
            alt={network.name}
            className="z-10 rounded-full border border-black shadow-1 shadow-black"
          ></Image>
          <div className="ml-2 flex h-6 w-6 items-center justify-center">
            <Image
              width={14}
              height={8}
              src="/icons/triangle.svg"
              alt="ethereum network"
            ></Image>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="flex w-[256px] flex-col items-stretch space-y-2 border-[2px] border-black bg-white p-2"
        align="start"
        alignOffset={-170}
      >
        {networks.map((net) => (
          <div
            onClick={() => handleSelectNet(net)}
            key={net.name}
            data-state={network.name === net.name ? "active" : "inactive"}
            className="flex cursor-pointer items-center space-x-3 rounded-xl px-4 py-3 text-black data-[state=active]:bg-black data-[state=active]:text-yellow"
          >
            <Image
              width={24}
              height={24}
              src={net.src}
              alt={net.name}
              className="z-10 rounded-full border border-black shadow-1 shadow-black"
            />
            <div className="text-sm">{net.name}</div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
