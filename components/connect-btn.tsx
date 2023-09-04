"use client";

import Image from "next/image";

import { useWeb3Modal } from "@web3modal/react";
import ShadowButton from "./ui/shadow-button";
import { useAccount } from "wagmi";
import { truncateAddr } from "@/lib/utils";

import AccountAvatar from "/public/icons/account-avatar.svg";
import { Skeleton } from "./ui/skeleton";

export default function ConnectBtn() {
  const modal = useWeb3Modal();
  const { address, isDisconnected, isConnecting } = useAccount();
  const shortAddress = truncateAddr(address);

  return (
    <>
      <ShadowButton
        className="rounded-xl bg-yellow"
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
      </ShadowButton>
    </>
  );
}
