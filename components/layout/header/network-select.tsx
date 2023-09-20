"use client";
import { useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import {
  Chain,
  useAccount,
  useConfig,
  usePublicClient,
  useSwitchNetwork,
} from "wagmi";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { getChainLogo } from "@/lib/chain-configs";
import Triangle from "/public/icons/triangle.svg";
import { Skeleton } from "../../ui/skeleton";

export default function NetworkSelect() {
  const { isConnected } = useAccount();
  const { chain, chains } = usePublicClient();
  const { switchNetworkAsync, isLoading, pendingChainId } = useSwitchNetwork();
  const config = useConfig();

  const [popOpen, setPopOpen] = useState(false);

  const handleSelectNet = async (selectChain: Chain) => {
    if (selectChain.id === chain?.id) return;
    if (isConnected) {
      await switchNetworkAsync?.(selectChain.id);
    } else {
      config.setState((x) => {
        return {
          ...x,
          data: {
            ...x.data,
            chain: {
              ...selectChain,
              unsupported: false,
            },
          },
        };
      });
    }
    setPopOpen(false);
  };

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger asChild>
        <div className="relative flex h-12 w-[88px] cursor-pointer items-center rounded-xl bg-transparent px-2">
          {chain ? (
            <Image
              width={40}
              height={40}
              src={getChainLogo(chain.name)}
              alt="current chain logo"
              className="c-image-shadow z-10"
            ></Image>
          ) : (
            <Skeleton className="h-10 w-10 rounded-full" />
          )}
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
        {(chains || []).map((c) => (
          <div
            key={c.name}
            onClick={() => handleSelectNet(c)}
            data-state={c.id === chain?.id ? "active" : "inactive"}
            className="flex cursor-pointer items-center space-x-3 rounded-xl px-4 py-3 text-black data-[state=active]:bg-black data-[state=active]:text-yellow"
          >
            <Image
              width={24}
              height={24}
              src={getChainLogo(c.name)}
              alt="chain logo"
              className="c-image-shadow z-10"
            />
            <div className="flex-1 text-sm">{c.name}</div>
            {isLoading && pendingChainId === c.id && (
              <Loader2 className="h-4 w-4 animate-spin text-pink" />
            )}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
