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
import { IPosition } from "@/lib/types/position";
import { usePool } from "@/lib/hooks/use-pool";
import { usePositionFormat } from "@/lib/hooks/use-position-format";

export function TradingRow({
  position,
  isLast,
}: {
  position: IPosition;
  isLast: boolean;
}) {
  const [popOpen, setPopOpen] = useState(false);
  const [tradeDialogOpen, setTradeDialogOpen] = useState(false);
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [positionDialogOpen, setPositionDialogOpen] = useState(false);

  const handlePositionDialog = (val: boolean) => {
    setPositionDialogOpen(val);
    if (!val) setPopOpen(false);
  };

  const handleTradeDialog = (val: boolean) => {
    setTradeDialogOpen(val);
    if (!val) setPopOpen(false);
  };

  const handleTransferDialog = (val: boolean) => {
    setTransferDialogOpen(val);
    if (!val) setPopOpen(false);
  };

  const { data: pool } = usePool(position.dpPoolAddr);

  const { baseToken, quoteToken, leverage, size, marginAmount, pnlPercent } =
    usePositionFormat(position, pool);

  return (
    <div className="flex pl-2 pt-[10px] pr-6">
      <TokenPairImage
        img1={quoteToken?.logoURI || ""}
        img2={baseToken?.logoURI || ""}
        className="mt-1"
      />
      <div
        data-state={isLast ? "last" : ""}
        className="relative ml-3 flex flex-1 border-b border-lightgray pr-9 pb-[14px] data-[state=last]:border-0"
      >
        <div className="flex w-[75px] flex-1  flex-col">
          <TitleText># 100</TitleText>
          <SecondText>
            {quoteToken?.symbol}({leverage}×)
          </SecondText>
        </div>
        <div className="flex w-[82px] flex-col items-end pr-4">
          <div className="flex items-center text-lg leading-7 text-black">
            {size.formatted}
            <Image
              width={16}
              height={16}
              src={quoteToken?.logoURI || ""}
              alt="token"
              className="ml-1"
            ></Image>
          </div>
          <SecondText>Size</SecondText>
        </div>
        <div className="flex flex-col items-end pr-4">
          <APYText apy={pnlPercent.formatted} />
          <SecondText>P/L</SecondText>
        </div>
        <div className="flex w-[70px] flex-col items-end">
          <div className="flex items-center text-lg leading-7 text-black">
            {marginAmount.formatted}
            <Image
              width={16}
              height={16}
              src={baseToken?.logoURI || ""}
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
                onOpenChange={(isOpen) => handlePositionDialog(isOpen)}
              >
                <DialogTrigger asChild>
                  <OperationPopRow>Info</OperationPopRow>
                </DialogTrigger>
                <DialogContent className="w-[480px]">
                  <DialogGimp />
                  <DialogTitle>Position Info ({leverage}×)</DialogTitle>
                  <PositionDialogContent position={position} pool={pool} />
                </DialogContent>
              </Dialog>

              <Dialog
                open={tradeDialogOpen}
                onOpenChange={(isOpen) => handleTradeDialog(isOpen)}
              >
                <DialogTrigger asChild>
                  <OperationPopRow>Trade</OperationPopRow>
                </DialogTrigger>
                <DialogContent className="w-[480px]">
                  <DialogGimp />
                  <DialogTitle>Trade</DialogTitle>
                  <TradeDialogContent position={position} pool={pool} />
                </DialogContent>
              </Dialog>

              <OperationPopRow>Share</OperationPopRow>

              <Dialog
                open={transferDialogOpen}
                onOpenChange={(isOpen) => handleTransferDialog(isOpen)}
              >
                <DialogTrigger asChild>
                  <OperationPopRow>Transfer</OperationPopRow>
                </DialogTrigger>
                <DialogContent className="w-[480px]">
                  <DialogGimp />
                  <DialogTitle>Trade</DialogTitle>
                  <TransferDialogContent position={position} />
                </DialogContent>
              </Dialog>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
