import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useAtomValue } from "jotai";

import PoolCircleIcon from "/public/icons/pools-circle.svg";
import Triangle from "/public/icons/triangle.svg";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DialogGimp from "./dialog-gimp";
import SelectPoolDialogContent from "./select-pool-dialog-content";
import { Skeleton } from "@/components/ui/skeleton";
import { SPoolAtom } from "@/lib/states/swap";
import { usePools } from "@/lib/hooks/api/use-pools";
import { useTokens } from "@/lib/hooks/api/use-tokens";
import useSwapPickPool from "@/lib/hooks/use-swap-pick-pool";
import { IPool } from "@/lib/types/pool";

export default function SwapPoolSelect() {
  const { isLoading: isTokenLoading } = useTokens();
  const { data: pools, isLoading } = usePools();

  const { swapPickPool, onSwapPoolSelected } = useSwapPickPool();

  const selectedPool = useAtomValue(SPoolAtom);

  const [dialogOpen, setDialogOpen] = useState(false);

  const onPoolChange = (p: IPool | null) => {
    if (!p) return;

    onSwapPoolSelected(p);
  };

  const onAutoPick = useCallback(() => {
    const p = swapPickPool();
    p && onSwapPoolSelected(p);
  }, [swapPickPool, onSwapPoolSelected]);

  useEffect(() => {
    if (pools?.length && !selectedPool) {
      onAutoPick();
    }
  }, [pools, selectedPool, onAutoPick]);

  if (isTokenLoading) return <Skeleton className="h-6 w-[100px]" />;

  return (
    <Dialog open={dialogOpen} onOpenChange={(isOpen) => setDialogOpen(isOpen)}>
      <DialogTrigger asChild>
        <div className="flex cursor-pointer items-center rounded-full border border-black px-[10px] py-[1px] text-black">
          {isLoading || !selectedPool ? (
            <>
              <Skeleton className="h-[12.5px] w-[12.5px] rounded-full" />
              <Skeleton className="my-[3px] ml-1 mr-[14px] h-4 w-[40px]" />
              <Skeleton className="h-[8px] w-[14px]" />
            </>
          ) : (
            <>
              <Image
                width={12.5}
                height={12.5}
                src={PoolCircleIcon}
                alt="pools"
              ></Image>
              <div className="ml-1 mr-[10px] leading-[22px]">
                #{selectedPool.poolId}
              </div>
              <Image
                width={14}
                height={8}
                src={Triangle}
                alt="triangle"
                className="-rotate-90"
              ></Image>
            </>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="w-[400px] p-0 pb-6 md:w-[400px]">
        <DialogGimp />
        <DialogTitle className="px-6 pt-6">Select Pool</DialogTitle>
        <SelectPoolDialogContent
          pools={pools}
          isLoading={isLoading}
          pool={selectedPool}
          onSelect={onPoolChange}
          onAutoPick={onAutoPick}
        />
      </DialogContent>
    </Dialog>
  );
}
