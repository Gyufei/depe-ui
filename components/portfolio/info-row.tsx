import Image from "next/image";

import { Arrow } from "@radix-ui/react-popover";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import TokenPairImage from "./token-pair-image";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

function TitleText({ text }: { text: string }) {
  return <div className="text-lg leading-7 text-black">{text}</div>;
}

function SecondText({ text }: { text: string }) {
  return <div className="text-xs leading-[18px] text-lightgray">{text}</div>;
}

function APYText({ apy }: { apy: number }) {
  const isGreaterThanZero = apy > 0;

  return (
    <div
      data-state={isGreaterThanZero ? "positive" : "negative"}
      className="text-lg leading-7 data-[state='positive']:text-green data-[state='negative']:text-red"
    >
      {isGreaterThanZero ? "+" : ""}
      {apy}%
    </div>
  );
}

function OperationPopRow({
  onClick,
  text,
}: {
  onClick: () => void;
  text: string;
}) {
  return (
    <div
      onClick={() => onClick()}
      className="flex h-12 cursor-pointer items-center rounded-xl px-4 text-sm text-black hover:bg-bggray"
    >
      {text}
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="mb-2 flex pl-2 pt-[16px] pr-6 last:mb-0">
      <div className="h-8 w-8">
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <div className="ml-3 flex flex-1 pb-[14px]">
        <div className="flex flex-col space-y-[6px] pr-[22px]">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
        <div className="flex flex-col items-end space-y-[6px] pr-[22px]">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
        <div className="flex flex-col items-end space-y-[6px] pr-[22px]">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
        <div className="flex flex-col items-end space-y-[6px] pr-[18px]">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
        <Skeleton className="h-5 w-1" />
      </div>
    </div>
  );
}

export function FarmingRow({ isLast }: { isLast: boolean }) {
  const [popOpen, setPopOpen] = useState(false);

  return (
    <div className="flex pl-2 pt-[10px] pr-6">
      <TokenPairImage className="mt-1" />
      <div
        data-state={isLast ? "last" : ""}
        className="relative ml-3 flex flex-1 border-b border-lightgray pr-9 pb-[14px] data-[state='last']:border-0"
      >
        <div className="flex flex-1 flex-col">
          <TitleText text="# 301" />
          <SecondText text="DOGE" />
        </div>
        <div className="flex flex-col items-end pr-[28px]">
          <TitleText text="1~10x" />
          <SecondText text="Leverage" />
        </div>
        <div className="flex flex-col items-end pr-[37px]">
          <APYText apy={70} />
          <SecondText text="APY" />
        </div>
        <div className="flex flex-col items-end">
          <TitleText text="300" />
          <SecondText text="USDT" />
        </div>
        <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
          <PopoverTrigger asChild>
            <div
              data-state={popOpen ? "open" : "close"}
              className="absolute -right-2 top-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md hover:bg-yellow data-[state='open']:bg-yellow"
            >
              <Image
                width={20}
                height={20}
                src="/icons/operate-dot.svg"
                alt="operate"
              ></Image>
            </div>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="flex w-[200px] flex-col items-stretch border-0 bg-white p-2"
            style={{
              boxShadow: "0px 4px 8px 0px rgba(14, 4, 62, 0.08)",
            }}
          >
            <Arrow
              style={{
                boxShadow: "0px 4px 8px 0px rgba(14, 4, 62, 0.08)",
              }}
              className="fill-white"
            />
            <OperationPopRow onClick={() => {}} text="Info" />
            <OperationPopRow onClick={() => {}} text="Trade" />
            <OperationPopRow onClick={() => {}} text="Share" />
            <OperationPopRow onClick={() => {}} text="Transfer" />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export function TradingRow({ isLast }: { isLast: boolean }) {
  const [popOpen, setPopOpen] = useState(false);

  return (
    <div className="flex pl-2 pt-[10px] pr-6">
      <TokenPairImage className="mt-1" />
      <div
        data-state={isLast ? "last" : ""}
        className="relative ml-3 flex flex-1 border-b border-lightgray pr-9 pb-[14px] data-[state='last']:border-0"
      >
        <div className="flex flex-1 flex-col">
          <TitleText text="# 100" />
          <SecondText text="DOGE(20✕)" />
        </div>
        <div className="flex flex-col items-end pr-[28px]">
          <div className="flex items-center text-lg leading-7 text-black">
            1000
            <Image
              width={16}
              height={16}
              src="/icons/dev/DOGE.svg"
              alt="token"
              className="ml-1"
            ></Image>
          </div>
          <SecondText text="Size" />
        </div>
        <div className="flex flex-col items-end pr-[37px]">
          <APYText apy={70} />
          <SecondText text="P/L" />
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center text-lg leading-7 text-black">
            11K
            <Image
              width={16}
              height={16}
              src="/icons/dev/USDT.svg"
              alt="token"
              className="ml-1"
            ></Image>
          </div>
          <SecondText text="Margin" />
        </div>
        <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
          <PopoverTrigger asChild>
            <div
              data-state={popOpen ? "open" : "close"}
              className="absolute -right-2 top-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md hover:bg-yellow data-[state='open']:bg-yellow"
            >
              <Image
                width={20}
                height={20}
                src="/icons/operate-dot.svg"
                alt="operate"
              ></Image>
            </div>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="flex w-[200px] flex-col items-stretch border-0 bg-white p-2"
            style={{
              boxShadow: "0px 4px 8px 0px rgba(14, 4, 62, 0.08)",
            }}
          >
            <Arrow
              style={{
                boxShadow: "0px 4px 8px 0px rgba(14, 4, 62, 0.08)",
              }}
              className="fill-white"
            />
            <OperationPopRow onClick={() => {}} text="Info" />
            <OperationPopRow onClick={() => {}} text="Trade" />
            <OperationPopRow onClick={() => {}} text="Share" />
            <OperationPopRow onClick={() => {}} text="Transfer" />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
