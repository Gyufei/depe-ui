import { useMemo, useState } from "react";
import Image from "next/image";
import { Arrow } from "@radix-ui/react-popover";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Triangle from "/public/icons/triangle.svg";
import { Search } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import TokenPairImage from "./token-pair-image";
import type { IPool } from "@/lib/types/pool";

import { Skeleton } from "../ui/skeleton";
import { range } from "lodash";
import Empty from "./empty";
import usePools from "@/lib/hooks/use-pools";
import { useTokensInfo } from "@/lib/hooks/use-token-info";
import usePoolsAPY, { IPoolAPY } from "@/lib/hooks/use-pools-apy";

export default function SelectPoolDialogContent() {
  const [isAuto, setIsAuto] = useState(false);
  const [sortBy, setSortBy] = useState("Num");
  const [searchStr, setSearchStr] = useState("");
  const [activePool, setActivePool] = useState<IPool | null>(null);

  const { pools, isLoading } = usePools();
  const { poolAPYs } = usePoolsAPY(pools);

  const filteredPools = useMemo<Array<IPool>>((): Array<IPool> => {
    if (!pools) return [];

    let sortedPools = pools;

    if (sortBy === "Num") {
      sortedPools = pools.sort((a, b) => Number(a.poolId) - Number(b.poolId));
    } else if (sortBy === "APY") {
      sortedPools = pools.sort((a, b) => {
        const aAPY = poolAPYs[a.poolId].value || 0;
        const bAPY = poolAPYs[b.poolId].value || 0;
        return aAPY - bAPY;
      });
    } else if (sortBy === "Leverage") {
      sortedPools = pools.sort(
        (a, b) => Number(a.maxleverage) - Number(b.maxleverage),
      );
    }

    let fPools = sortedPools;
    if (!searchStr) {
      return fPools;
    } else {
      fPools = sortedPools.filter((p) => {
        return p.poolId.toString().includes(searchStr);
      });
    }

    return fPools;
  }, [sortBy, searchStr, pools]);

  const handleAuto = () => {
    if (isAuto) return;

    setActivePool(null);
    setIsAuto(true);
  };

  const handleSelectPool = (pool: IPool) => {
    setIsAuto(false);
    setActivePool(pool);
  };

  return (
    <>
      <div
        onClick={handleAuto}
        data-check={isAuto ? "true" : "false"}
        className="mx-6 cursor-pointer rounded-xl border-2 border-black bg-white px-4 py-[16px] text-sm leading-5 data-[check=true]:bg-blue"
      >
        Automatch
      </div>

      <div className="mt-1">
        <div className="flex items-center justify-between px-6">
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
              <SortPopRow onClick={() => setSortBy("Num")} text="Num" />
              <SortPopRow onClick={() => setSortBy("APY")} text="APY" />
              <SortPopRow
                onClick={() => setSortBy("Leverage")}
                text="Leverage"
              />
            </PopoverContent>
          </Popover>

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
        </div>

        <div className="mt-3 pl-6 pr-2">
          {isLoading && (
            <div className="h-[312px] pr-4">
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
            <ScrollArea className="h-[312px] pr-4">
              {filteredPools.map((p) => (
                <PoolRow
                  key={p.poolId}
                  pool={p}
                  poolAPY={poolAPYs[p.poolId]}
                  isSelected={activePool?.poolId === p.poolId}
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
      className="flex h-8 cursor-pointer items-center rounded-xl px-4 text-sm text-black hover:bg-[#f5f6f7]"
    >
      {text}
    </div>
  );
}

function PoolRow({
  pool,
  isSelected,
  poolAPY,
  onClick,
}: {
  pool: IPool;
  poolAPY: IPoolAPY;
  isSelected: boolean;
  onClick: () => void;
}) {
  const [baseToken, quoteToken] = useTokensInfo([
    pool.baseToken,
    pool.quoteToken,
  ]);

  console.log(baseToken, quoteToken);

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
      <div className="ml-3 flex flex-1 items-center justify-between">
        <div className="flex flex-col justify-between">
          <TitleText text={`# ${pool.poolId}`} />
          <SecondText text={quoteToken?.symbol} />
        </div>
        <div className="flex flex-col items-end justify-between">
          <TitleText text={`1~${pool.maxleverage}×`} />
          <SecondText text="Leverage" />
        </div>
        <div className="flex flex-col items-end justify-between">
          {poolAPY?.isLoading ? (
            <Skeleton className="h-5 w-[38px]" />
          ) : (
            <TitleText text={`${poolAPY.value}%`} />
          )}
          <SecondText text="APY" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonRow() {
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

function TitleText({ text = "" }: { text: string | undefined }) {
  return <div className="text-lg leading-[19px] text-black">{text}</div>;
}

function SecondText({ text = "" }: { text: string | undefined }) {
  return <div className="text-xs leading-[18px] text-lightgray">{text}</div>;
}