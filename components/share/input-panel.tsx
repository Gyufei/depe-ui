import { useState } from "react";
import Image from "next/image";

import StrokeArrowIcon from "@/components/share/icons/stroke-arrow";
import { NumericalInput } from "@/components/share/numerical-input";
import { cn } from "@/lib/utils";

import { Arrow } from "@radix-ui/react-popover";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DialogGimp from "./dialog-gimp";
import PickUpTokenDialogContent from "./pick-up-token-dialog-content";
import { IToken } from "@/lib/types/token";
import { useTokens } from "@/lib/hooks/use-tokens";
import { Skeleton } from "../ui/skeleton";

function StableTokenSelectDisplay({
  token,
  setToken,
  className,
}: {
  token: IToken;
  setToken: (_t: IToken) => void;
  className?: string;
}) {
  const [popOpen, setPopOpen] = useState(false);
  const { marginTokens } = useTokens();

  const handleSelectToken = (t: IToken) => {
    setToken(t);
    setPopOpen(false);
  };

  return (
    <div
      className={cn(
        "flex h-full flex-col items-start justify-around space-y-3 py-4",
        className,
      )}
    >
      <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
        <PopoverTrigger>
          <div className="flex cursor-pointer items-center">
            <div className="pr-[4px] text-xl leading-6 text-black">
              {token.symbol}
            </div>
            <div className="flex h-6 w-6 items-center justify-center">
              <StrokeArrowIcon />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="flex w-[200px] flex-col items-stretch border-0 bg-white p-2 shadow-[0px_4px_8px_9px_rgba(14,4,62,0.08)]"
        >
          <Arrow className="fill-white" />
          {marginTokens?.map((t) => (
            <div
              key={t?.symbol}
              onClick={() => handleSelectToken(t)}
              className="flex h-12 cursor-pointer items-center rounded-xl px-2 text-sm text-black hover:bg-[#f5f6f7]"
            >
              {t?.symbol}
            </div>
          ))}
        </PopoverContent>
      </Popover>
      <Image
        width={24}
        height={24}
        src={token.logoURI}
        alt="select token"
        className="c-image-shadow"
      ></Image>
    </div>
  );
}

function TokenSelectDisplay({
  token,
  setToken,
  className,
}: {
  token: IToken;
  setToken: (_t: IToken) => void;
  className?: string;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { notMarginTokens, isLoading } = useTokens();

  const handleSelectToken = (t: IToken) => {
    setToken(t);
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={(isOpen) => setDialogOpen(isOpen)}>
      <DialogTrigger asChild>
        <div
          className={cn(
            "flex h-full flex-col items-start justify-around space-y-3 py-4",
            className,
          )}
        >
          <div className="flex cursor-pointer items-center">
            <div className="pr-[4px] text-xl leading-6 text-black">
              {token.symbol}
            </div>
            <div className="flex h-6 w-6 items-center justify-center">
              <StrokeArrowIcon />
            </div>
          </div>
          <Image
            width={24}
            height={24}
            src={token.logoURI}
            alt="select token"
            className="c-image-shadow"
          ></Image>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[400px] p-0 pb-6 md:w-[400px]">
        <DialogGimp />
        <DialogTitle className="px-6 pt-6">Pick up a Token</DialogTitle>
        <PickUpTokenDialogContent
          isLoading={isLoading}
          tokens={notMarginTokens || []}
          token={token}
          setToken={(t) => handleSelectToken(t)}
        />
      </DialogContent>
    </Dialog>
  );
}

function BalanceDisplay({
  setMax,
  balanceText = "Wallet Balance",
}: {
  setMax: (_v: string) => void;
  balanceText?: string;
}) {
  const balance = "1000";

  return (
    <div className="flex items-center justify-end">
      <div className="mr-4 flex items-center text-sm leading-5 text-lightgray">
        <div>{balanceText ? `${balanceText}:` : null}</div>
        <div className="ml-1">{balance}</div>
      </div>
      <button
        onClick={() => setMax(balance)}
        className="border-0 leading-5 text-accentblue"
      >
        Max
      </button>
    </div>
  );
}

export default function InputPanel({
  isStableToken = false,
  isActive,
  showToken = true,
  token,
  setToken,
  value,
  setValue,
  className,
  balanceText,
}: {
  isStableToken?: boolean;
  isActive?: boolean;
  showToken?: boolean;
  token: IToken | null;
  value: string;
  setToken: (_t: IToken) => void;
  setValue: (_v: string) => void;
  className?: string;
  balanceText?: string;
}) {
  return (
    <div
      data-state={isActive ? "active" : "inactive"}
      className={cn(
        "c-active-border flex h-[88px] rounded-xl border-2 px-4 transition-colors focus-within:bg-yellow",
        className,
      )}
    >
      {showToken &&
        (token ? (
          isStableToken ? (
            <StableTokenSelectDisplay
              className="mr-4"
              token={token}
              setToken={setToken}
            />
          ) : (
            <TokenSelectDisplay
              className="mr-4"
              token={token}
              setToken={setToken}
            />
          )
        ) : (
          <div className="flex h-full flex-col items-start justify-around space-y-3 py-4">
            <Skeleton className="mr-4 h-6 w-20" />
            <Skeleton className="mr-4 h-6 w-6 rounded-full" />
          </div>
        ))}
      <div className="flex flex-1 flex-col items-stretch justify-between py-3">
        <NumericalInput
          className="h-6 text-right"
          value={value}
          onUserInput={setValue}
          placeholder="0"
        />
        <BalanceDisplay balanceText={balanceText} setMax={setValue} />
      </div>
    </div>
  );
}
