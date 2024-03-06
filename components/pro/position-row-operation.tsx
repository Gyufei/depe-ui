import { useMediaQuery } from "@/lib/hooks/common/use-media-query";
import { useState } from "react";
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

import RowOperateDot from "../simple/portfolio/row-operate-dot";
import { Arrow } from "@radix-ui/react-popover";
import { OperationPopRow } from "../simple/portfolio/row-common";
import DialogGimp from "../share/dialog-gimp";
import TradeDialogContent from "../simple/portfolio/trade-dialog-content";
import { IPool } from "@/lib/types/pool";
import { IPosition } from "@/lib/types/position";
import TransferDialogContent from "../simple/portfolio/transfer-dialog-content";

export default function PositionRowOperation({
  pool,
  position,
}: {
  pool: IPool;
  position: IPosition;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [popOpen, setPopOpen] = useState(false);
  const [tradeDialogOpen, setTradeDialogOpen] = useState(false);
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);

  const [action, setAction] = useState<string | null>(null);

  const handleTradeDialog = (val: boolean) => {
    setTradeDialogOpen(val);
    if (!val) setPopOpen(false);
  };

  const handleTransferDialog = (val: boolean) => {
    setTransferDialogOpen(val);
    if (!val) setPopOpen(false);
  };

  return (
    <div>
      {isDesktop ? (
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
          <DialogContent className="w-[calc(100vw-52px)] p-2" showClose={false}>
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
  );
}

function CircleFlag() {
  return (
    <div className="h-3 w-3 rounded-full border-2 border-black bg-yellow"></div>
  );
}
