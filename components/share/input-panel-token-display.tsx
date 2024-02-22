import { useState } from "react";
import Image from "next/image";
import { Arrow } from "@radix-ui/react-popover";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import StrokeArrowIcon from "/public/icons/arrow-down.svg";

import { IToken } from "@/lib/types/token";
import { cn } from "@/lib/utils/common";

import DialogGimp from "./dialog-gimp";
import PickUpTokenDialogContent from "./pick-up-token-dialog-content";
import { Skeleton } from "../ui/skeleton";

export function TokenDisplay({
  token,
  className,
}: {
  token: IToken;
  className?: string;
}) {
  if (!token) return <SkeletonToken />;

  return (
    <div
      className={cn(
        "flex h-full flex-col items-start justify-around space-y-3 py-4",
        className,
      )}
    >
      <div className="flex items-center text-xl leading-6 text-black">
        {token.symbol}
      </div>
      <Image
        width={24}
        height={24}
        src={token.logoURI}
        alt="token"
        className="c-image-shadow"
      ></Image>
    </div>
  );
}

export function StableTokenSelectDisplay({
  isLoading,
  tokens,
  token,
  setToken,
  className,
}: {
  isLoading: boolean;
  tokens: Array<IToken>;
  token: IToken;
  setToken: (_t: IToken) => void;
  className?: string;
}) {
  const [popOpen, setPopOpen] = useState(false);

  const handleSelectToken = (t: IToken) => {
    setToken(t);
    setPopOpen(false);
  };

  if (!token || isLoading) return <SkeletonToken />;

  return (
    <div
      className={cn(
        "flex h-full flex-col items-start justify-around space-y-3 py-4",
        className,
      )}
    >
      <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
        <PopoverTrigger>
          <div className="flex cursor-pointer items-center">
            <div className="pr-[4px] text-xl leading-6 text-black">
              {token.symbol}
            </div>
            <div className="flex h-6 w-6 items-center justify-center">
              <Image src={StrokeArrowIcon} width={24} height={24} alt="arrow" />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="flex w-[200px] flex-col items-stretch border-0 bg-white p-2 shadow-[0px_4px_8px_9px_rgba(14,4,62,0.08)]"
        >
          <Arrow className="fill-white" />
          {tokens.map((t) => (
            <div
              key={t?.symbol}
              onClick={() => handleSelectToken(t)}
              className="flex h-12 cursor-pointer items-center rounded-xl px-2 text-sm text-black hover:bg-[#f5f6f7]"
            >
              {t?.symbol}
            </div>
          ))}
        </PopoverContent>
      </Popover>
      <Image
        width={24}
        height={24}
        src={token.logoURI}
        alt="select token"
        className="c-image-shadow"
      ></Image>
    </div>
  );
}

export function TokenSelectDisplay({
  isLoading,
  token,
  tokens,
  setToken,
  className,
}: {
  isLoading: boolean;
  token: IToken;
  tokens: Array<IToken>;
  setToken: (_t: IToken) => void;
  className?: string;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSelectToken = (t: IToken) => {
    setToken(t);
    setDialogOpen(false);
  };

  if (!token) return <SkeletonToken />;

  return (
    <Dialog open={dialogOpen} onOpenChange={(isOpen) => setDialogOpen(isOpen)}>
      <DialogTrigger asChild>
        <div
          className={cn(
            "flex h-full flex-col items-start justify-around space-y-3 py-4",
            className,
          )}
        >
          <div className="flex cursor-pointer items-center">
            <div className="pr-[4px] text-xl leading-6 text-black">
              {token.symbol}
            </div>
            <div className="flex h-6 w-6 items-center justify-center">
              <Image src={StrokeArrowIcon} width={24} height={24} alt="arrow" />
            </div>
          </div>
          <Image
            width={24}
            height={24}
            src={token.logoURI}
            alt="select token"
            className="c-image-shadow"
          ></Image>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[400px] p-0 pb-6 md:w-[400px]">
        <DialogGimp />
        <DialogTitle className="px-6 pt-6">Pick up a Token</DialogTitle>
        <PickUpTokenDialogContent
          isLoading={isLoading}
          tokens={tokens}
          token={token}
          setToken={(t) => handleSelectToken(t)}
        />
      </DialogContent>
    </Dialog>
  );
}

function SkeletonToken() {
  return (
    <div className="flex h-full flex-col items-start justify-around space-y-3 py-4">
      <Skeleton className="mr-4 h-6 w-10 md:w-20" />
      <Skeleton className="mr-4 h-6 w-6 rounded-full" />
    </div>
  );
}
