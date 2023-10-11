"use client";

import Image from "next/image";

import { Skeleton } from "../../ui/skeleton";
import { useConnectModal } from "@/lib/hooks/common/use-connect";
import MetamaskLogo from "/public/icons/metamask.svg";
import WalletConnectLogo from "/public/icons/walletconnect.svg";
import LogoutIcon from "/public/icons/logout.svg";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMemo, useState } from "react";
import { Address, useBalance, useDisconnect } from "wagmi";
import { useTokens } from "@/lib/hooks/api/use-tokens";
import { truncateAddr } from "@/lib/utils/web3";
import CopyIcon from "@/components/share/copy-icon";
import { formatNum } from "@/lib/utils/number";

export default function ConnectBtn() {
  const {
    shortAddress,
    address,
    connector,
    openConnectModal,
    isDisconnected,
    isConnecting,
  } = useConnectModal();

  const shorterAddress = useMemo(() => {
    if (!address) return "";
    return truncateAddr(address, {
      nPrefix: 7,
      nSuffix: 4,
    });
  }, [address]);

  const walletType = useMemo<any>(() => {
    return connector?.name || null;
  }, [connector]);

  const [popOpen, setPopOpen] = useState(false);

  if (isDisconnected) {
    return (
      <button
        className="c-shadow-translate c-font-title-65 rounded-xl border-2 bg-yellow px-[30px] py-[14px] text-base leading-5 text-black shadow-25 transition-all"
        onClick={() => openConnectModal()}
      >
        Connect
      </button>
    );
  }

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger asChild>
        <button className="c-shadow-translate c-font-title-65 rounded-xl border-2 bg-yellow px-[30px] py-[14px] text-base leading-5 text-black shadow-25 transition-all">
          <div className="flex items-center">
            <SmallWalletIcon type={walletType} />
            {isConnecting ? (
              <Skeleton className="h-5 w-24" />
            ) : (
              <span>{shortAddress}</span>
            )}
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        alignOffset={-20}
        className="m-3 flex w-[320px] flex-col items-stretch border-[2px] border-black bg-white p-6"
      >
        <div className="c-font-text-65 mb-6 leading-[17px] text-[#333]">
          Wallet
        </div>
        <div className="mt-0 mb-6 flex items-center gap-x-3">
          <BigWalletIcon type={walletType} />
          <div className="flex flex-1 flex-col">
            <div className="leading-6 text-black">{shorterAddress}</div>
            <BalanceDisplay address={address} />
          </div>
          <CopyIcon text={address || ""} />
        </div>
        <Disconnect />
      </PopoverContent>
    </Popover>
  );
}

function BalanceDisplay({ address }: { address: Address | undefined }) {
  const { data: balanceData, isLoading } = useBalance({
    address: address,
  });

  const balanceNum = useMemo(() => {
    return formatNum(balanceData?.formatted || 0, 4);
  }, [balanceData?.formatted]);

  const { data: tokens } = useTokens();
  const balanceToken = useMemo(() => {
    const balanceSymbol =
      balanceData?.symbol === "SEP" ? "ETH" : balanceData?.symbol;

    if (!tokens) return null;
    return tokens.find((x) => x.symbol === balanceSymbol);
  }, [tokens, balanceData?.symbol]);

  return (
    <div className="flex items-center">
      {isLoading ? (
        <>
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="ml-1 h-3 w-[100px]" />
        </>
      ) : (
        <>
          <Image
            width={16}
            height={16}
            src={balanceToken?.logoURI || ""}
            alt="token"
          ></Image>
          <div
            className="c-font-title-55 ml-1 text-xs"
            style={{
              color: "rgba(14, 4, 62, 0.6)",
            }}
          >
            {balanceNum}
          </div>
        </>
      )}
    </div>
  );
}

function SmallWalletIcon({
  type,
}: {
  type: "MetaMask" | "WalletConnect" | null;
}) {
  if (!type) return <Skeleton className="mr-2 h-7 w-7 rounded-full" />;

  return (
    <div
      className="mr-2 flex h-7 w-7 items-center justify-center rounded-full"
      style={{
        backgroundColor: "rgba(14, 4, 62, 0.04)",
      }}
    >
      {type === "MetaMask" && (
        <Image width={15} height={12} src={MetamaskLogo} alt="metamask"></Image>
      )}
      {type === "WalletConnect" && (
        <Image
          width={15}
          height={12}
          src={WalletConnectLogo}
          alt="metamask"
        ></Image>
      )}
    </div>
  );
}

function BigWalletIcon({
  type,
}: {
  type: "MetaMask" | "WalletConnect" | null;
}) {
  if (!type) return <Skeleton className="h-10 w-10 rounded-full" />;

  return (
    <div
      className="flex h-10 w-10 items-center justify-center rounded-full"
      style={{
        backgroundColor: "rgba(14, 4, 62, 0.1)",
      }}
    >
      {type === "MetaMask" && (
        <Image
          width={21.5}
          height={17.5}
          src={MetamaskLogo}
          alt="metamask"
        ></Image>
      )}
      {type === "WalletConnect" && (
        <Image
          width={21.5}
          height={17.5}
          src={WalletConnectLogo}
          alt="metamask"
        ></Image>
      )}
    </div>
  );
}

function Disconnect() {
  const { disconnect } = useDisconnect();
  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <div className="border-1 border-t border-lightgray pt-5">
      <div
        className="flex cursor-pointer items-center pb-4"
        onClick={handleDisconnect}
      >
        <Image width={20} height={20} src={LogoutIcon} alt="metamask"></Image>
        <div className="ml-2 text-sm leading-5 text-black">Disconnect</div>
      </div>
      <div className="flex items-center space-x-6 text-xs text-[#666]">
        <span className="cursor-pointer">Terms</span>
        <span className="cursor-pointer">Privacy</span>
        <span className="cursor-pointer">Support</span>
      </div>
    </div>
  );
}
