import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import TokenPairImage from "../../share/token-pair-image";
import RowOperateDot from "./row-operate-dot";
import PoolDialogContent from "./pool-dialog-content";
import DialogGimp from "../../share/dialog-gimp";
import { APYText, SecondText, TitleText } from "./row-common";
import type { IPool } from "@/lib/types/pool";
import { Skeleton } from "../../ui/skeleton";
import { usePoolFormat } from "@/lib/hooks/use-pool-format";
import { usePoolAPY } from "@/lib/hooks/api/use-pool-apy";
import { usePoolParsedAsset } from "@/lib/hooks/use-pool-parsed-asset";

export function PoolRow({ isLast, pool }: { isLast: boolean; pool: IPool }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: poolAPY, isLoading: isPoolAPYLoading } = usePoolAPY(
    pool?.poolAddr || null,
  );

  const { data: assetData, isLoading: isAssetLoading } =
    usePoolParsedAsset(pool);

  const { baseToken, quoteToken, leverage } = usePoolFormat(pool);

  return (
    <div className="flex pl-2 pt-[10px] pr-2 md:pr-6">
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
          {isAssetLoading ? (
            <Skeleton className="mb-1 h-6 w-[50px]" />
          ) : (
            <TitleText>{assetData.formatted}</TitleText>
          )}
          <SecondText>{baseToken?.symbol}</SecondText>
        </div>
        <div className="absolute -right-2 top-2">
          <Dialog
            open={dialogOpen}
            onOpenChange={(isOpen) => setDialogOpen(isOpen)}
          >
            <DialogTrigger asChild>
              <RowOperateDot isActive={dialogOpen} />
            </DialogTrigger>
            <DialogContent className="w-[calc(100vw-52px)] md:w-[400px]">
              <DialogGimp />
              <DialogTitle>Farming</DialogTitle>
              <PoolDialogContent
                pool={pool}
                asset={{
                  data: assetData,
                  isLoading: isAssetLoading,
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
