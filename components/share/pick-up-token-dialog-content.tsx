import { useState } from "react";
import Image from "next/image";

import { Search } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { truncateAddr } from "@/lib/utils";

export default function PickUpTokenDialogContent() {
  const [token, setToken] = useState("ETH");

  const tokens = [
    {
      name: "ETH",
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      rate: "AA+",
      src: "/icons/dev/ETH.svg",
    },
    {
      name: "BTC",
      address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      rate: "AAA+",
      src: "/icons/dev/BTC.svg",
    },
    {
      name: "DOGE",
      address: "0xbA2aE424d960c26247Dd6c32edC70B295c744C43",
      rate: "AAA+",
      src: "/icons/dev/DOGE.svg",
    },
    {
      name: "BNB",
      address: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
      rate: "A+",
      src: "/icons/dev/BNB.svg",
    },
    {
      name: "BNB",
      address: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
      rate: "A+",
      src: "/icons/dev/BNB.svg",
    },
    {
      name: "BNB",
      address: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
      rate: "A+",
      src: "/icons/dev/BNB.svg",
    },
  ];

  return (
    <div className="flex flex-col items-stretch gap-y-4">
      <div className="mx-6 flex items-center rounded-xl border-2 border-black py-2 px-3 ">
        <div className="mr-1 flex h-6 w-6 items-center justify-center">
          <Search className="h-4 w-4 text-black" />
        </div>
        <input
          type="text"
          className="flex-1 "
          placeholder="Search for Symbol, Contract address"
        />
      </div>

      <div className="pl-6 pr-2">
        <ScrollArea className="h-[312px] pr-4">
          {tokens.map((t: Record<string, any>) => {
            return (
              <TokenRow
                token={t}
                key={t.name}
                isSelected={token === t.name}
                onClick={() => setToken(t.name)}
              />
            );
          })}
          <ScrollBar />
        </ScrollArea>
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
          src={token.src}
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
            <div className="ml-1 text-sm leading-[17px]">{token.rate}</div>
          </div>
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
