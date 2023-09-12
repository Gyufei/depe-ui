"use client";

import Image from "next/image";

import AccountAvatar from "/public/icons/account-avatar.svg";
import { Skeleton } from "../ui/skeleton";
import { useConnectModal } from "@/lib/hooks/use-connect";

export default function ConnectBtn() {
  const { shortAddress, openConnectModal, isDisconnected, isConnecting } =
    useConnectModal();

  return (
    <>
      <button
        className="c-shadow-btn c-shadow-translate hover:bg-yellow/90 bg-yellow px-[30px] py-[14px] text-base"
        onClick={() => openConnectModal()}
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
