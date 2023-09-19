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

import TokenPairImage from "../../share/token-pair-image";
import RowOperateDot from "./row-operate-dot";
import DialogGimp from "../../share/dialog-gimp";
import TradeDialogContent from "./trade-dialog-content";
import PositionDialogContent from "./position-dialog-content";
import TransferDialogContent from "./transfer-dialog-content";
import { APYText, OperationPopRow, SecondText, TitleText } from "./row-common";

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
          <TitleText># 100</TitleText>
          <SecondText>DOGE(20✕)</SecondText>
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
          <SecondText>Size</SecondText>
        </div>
        <div className="flex flex-col items-end pr-[37px]">
          <APYText apy={70} />
          <SecondText>P/L</SecondText>
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
          <SecondText>Margin</SecondText>
        </div>
        <div className="absolute -right-2 top-2">
          <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
            <PopoverTrigger>
              <RowOperateDot isActive={popOpen} />
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
                  <OperationPopRow>Info</OperationPopRow>
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
                  <OperationPopRow>Trade</OperationPopRow>
                </DialogTrigger>
                <DialogContent className="w-[480px]">
                  <DialogGimp />
                  <DialogTitle>Trade</DialogTitle>
                  <TradeDialogContent />
                </DialogContent>
              </Dialog>

              <OperationPopRow>Share</OperationPopRow>

              <Dialog
                open={transferDialogOpen}
                onOpenChange={(isOpen) => setTransferDialogOpen(isOpen)}
              >
                <DialogTrigger asChild>
                  <OperationPopRow>Transfer</OperationPopRow>
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
