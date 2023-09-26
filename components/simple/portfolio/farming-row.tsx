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
import { Skeleton } from "../../ui/skeleton";
import { usePoolFormat } from "@/lib/hooks/use-pool-format";
import { usePoolAPY } from "@/lib/hooks/use-pool-apy";

export function FarmingRow({ isLast, pool }: { isLast: boolean; pool: IPool }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: poolAPY, isLoading: isPoolAPYLoading } = usePoolAPY(
    pool?.poolAddr || null,
  );

  const { baseToken, quoteToken, leverage } = usePoolFormat(pool);

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
          <TitleText># {pool.poolId}</TitleText>
          <SecondText>{quoteToken?.symbol || ""}</SecondText>
        </div>
        <div className="flex flex-col items-end pr-[9%]">
          <TitleText>1~{leverage}×</TitleText>
          <SecondText>Leverage</SecondText>
        </div>
        <div className="flex flex-col items-end pr-[12%]">
          {!poolAPY || isPoolAPYLoading ? (
            <Skeleton className="mb-1 h-6 w-[50px]" />
          ) : (
            <APYText apy={poolAPY} />
          )}
          <SecondText>APY</SecondText>
        </div>
        <div className="flex flex-col items-end">
          <TitleText>300</TitleText>
          <SecondText>USDT</SecondText>
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
