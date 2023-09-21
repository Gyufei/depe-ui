import { useEffect, useState } from "react";
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
import { Skeleton } from "../ui/skeleton";
import { useAccount, useBalance } from "wagmi";
import { formatNum } from "@/lib/format/number";

export default function InputPanel({
  isActive = true,
  showToken = true,
  isLoading = false,
  isJustToken = false,
  isStableToken = false,
  tokens = [],
  setToken = () => {},
  balance = "",
  balanceText = "",
  token,
  value,
  setValue,
  className,
}: {
  token: IToken | null;
  value: string;
  setValue: (_v: string) => void;
  setToken?: (_t: IToken) => void;
  className?: string;
  balanceText?: string;
  isLoading?: boolean;
  isActive?: boolean;
  balance?: string | null;
  isJustToken?: boolean;
  isStableToken?: boolean;
  tokens?: Array<IToken>;
  showToken?: boolean;
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
          isJustToken ? (
            <JustTokenDisplay className="mr-4" token={token} />
          ) : isStableToken ? (
            <StableTokenSelectDisplay
              className="mr-4"
              tokens={tokens}
              token={token}
              setToken={setToken}
            />
          ) : (
            <TokenSelectDisplay
              className="mr-4"
              isLoading={isLoading}
              tokens={tokens}
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
        <BalanceDisplay
          balance={balance}
          balanceToken={token || undefined}
          balanceText={balanceText}
          setMax={setValue}
        />
      </div>
    </div>
  );
}

function JustTokenDisplay({
  token,
  className,
}: {
  token: IToken;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col items-start justify-around space-y-3 py-4",
        className,
      )}
    >
      <div className="flex items-center text-xl leading-6 text-black">
        {token.symbol}
      </div>
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

function StableTokenSelectDisplay({
  tokens,
  token,
  setToken,
  className,
}: {
  tokens: Array<IToken>;
  token: IToken;
  setToken: (_t: IToken) => void;
  className?: string;
}) {
  const [popOpen, setPopOpen] = useState(false);

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
          {tokens.map((t) => (
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
  isLoading,
  token,
  tokens,
  setToken,
  className,
}: {
  isLoading: boolean;
  tokens: Array<IToken>;
  token: IToken;
  setToken: (_t: IToken) => void;
  className?: string;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);

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
          tokens={tokens}
          token={token}
          setToken={(t) => handleSelectToken(t)}
        />
      </DialogContent>
    </Dialog>
  );
}

function BalanceDisplay({
  balance,
  balanceToken,
  balanceText = "Wallet Balance",
  setMax,
}: {
  balance?: string | null;
  balanceToken?: IToken;
  setMax: (_v: string) => void;
  balanceText?: string;
}) {
  const [balanceNum, setBalanceNum] = useState("0");

  const { address: account } = useAccount();
  const { data: balanceRes, isLoading } = useBalance({
    address: account,
    token: balanceToken?.address,
    enabled: !!(!balance && balanceToken),
  });

  useEffect(() => {
    if (!balance && balanceRes?.formatted) {
      setBalanceNum(balanceRes?.formatted);
      return;
    }

    if (balance) {
      setBalanceNum(balance);
      return;
    }
  }, [balance, balanceRes?.formatted]);

  const handleMax = () => {
    if (isLoading || !balanceNum) return;
    setMax(balanceNum);
  };

  return (
    <div className="flex items-center justify-end">
      <div className="mr-4 flex items-center text-sm leading-5 text-lightgray">
        <div>{balanceText ? `${balanceText}:` : null}</div>
        {isLoading ? (
          <Skeleton className="ml-1 h-4 w-10" />
        ) : (
          <div className="ml-1">{formatNum(balanceNum || 0)}</div>
        )}
      </div>
      <button
        onClick={handleMax}
        className="border-0 leading-5 text-accentblue"
      >
        Max
      </button>
    </div>
  );
}
