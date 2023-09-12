import { useState } from "react";
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

export default function SelectPoolDialogContent() {
  const [isAuto, setIsAuto] = useState(false);
  const [sortBy, setSortBy] = useState("Num");
  const [activePool, setActivePool] = useState<number | null>(null);

  const handleAuto = () => {
    if (isAuto) return;

    setActivePool(null);
    setIsAuto(true);
  };

  const handleSelectPool = (i: number) => {
    setIsAuto(false);
    setActivePool(i);
  };

  return (
    <>
      <div
        onClick={handleAuto}
        data-check={isAuto ? "true" : "false"}
        className="mx-6 cursor-pointer rounded-xl border-2 border-black bg-white px-4 py-[18px] text-sm leading-5 data-[check=true]:bg-blue"
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
              <OperationPopRow onClick={() => setSortBy("Num")} text="Num" />
              <OperationPopRow onClick={() => setSortBy("APY")} text="APY" />
              <OperationPopRow
                onClick={() => setSortBy("Leverage")}
                text="Leverage"
              />
            </PopoverContent>
          </Popover>

          <div className="flex items-center border-b border-lightgray">
            <input
              type="text"
              className="w-[100px] border-0"
              placeholder="Search"
            />
            <Search className="h-4 w-4 cursor-pointer text-lightgray" />
          </div>
        </div>

        <div className="mt-3 pl-6 pr-2">
          <ScrollArea className="h-[312px] pr-4">
            {[1, 2, 3, 4, 5, 6].map((i: number) => {
              return (
                <PoolRow
                  key={i}
                  isSelected={activePool === i}
                  onClick={() => handleSelectPool(i)}
                />
              );
            })}
            <ScrollBar />
          </ScrollArea>
        </div>
      </div>
    </>
  );
}

export function OperationPopRow({
  onClick,
  text,
}: {
  onClick: () => void;
  text: string;
}) {
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
  isSelected,
  onClick,
}: {
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      data-check={isSelected ? "true" : "false"}
      className="mt-[6px] flex cursor-pointer rounded-xl border-2 border-black py-2 px-4 first:mt-0 data-[check=true]:bg-blue"
    >
      <TokenPairImage className="mt-1" />
      <div className="ml-3 flex flex-1 justify-between">
        <div className="flex flex-col">
          <TitleText text="# 301" />
          <SecondText text="DOGE" />
        </div>
        <div className="flex flex-col items-end">
          <TitleText text="1~15×" />
          <SecondText text="Leverage" />
        </div>
        <div className="flex flex-col items-end">
          <TitleText text="100%" />
          <SecondText text="APY" />
        </div>
      </div>
    </div>
  );
}

function TitleText({ text }: { text: string }) {
  return <div className="text-lg leading-[19px] text-black">{text}</div>;
}

function SecondText({ text }: { text: string }) {
  return <div className="text-xs leading-[18px] text-lightgray">{text}</div>;
}
