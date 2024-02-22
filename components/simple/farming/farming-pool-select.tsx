import { useContext, useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import Triangle from "/public/icons/triangle.svg";
import DialogGimp from "../../share/dialog-gimp";
import SelectPoolDialogContent from "../../share/select-pool-dialog-content";

import { TitleText, ContentCon } from "./common";
import { FPoolAtom } from "@/lib/states/farming";
import { usePools } from "@/lib/hooks/api/use-pools";
import { Skeleton } from "@/components/ui/skeleton";
import { usePoolAPY } from "@/lib/hooks/api/use-pool-apy";
import { IsActivePanelContext } from "../hover-active-panel";
import useFarmingMatchPool from "@/lib/hooks/use-farming-pick-pool";
import { IPool } from "@/lib/types/pool";
import { useMediaQuery } from "@/lib/hooks/common/use-media-query";

export function FarmingPoolSelect() {
  const isActive = useContext(IsActivePanelContext);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { data: pools, isLoading } = usePools();
  const [dialogOpen, setDialogOpen] = useState(false);

  const { farmingPickPool, onFarmingPoolSelected } = useFarmingMatchPool();

  const selectedPool = useAtomValue(FPoolAtom);

  const { data: poolAPY, isLoading: isPoolAPYLoading } = usePoolAPY(
    selectedPool?.poolAddr || null,
  );

  useEffect(() => {
    if (!selectedPool && pools?.length) {
      farmingPickPool();
    }
  }, [selectedPool, pools, farmingPickPool]);

  const onPoolChange = (p: IPool | null) => {
    if (!p) return;

    onFarmingPoolSelected(p);
  };

  const onAutoPick = () => {
    const p = farmingPickPool();
    p && onFarmingPoolSelected(p);
  };

  return (
    <div>
      <TitleText>
        <div className="flex items-center justify-between">
          <div>Pool</div>
          <div className="c-font-text-65 flex items-center text-xs leading-[18px]">
            {poolAPY && (
              <>
                <div className="mr-2 text-gray">Est. APY</div>
                {!poolAPY || isPoolAPYLoading ? (
                  <Skeleton className="h-4 w-10" />
                ) : (
                  <div
                    data-state={isActive ? "active" : "inactive"}
                    className="text-black data-[state=active]:text-green"
                  >
                    {poolAPY}%
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </TitleText>
      <ContentCon>
        {isDesktop ? (
          <Dialog
            open={dialogOpen}
            onOpenChange={(isOpen) => setDialogOpen(isOpen)}
          >
            <DialogTrigger asChild>
              <div
                data-state={isActive ? "active" : "inactive"}
                className=" c-active-border flex flex-1 cursor-pointer items-center justify-between rounded-xl border-2 p-3 hover:brightness-110 md:p-4"
              >
                <div className="flex items-center text-sm leading-[17px] text-black ">
                  <div className="mr-[14px]">Automatch</div>
                  <div className="rounded-full border border-black py-1 pl-4 pr-5">
                    {selectedPool?.poolId
                      ? `#${selectedPool?.poolId}`
                      : "No Match Pool"}
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
                isLoading={isLoading}
                pool={selectedPool}
                onSelect={onPoolChange}
                onAutoPick={onAutoPick}
              />
            </DialogContent>
          </Dialog>
        ) : (
          <Drawer
            open={dialogOpen}
            onOpenChange={(isOpen) => setDialogOpen(isOpen)}
          >
            <DrawerTrigger asChild>
              <div
                data-state={isActive ? "active" : "inactive"}
                className=" c-active-border flex flex-1 cursor-pointer items-center justify-between rounded-xl border-2 p-3 hover:brightness-110 md:p-4"
              >
                <div className="flex items-center text-sm leading-[17px] text-black ">
                  <div className="mr-[14px]">Automatch</div>
                  <div className="rounded-full border border-black py-1 pl-4 pr-5">
                    {selectedPool?.poolId
                      ? `#${selectedPool?.poolId}`
                      : "No Match Pool"}
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
            </DrawerTrigger>
            <DrawerContent className="p-2 pt-4">
              <DrawerTitle>Select Pool</DrawerTitle>
              <SelectPoolDialogContent
                pools={pools}
                isLoading={isLoading}
                pool={selectedPool}
                onSelect={onPoolChange}
                onAutoPick={onAutoPick}
              />
            </DrawerContent>
          </Drawer>
        )}
      </ContentCon>
    </div>
  );
}
