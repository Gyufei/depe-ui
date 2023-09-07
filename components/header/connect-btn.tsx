"use client";

import Image from "next/image";

import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";
import { truncateAddr } from "@/lib/utils";

import AccountAvatar from "/public/icons/account-avatar.svg";
import { Skeleton } from "../ui/skeleton";

export default function ConnectBtn() {
  const modal = useWeb3Modal();
  const { address, isDisconnected, isConnecting } = useAccount();
  const shortAddress = truncateAddr(address);

  return (
    <>
      <button
        className="c-shadow-btn c-shadow-translate bg-yellow px-[30px] py-[14px] text-base hover:bg-yellow/90"
        onClick={() => modal.open()}
      >
        {isDisconnected ? (
          "Connect"
        ) : (
          <div className="flex items-center">
            <Image
              width={24}
              height={24}
              src={AccountAvatar}
              alt="avatar"
              className="mr-2"
            ></Image>
            {isConnecting ? (
              <Skeleton className="h-5 w-24" />
            ) : (
              <span>{shortAddress}</span>
            )}
          </div>
        )}
      </button>
    </>
  );
}
