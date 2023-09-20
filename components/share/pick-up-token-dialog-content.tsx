import Image from "next/image";
import { Search } from "lucide-react";
import { range } from "lodash";

import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { truncateAddr } from "@/lib/utils";
import { IToken } from "@/lib/types/token";
import { Skeleton } from "../ui/skeleton";
import { useMemo, useState } from "react";

export default function PickUpTokenDialogContent({
  isLoading,
  tokens,
  token,
  setToken,
}: {
  isLoading: boolean;
  tokens: IToken[];
  token: IToken;
  setToken: (_t: IToken) => void;
}) {
  const [searchStr, setSearchStr] = useState("");

  const filteredTokens = useMemo(() => {
    if (isLoading) return [];
    if (!searchStr) return tokens;

    return tokens.filter((t) => {
      return (
        t.name.toLowerCase().includes(searchStr.toLowerCase()) ||
        t.symbol.toLowerCase().includes(searchStr.toLowerCase()) ||
        t.address.toLowerCase().includes(searchStr.toLowerCase())
      );
    });
  }, [tokens, searchStr]);

  return (
    <div className="flex flex-col items-stretch gap-y-4">
      <div className="mx-6 flex items-center rounded-xl border-2 border-black py-2 px-3 ">
        <div className="mr-1 flex h-6 w-6 items-center justify-center">
          <Search className="h-4 w-4 text-black" />
        </div>
        <input
          value={searchStr}
          onChange={(e) => setSearchStr(e.target.value)}
          type="text"
          className="flex-1 "
          placeholder="Search for Symbol, Contract address"
        />
      </div>

      <div className="pl-6 pr-2">
        {isLoading ? (
          range(5).map((i) => <SkeletonRow key={i} />)
        ) : (
          <ScrollArea className="h-[312px] pr-4">
            {filteredTokens.map((t) => {
              return (
                <TokenRow
                  token={t}
                  key={t.name}
                  isSelected={token.symbol === t.symbol}
                  onClick={() => setToken(t)}
                />
              );
            })}
            <ScrollBar />
          </ScrollArea>
        )}
      </div>
    </div>
  );
}

function TokenRow({
  token,
  isSelected,
  onClick,
}: {
  token: Record<string, any>;
  isSelected: boolean;
  onClick: () => void;
}) {
  const shortAddress = truncateAddr(token.address, { nPrefix: 8, nSuffix: 6 });
  return (
    <div
      onClick={onClick}
      data-check={isSelected ? "true" : "false"}
      className="mt-[5px] flex cursor-pointer items-center rounded-xl border-2 border-black py-2 px-4 first:mt-0 data-[check=true]:bg-blue"
    >
      <div className="flex items-center">
        <Image
          width={24}
          height={24}
          src={token.logoURI}
          alt="token"
          className="c-image-shadow"
        ></Image>
      </div>
      <div className="ml-3 flex flex-1 justify-between">
        <div className="flex flex-col">
          <TitleText text={token.name} />
          <SecondText text={shortAddress || ""} />
        </div>
        <div className="flex items-center">
          <div className="flex h-6 w-[72px] items-center justify-center rounded bg-[#DFE7F3]">
            <Image
              width={16}
              height={16}
              src="/icons/flag.svg"
              alt="flag"
            ></Image>
            <div className="ml-1 text-sm leading-[17px]">
              {token?.rate || "AA+"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="mt-[5px] flex cursor-pointer items-center rounded-xl border-2 border-black py-2 px-4 first:mt-0">
      <div className="flex items-center">
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>
      <div className="ml-3 flex flex-1 justify-between">
        <div className="flex flex-col">
          <Skeleton className="mb-1 h-5 w-20" />
          <Skeleton className="h-[14px] w-20" />
        </div>
        <div className="flex items-center">
          <Skeleton className="h-6 w-[72px] rounded-full" />
        </div>
      </div>
    </div>
  );
}

function TitleText({ text }: { text: string }) {
  return <div className="text-sm leading-5 text-black">{text}</div>;
}

function SecondText({ text }: { text: string }) {
  return <div className="text-xs leading-[18px] text-lightgray">{text}</div>;
}
