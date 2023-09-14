import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import TokenPairImage from "../share/token-pair-image";
import { useState } from "react";
import RowOperateDot from "./row-operate-dot";
import FarmingDialogContent from "./farming-dialog-content";
import DialogGimp from "../share/dialog-gimp";
import { APYText, SecondText, TitleText } from "./row-common";
import { IPool } from "@/lib/types/pool";
import { useToken } from "wagmi";

export function FarmingRow({ isLast, pool }: { isLast: boolean; pool: IPool }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const { data } = useToken({
    address: pool.quoteToken
  })
  console.log(data);

  return (
    <div className="flex pl-2 pt-[10px] pr-6">
      <TokenPairImage className="mt-1" />
      <div
        data-state={isLast ? "last" : ""}
        className="relative ml-3 flex flex-1 border-b border-lightgray pr-9 pb-[14px] data-[state=last]:border-0"
      >
        <div className="flex flex-1 flex-col">
          <TitleText text={`# ${pool.poolId}`} />
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
              <RowOperateDot isActive={dialogOpen} />
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
