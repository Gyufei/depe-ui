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

import TokenPairImage from "../common/token-pair-image";
import { forwardRef, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import RowOperateDot from "./row-operate-dot";
import FarmingDialogContent from "./farming-dialog-content";
import DialogGimp from "../common/dialog-gimp";
import TradeDialogContent from "./trade-dialog-content";
import PositionDialogContent from "./position-dialog-content";
import TransferDialogContent from "./transfer-dialog-content";

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
      className="text-lg leading-7 data-[state=positive]:text-green data-[state=negative]:text-red"
    >
      {isGreaterThanZero ? "+" : ""}
      {apy}%
    </div>
  );
}

export const OperationPopRow = forwardRef(
  ({ text, ...rest }: { text: string; [key: string]: any }, ref: any) => (
    <div
      ref={ref}
      className="flex h-12 cursor-pointer items-center rounded-xl px-4 text-sm text-black hover:bg-[#f5f6f7]"
      {...rest}
    >
      {text}
    </div>
  ),
);

OperationPopRow.displayName = "OperationPopRow";

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
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="flex pl-2 pt-[10px] pr-6">
      <TokenPairImage className="mt-1" />
      <div
        data-state={isLast ? "last" : ""}
        className="relative ml-3 flex flex-1 border-b border-lightgray pr-9 pb-[14px] data-[state=last]:border-0"
      >
        <div className="flex flex-1 flex-col">
          <TitleText text="# 301" />
          <SecondText text="DOGE" />
        </div>
        <div className="flex flex-col items-end pr-[9%]">
          <TitleText text="1~10×" />
          <SecondText text="w-[400px]" />
        </div>
        <div className="flex flex-col items-end pr-[12%]">
          <APYText apy={70} />
          <SecondText text="APY" />
        </div>
        <div className="flex flex-col items-end">
          <TitleText text="300" />
          <SecondText text="USDT" />
        </div>
        <div className="absolute -right-2 top-2">
          <Dialog
            open={dialogOpen}
            onOpenChange={(isOpen) => setDialogOpen(isOpen)}
          >
            <DialogTrigger asChild>
              <RowOperateDot active={dialogOpen} />
            </DialogTrigger>
            <DialogContent className="w-[400px]">
              <DialogGimp />
              <DialogTitle>Farming</DialogTitle>
              <FarmingDialogContent />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export function TradingRow({ isLast }: { isLast: boolean }) {
  const [popOpen, setPopOpen] = useState(false);

  const [tradeDialogOpen, setTradeDialogOpen] = useState(false);
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [positionDialogOpen, setPositionDialogOpen] = useState(false);

  return (
    <div className="flex pl-2 pt-[10px] pr-6">
      <TokenPairImage className="mt-1" />
      <div
        data-state={isLast ? "last" : ""}
        className="relative ml-3 flex flex-1 border-b border-lightgray pr-9 pb-[14px] data-[state=last]:border-0"
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
        <div className="absolute -right-2 top-2">
          <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
            <PopoverTrigger>
              <RowOperateDot active={popOpen} />
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="flex w-[200px] flex-col items-stretch border-0 bg-white p-2 shadow-[0px_4px_8px_9px_rgba(14,4,62,0.08)]"
            >
              <Arrow className="fill-white" />
              <Dialog
                open={positionDialogOpen}
                onOpenChange={(isOpen) => setPositionDialogOpen(isOpen)}
              >
                <DialogTrigger asChild>
                  <OperationPopRow text="Info" />
                </DialogTrigger>
                <DialogContent className="w-[480px]">
                  <DialogGimp />
                  <DialogTitle>Position Info (5×)</DialogTitle>
                  <PositionDialogContent />
                </DialogContent>
              </Dialog>

              <Dialog
                open={tradeDialogOpen}
                onOpenChange={(isOpen) => setTradeDialogOpen(isOpen)}
              >
                <DialogTrigger asChild>
                  <OperationPopRow text="Trade" />
                </DialogTrigger>
                <DialogContent className="w-[480px]">
                  <DialogGimp />
                  <DialogTitle>Trade</DialogTitle>
                  <TradeDialogContent />
                </DialogContent>
              </Dialog>

              <OperationPopRow text="Share" />

              <Dialog
                open={transferDialogOpen}
                onOpenChange={(isOpen) => setTransferDialogOpen(isOpen)}
              >
                <DialogTrigger asChild>
                  <OperationPopRow text="Transfer" />
                </DialogTrigger>
                <DialogContent className="w-[480px]">
                  <DialogGimp />
                  <DialogTitle>Trade</DialogTitle>
                  <TransferDialogContent />
                </DialogContent>
              </Dialog>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
