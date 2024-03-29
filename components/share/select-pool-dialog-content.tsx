import { useEffect, useState } from "react";
import Image from "next/image";
import { Arrow } from "@radix-ui/react-popover";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import Triangle from "/public/icons/triangle.svg";
import { Search } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import TokenPairImage from "./token-pair-image";
import type { IPool } from "@/lib/types/pool";

import { Skeleton } from "../ui/skeleton";
import { range } from "lodash";
import Empty from "./empty";
import { usePoolFormat } from "@/lib/hooks/use-pool-format";
import { usePoolAPY } from "@/lib/hooks/api/use-pool-apy";
import { usePoolsFilter } from "@/lib/hooks/use-pools-filter";
import { useMediaQuery } from "@/lib/hooks/common/use-media-query";

export default function SelectPoolDialogContent({
  isLoading,
  pools,
  pool,
  onSelect,
  onAutoPick,
}: {
  isLoading: boolean;
  pools: Array<IPool> | null;
  pool: IPool | null;
  onSelect: (_p: IPool | null) => void;
  onAutoPick: () => void;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isAuto, setIsAuto] = useState(false);

  const [mobileDialog, setMobileDialog] = useState(false);

  const {
    sortFields,
    sortBy,
    searchStr,
    setSearchStr,
    setSortBy,
    filteredPools,
    recordPoolAPY,
  } = usePoolsFilter(pools);

  const handleAuto = () => {
    if (isAuto) return;

    onSelect(null);
    setIsAuto(true);
    onAutoPick();
  };

  const handleSelectPool = (pool: IPool) => {
    setIsAuto(false);
    onSelect(pool);
  };

  const handleSelectSortBy = (v: string) => {
    setSortBy(v);
    setMobileDialog(false);
  };

  return (
    <>
      {isLoading ? (
        <div className="mt-5 rounded-xl border-2 border-black bg-white px-4 py-[16px] text-sm leading-5 md:mx-6 md:mt-0">
          <Skeleton className="h-5 w-[100px]" />
        </div>
      ) : (
        <div
          onClick={handleAuto}
          data-check={isAuto ? "true" : "false"}
          className="mt-5 cursor-pointer rounded-xl border-2 border-black bg-white px-4 py-[16px] text-sm leading-5 data-[check=true]:bg-blue md:mx-6 md:mt-0"
        >
          Automatch
        </div>
      )}

      <div className="mt-1">
        <div className="flex items-center justify-between md:px-6">
          {isLoading ? (
            <Skeleton className="h-5 w-[100px]" />
          ) : isDesktop ? (
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex cursor-pointer items-center outline-none">
                  <div className="mr-2 text-xs leading-[18px] text-lightgray">
                    Order by
                  </div>
                  <div className="c-font-text-65 mr-1 text-xs leading-[18px] text-[#11142d]">
                    {sortBy}
                  </div>
                  <Image
                    width={14}
                    height={8}
                    src={Triangle}
                    alt="triangle"
                    className="data-[state=open]:rotate-180"
                  ></Image>
                </div>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="flex w-[120px] flex-col items-stretch border-0 bg-white p-2 shadow-[0px_4px_8px_9px_rgba(14,4,62,0.08)]"
              >
                <Arrow className="fill-white" />
                {sortFields.map((f) => (
                  <SortPopRow
                    key={f.value}
                    onClick={() => setSortBy(f.value)}
                    text={f.label}
                  />
                ))}
              </PopoverContent>
            </Popover>
          ) : (
            <Dialog
              open={mobileDialog}
              onOpenChange={(o: boolean) => setMobileDialog(o)}
            >
              <DialogTrigger asChild>
                <div className="flex cursor-pointer items-center outline-none">
                  <div className="mr-2 text-xs leading-[18px] text-lightgray">
                    Order by
                  </div>
                  <div className="c-font-text-65 mr-1 text-xs leading-[18px] text-[#11142d]">
                    {sortBy}
                  </div>
                  <Image
                    width={14}
                    height={8}
                    src={Triangle}
                    alt="triangle"
                    className="data-[state=open]:rotate-180"
                  ></Image>
                </div>
              </DialogTrigger>
              <DialogContent
                className="w-[calc(100vw-52px)] p-2"
                showClose={false}
              >
                <div className="flex flex-col">
                  {sortFields.map((f) => (
                    <div
                      data-active={sortBy === f.value ? true : false}
                      className="flex h-14 items-center justify-between pl-4 pr-2 data-[active=true]:bg-[#f5f6f7]"
                      key={f.value}
                      onClick={() => handleSelectSortBy(f.value)}
                    >
                      <div className="leading-5 text-black">{f.label}</div>
                      {sortBy === f.value && <CircleFlag />}
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          )}

          {isLoading ? (
            <Skeleton className="h-5 w-[100px]" />
          ) : (
            <div className="flex items-center border-b border-lightgray">
              <input
                type="text"
                className="w-[100px] border-0"
                value={searchStr}
                onChange={(e) => setSearchStr(e.target.value)}
                placeholder="Search"
              />
              <Search className="h-4 w-4 cursor-pointer text-lightgray" />
            </div>
          )}
        </div>

        <div className="mt-3 md:pl-6 md:pr-2">
          {isLoading && (
            <div className="h-[312px] md:pr-4">
              {range(5).map((i: number) => {
                return <SkeletonRow key={i} />;
              })}
            </div>
          )}

          {!isLoading && !filteredPools.length && (
            <div className="flex h-[312px] items-center justify-center pr-4">
              <Empty />
            </div>
          )}

          {!isLoading && filteredPools.length > 0 && (
            <ScrollArea className="h-[312px] md:pr-4">
              {filteredPools.map((p) => (
                <PoolRow
                  key={p.poolId}
                  pool={p}
                  recordAPY={recordPoolAPY}
                  isSelected={pool?.poolId === p.poolId}
                  onClick={() => handleSelectPool(p)}
                />
              ))}
              <ScrollBar />
            </ScrollArea>
          )}
        </div>
      </div>
    </>
  );
}

function SortPopRow({ onClick, text }: { onClick: () => void; text: string }) {
  return (
    <div
      onClick={() => onClick()}
      className="flex h-8 cursor-pointer items-center rounded-lg px-4 text-sm text-black hover:bg-[#f5f6f7]"
    >
      {text}
    </div>
  );
}

function PoolRow({
  pool,
  isSelected,
  recordAPY,
  onClick,
}: {
  pool: IPool;
  isSelected: boolean;
  recordAPY: (_id: string, _a: string) => void;
  onClick: () => void;
}) {
  const { baseToken, quoteToken, leverage } = usePoolFormat(pool);

  const { data: poolAPY, isLoading: isPoolAPYLoading } = usePoolAPY(
    pool?.poolAddr || null,
  );

  useEffect(() => {
    recordAPY(pool.poolId, poolAPY);
  }, [poolAPY, recordAPY, pool.poolId]);

  return (
    <div
      onClick={onClick}
      data-check={isSelected ? "true" : "false"}
      className="mt-[6px] flex cursor-pointer items-center rounded-xl border-2 border-black py-2 px-4 first:mt-0 data-[check=true]:bg-blue"
    >
      <TokenPairImage
        img1={quoteToken?.logoURI || ""}
        img2={baseToken?.logoURI || ""}
      />
      <div className="ml-3 flex flex-1 items-center justify-between pt-[2px]">
        <div className="flex flex-col justify-between">
          <TitleText>#{pool.poolId}</TitleText>
          <SecondText>{quoteToken?.symbol} </SecondText>
        </div>
        <div className="flex flex-col items-end justify-between">
          <TitleText>1~{leverage}×</TitleText>
          <SecondText>Leverage</SecondText>
        </div>
        <div className="flex flex-col items-end justify-between">
          {!poolAPY || isPoolAPYLoading ? (
            <Skeleton className="h-5 w-[38px]" />
          ) : (
            <TitleText>{poolAPY}%</TitleText>
          )}
          <SecondText>APY</SecondText>
        </div>
      </div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="mt-[6px] flex rounded-xl border-2 border-black py-2 px-4 first:mt-0">
      <div className="mt-1 h-8 w-8">
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <div className="ml-3 flex flex-1 justify-between">
        <div className="flex flex-col space-y-[2px]">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
        <div className="flex flex-col items-end space-y-[2px]">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
        <div className="flex flex-col items-end space-y-[2px]">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  );
}

function TitleText({ children }: { children: React.ReactNode }) {
  return <div className="text-lg leading-[19px] text-black">{children}</div>;
}

function SecondText({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs leading-[18px] text-lightgray">{children}</div>
  );
}

function CircleFlag() {
  return (
    <div className="h-3 w-3 rounded-full border-2 border-black bg-yellow"></div>
  );
}
