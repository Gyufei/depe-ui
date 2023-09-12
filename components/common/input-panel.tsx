import { useState } from "react";
import Image from "next/image";

import StrokeArrowIcon from "@/components/common/icons/stroke-arrow";
import { NumericalInput } from "@/components/common/numerical-input";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DialogGimp from "./dialog-gimp";
import PickUpTokenDialogContent from "./pick-up-token-dialog-content";

function TokenSelectDisplay({
  token,
  className,
}: {
  token: string;
  className?: string;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);

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
            <div className="pr-[4px] text-xl leading-6 text-black">{token}</div>
            <div className="flex h-6 w-6 items-center justify-center">
              <StrokeArrowIcon />
            </div>
          </div>
          <Image
            width={24}
            height={24}
            src={`/icons/dev/${token}.svg`}
            alt="select token"
            className="c-image-shadow"
          ></Image>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[400px] p-0 pb-6 md:w-[400px]">
        <DialogGimp />
        <DialogTitle className="px-6 pt-6">Pick up a Token</DialogTitle>
        <PickUpTokenDialogContent />
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
  isActive,
  showToken = true,
  token,
  value,
  setValue,
  className,
  balanceText,
}: {
  isActive?: boolean;
  showToken?: boolean;
  token: string;
  value: string;
  setToken: (_t: string) => void;
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
      {showToken && <TokenSelectDisplay className="mr-4" token={token} />}
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
