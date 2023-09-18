import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import TokenPairImage from "../../share/token-pair-image";
import { useState } from "react";
import RowOperateDot from "./row-operate-dot";
import FarmingDialogContent from "./farming-dialog-content";
import DialogGimp from "../../share/dialog-gimp";
import { APYText, SecondText, TitleText } from "./row-common";
import type { IPool } from "@/lib/types/pool";
import { useTokensInfo } from "@/lib/hooks/use-token-info";
import { IPoolAPY } from "@/lib/hooks/use-pools-apy";
import { Skeleton } from "../../ui/skeleton";

export function FarmingRow({
  isLast,
  pool,
  poolAPY,
}: {
  isLast: boolean;
  pool: IPool;
  poolAPY: IPoolAPY;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [baseToken, quoteToken] = useTokensInfo([
    pool.baseToken,
    pool.quoteToken,
  ]);

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
        <div className="flex flex-1 flex-col">
          <TitleText text={`# ${pool.poolId}`} />
          <SecondText text={quoteToken?.symbol || ""} />
        </div>
        <div className="flex flex-col items-end pr-[9%]">
          <TitleText text={`1~${pool.maxleverage}×`} />
          <SecondText text="Leverage" />
        </div>
        <div className="flex flex-col items-end pr-[12%]">
          {!poolAPY || poolAPY?.isLoading ? (
            <Skeleton className="h-7 w-[50px]" />
          ) : (
            <APYText apy={poolAPY?.value} />
          )}
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
              <FarmingDialogContent pool={pool} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
