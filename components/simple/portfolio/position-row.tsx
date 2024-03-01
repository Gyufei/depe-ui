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
import { usePool } from "@/lib/hooks/api/use-pool";
import { usePositionFormat } from "@/lib/hooks/use-position-format";
import ShareDialogContent from "./share-dialog-content";
import { useMediaQuery } from "@/lib/hooks/common/use-media-query";

export function PositionRow({
  position,
  isLast,
}: {
  position: IPosition;
  isLast: boolean;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [popOpen, setPopOpen] = useState(false);
  const [tradeDialogOpen, setTradeDialogOpen] = useState(false);
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
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

  const handleShareDialog = (val: boolean) => {
    setShareDialogOpen(val);
    if (!val) setPopOpen(false);
  };

  const { data: pool } = usePool({ poolAddr: position.dpPoolAddr });

  const { baseToken, quoteToken, leverage, size, marginAmount, pnlPercent } =
    usePositionFormat(position, pool);

  const [action, setAction] = useState<string | null>(null);

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
        <div className="flex w-[50px] flex-1 flex-col md:w-[75px]">
          <TitleText># 100</TitleText>
          <SecondText>
            {quoteToken?.symbol}({leverage}×)
          </SecondText>
        </div>
        <div className="flex w-[45px] flex-col items-end pr-1 md:w-[82px] md:pr-4">
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
        <div className="flex flex-col items-end pr-1 md:pr-4">
          <APYText apy={pnlPercent.formatted || null} />
          <SecondText>P/L</SecondText>
        </div>
        <div className="flex w-[55px] flex-col items-end md:w-[70px]">
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
          {isDesktop ? (
            <Popover
              open={popOpen}
              onOpenChange={(isOpen) => setPopOpen(isOpen)}
            >
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
                  <DialogContent className="w-[calc(100vw-52px)] md:w-[480px]">
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
                  <DialogContent className="w-[calc(100vw-52px)] md:w-[480px]">
                    <DialogGimp />
                    <DialogTitle>Trade</DialogTitle>
                    <TradeDialogContent position={position} pool={pool} />
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={shareDialogOpen}
                  onOpenChange={(isOpen) => handleShareDialog(isOpen)}
                >
                  <DialogTrigger asChild>
                    <OperationPopRow>Share</OperationPopRow>
                  </DialogTrigger>
                  <DialogContent
                    showClose={false}
                    className="w-[750px] scale-50 gap-0 rounded-none border-0 p-0 shadow-none"
                  >
                    <ShareDialogContent position={position} pool={pool} />
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={transferDialogOpen}
                  onOpenChange={(isOpen) => handleTransferDialog(isOpen)}
                >
                  <DialogTrigger asChild>
                    <OperationPopRow>Transfer</OperationPopRow>
                  </DialogTrigger>
                  <DialogContent className="w-[calc(100vw-52px)] md:w-[480px]">
                    <DialogGimp />
                    <DialogTitle>Trade</DialogTitle>
                    <TransferDialogContent
                      position={position}
                      onSuccess={() => handleTradeDialog(false)}
                    />
                  </DialogContent>
                </Dialog>
              </PopoverContent>
            </Popover>
          ) : (
            <Dialog open={popOpen} onOpenChange={(o: boolean) => setPopOpen(o)}>
              <DialogTrigger asChild>
                <RowOperateDot isActive={popOpen} />
              </DialogTrigger>
              <DialogContent
                className="w-[calc(100vw-52px)] p-2"
                showClose={false}
              >
                <Dialog
                  open={positionDialogOpen}
                  onOpenChange={(isOpen) => handlePositionDialog(isOpen)}
                >
                  <DialogTrigger asChild>
                    <div
                      data-active={action === "Info"}
                      className="flex h-14 items-center justify-between pl-4 pr-2 data-[active=true]:bg-[#f5f6f7]"
                      key="Info"
                      onClick={() => setAction("Info")}
                    >
                      <div className="leading-5 text-black">Info</div>
                      {action === "Info" && <CircleFlag />}
                    </div>
                  </DialogTrigger>
                  <DialogContent className="w-[calc(100vw-52px)] md:w-[480px]">
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
                    <div
                      data-active={action === "Trade"}
                      className="flex h-14 items-center justify-between pl-4 pr-2 data-[active=true]:bg-[#f5f6f7]"
                      key="Trade"
                      onClick={() => setAction("Trade")}
                    >
                      <div className="leading-5 text-black">Trade</div>
                      {action === "Trade" && <CircleFlag />}
                    </div>
                  </DialogTrigger>
                  <DialogContent className="w-[calc(100vw-52px)] md:w-[480px]">
                    <DialogGimp />
                    <DialogTitle>Trade</DialogTitle>
                    <TradeDialogContent position={position} pool={pool} />
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={shareDialogOpen}
                  onOpenChange={(isOpen) => handleShareDialog(isOpen)}
                >
                  <DialogTrigger asChild>
                    <div
                      data-active={action === "Share"}
                      className="flex h-14 items-center justify-between pl-4 pr-2 data-[active=true]:bg-[#f5f6f7]"
                      key="Share"
                      onClick={() => setAction("Share")}
                    >
                      <div className="leading-5 text-black">Share</div>
                      {action === "Share" && <CircleFlag />}
                    </div>
                  </DialogTrigger>
                  <DialogContent
                    showClose={false}
                    className="w-[750px] scale-50 gap-0 rounded-none border-0 p-0 shadow-none"
                  >
                    <ShareDialogContent position={position} pool={pool} />
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={transferDialogOpen}
                  onOpenChange={(isOpen) => handleTransferDialog(isOpen)}
                >
                  <DialogTrigger asChild>
                    <div
                      data-active={action === "Transfer"}
                      className="flex h-14 items-center justify-between pl-4 pr-2 data-[active=true]:bg-[#f5f6f7]"
                      key="Transfer"
                      onClick={() => setAction("Transfer")}
                    >
                      <div className="leading-5 text-black">Transfer</div>
                      {action === "Transfer" && <CircleFlag />}
                    </div>
                  </DialogTrigger>
                  <DialogContent className="w-[calc(100vw-52px)] md:w-[480px]">
                    <DialogGimp />
                    <DialogTitle>Trade</DialogTitle>
                    <TransferDialogContent
                      position={position}
                      onSuccess={() => handleTradeDialog(false)}
                    />
                  </DialogContent>
                </Dialog>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
}

function CircleFlag() {
  return (
    <div className="h-3 w-3 rounded-full border-2 border-black bg-yellow"></div>
  );
}
