import { useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Triangle from "/public/icons/triangle.svg";
import DialogGimp from "../../share/dialog-gimp";
import SelectPoolDialogContent from "../../share/select-pool-dialog-content";

import { TitleText, ContentCon } from "./common";
import { FPoolAtom } from "@/lib/states/farming";
import usePools from "@/lib/hooks/use-pools";
import usePoolsAPY from "@/lib/hooks/use-pools-apy";
import { Skeleton } from "@/components/ui/skeleton";

export function Pool({ isActive }: { isActive: boolean }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedPool, setSelectedPool] = useAtom(FPoolAtom);

  const { pools, isLoading } = usePools();
  const { poolAPYs } = usePoolsAPY(pools);

  useEffect(() => {
    if (pools?.length) {
      setSelectedPool(pools[0]);
    }
  });

  const poolAPY = useMemo(() => {
    if (!selectedPool || !poolAPYs) {
      return null;
    }

    return poolAPYs[selectedPool.poolId];
  }, [selectedPool, poolAPYs]);

  return (
    <div>
      <TitleText>
        <div className="flex items-center justify-between">
          <div>Pool</div>
          <div className="c-font-text-65 flex items-center text-xs leading-[18px]">
            {poolAPY && (
              <>
                <div className="mr-2 text-gray">Est. APY</div>
                {poolAPY.isLoading ? (
                  <Skeleton className="h-4 w-10" />
                ) : (
                  <div
                    data-state={isActive ? "active" : "inactive"}
                    className="text-black data-[state=active]:text-green"
                  >
                    {poolAPY.value}%
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </TitleText>
      <ContentCon>
        <Dialog
          open={dialogOpen}
          onOpenChange={(isOpen) => setDialogOpen(isOpen)}
        >
          <DialogTrigger asChild>
            <div
              data-state={isActive ? "active" : "inactive"}
              className=" c-active-border flex flex-1 cursor-pointer items-center justify-between rounded-xl border-2 p-4 hover:brightness-110"
            >
              <div className="flex items-center text-sm leading-[17px] text-black ">
                <div className="mr-[14px]">Automatch</div>
                <div className="rounded-full border border-black py-1 pl-4 pr-5">
                  #{selectedPool?.poolId}
                </div>
              </div>
              <Image
                width={14}
                height={8}
                src={Triangle}
                alt="triangle"
                className="-rotate-90"
              ></Image>
            </div>
          </DialogTrigger>
          <DialogContent className="w-[400px] p-0 pb-6 md:w-[400px]">
            <DialogGimp />
            <DialogTitle className="px-6 pt-6">Select Pool</DialogTitle>
            <SelectPoolDialogContent
              pools={pools}
              poolAPYs={poolAPYs}
              isLoading={isLoading}
              pool={selectedPool}
              setPool={setSelectedPool}
            />
          </DialogContent>
        </Dialog>
      </ContentCon>
    </div>
  );
}
