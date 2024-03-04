"use client";

import Image from "next/image";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import NP from "number-precision";

import { Skeleton } from "../../ui/skeleton";
import LogoutIcon from "/public/icons/logout.svg";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTokens } from "@/lib/hooks/api/use-tokens";
import { truncateAddr } from "@/lib/utils/web3";
import CopyIcon from "@/components/share/copy-icon";
import { formatNum } from "@/lib/utils/number";
import WalletSelectDialog, {
  WalletSelectDialogVisibleAtom,
} from "@/components/share/wallet-select-dialog";
import toPubString from "@/lib/utils/pub-string";
import { useSetAtom } from "jotai";
import { SOLDecimals } from "@/lib/constant";
import { PublicKey } from "@solana/web3.js";

export default function ConnectBtn() {
  const setWalletSelectDialogVisible = useSetAtom(
    WalletSelectDialogVisibleAtom,
  );

  const openWalletSelectDialog = useCallback(() => {
    setWalletSelectDialogVisible(true);
  }, [setWalletSelectDialogVisible]);

  const { publicKey, connected, connecting, wallet } = useWallet();

  const address = toPubString(publicKey);

  const [shortAddr, setShortAddr] = useState("");

  useEffect(() => {
    if (!address) return;
    const sa = truncateAddr(address, {
      nPrefix: 9,
      nSuffix: 4,
    });

    setShortAddr(sa);
  }, [address]);

  const [popOpen, setPopOpen] = useState(false);

  if (!connected) {
    return (
      <>
        <button
          className="c-shadow-translate c-font-title-65 rounded-xl border-2 bg-yellow px-[14px] py-[10px] text-sm leading-5 text-black shadow-25 transition-all md:px-[30px] md:py-[14px] md:text-base"
          onClick={() => openWalletSelectDialog()}
        >
          Connect
        </button>
        <WalletSelectDialog />
      </>
    );
  }

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger asChild>
        <button className="c-shadow-translate c-font-title-65 rounded-xl border-2 bg-yellow px-[14px]  py-[10px] text-sm leading-5 text-black shadow-25 transition-all md:px-[30px] md:py-[14px] md:text-base">
          <div className="flex items-center">
            <SmallWalletIcon icon={wallet?.adapter.icon} />
            {!shortAddr || connecting ? (
              <Skeleton className="h-5 w-24" />
            ) : (
              <div>{shortAddr}</div>
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
          <BigWalletIcon icon={wallet?.adapter.icon} />
          <div className="flex flex-1 flex-col">
            <div className="leading-6 text-black">{shortAddr}</div>
            <BalanceDisplay />
          </div>
          <CopyIcon text={address || ""} />
        </div>
        <Disconnect />
      </PopoverContent>
    </Popover>
  );
}

function BalanceDisplay() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const [balanceData, setBalanceData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!publicKey) return;

    async function getBalance(pb: PublicKey) {
      if (!pb) {
        setBalanceData(null);
      } else {
        const res = await connection.getBalance(pb);
        console.log(res);
        setBalanceData(res);
        setIsLoading(false);
      }
    }

    getBalance(publicKey);
  }, [publicKey, connection]);

  const balanceNum = useMemo(() => {
    if (!balanceData) return 0;
    const balance = NP.divide(balanceData, 10 ** SOLDecimals);
    return formatNum(balance || 0, 4);
  }, [balanceData]);

  const { data: tokens } = useTokens();
  const balanceToken = useMemo(() => {
    const balanceSymbol = "SOL";

    if (!tokens) return null;
    return tokens.find((x) => x.symbol === balanceSymbol);
  }, [tokens]);

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

function SmallWalletIcon({ icon }: { icon: string | undefined }) {
  if (!icon) return <Skeleton className="mr-2 h-7 w-7 rounded-full" />;

  return (
    <div
      className="mr-2 flex h-7 w-7 items-center justify-center rounded-full"
      style={{
        backgroundColor: "rgba(14, 4, 62, 0.04)",
      }}
    >
      <Image width={15} height={12} src={icon} alt="metamask"></Image>
    </div>
  );
}

function BigWalletIcon({ icon }: { icon: string | undefined }) {
  if (!icon) return <Skeleton className="h-10 w-10 rounded-full" />;

  return (
    <div
      className="flex h-10 w-10 items-center justify-center rounded-full"
      style={{
        backgroundColor: "rgba(14, 4, 62, 0.1)",
      }}
    >
      <Image width={21.5} height={17.5} src={icon} alt="metamask"></Image>
    </div>
  );
}

function Disconnect() {
  const { disconnect } = useWallet();

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <div className="border-1 border-t border-lightgray pt-5">
      <div
        className="flex cursor-pointer items-center pb-4"
        onClick={handleDisconnect}
      >
        <Image width={20} height={20} src={LogoutIcon} alt="logo"></Image>
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
