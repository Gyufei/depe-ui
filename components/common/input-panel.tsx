import Image from "next/image";
import StrokeArrowIcon from "/public/icons/stroke-arrow.svg";
import { NumericalInput } from "@/components/common/numerical-input";
import { cn } from "@/lib/utils";

function TokenSelectDisplay({ token }: { token: string }) {
  return (
    <div className="flex h-full flex-col items-start justify-around space-y-3 py-4">
      <div className="flex cursor-pointer items-center">
        <div className="text-xl leading-6 text-black">{token}</div>
        <div className="flex h-6 w-6 items-center justify-center">
          <Image
            width={12}
            height={6}
            src={StrokeArrowIcon}
            alt="select token"
            className="ml-4"
          ></Image>
        </div>
      </div>
      <Image
        width={24}
        height={24}
        src={`/icons/dev/${token}.svg`}
        alt="select token"
      ></Image>
    </div>
  );
}

function BalanceDisplay() {
  return (
    <div className="flex items-center justify-end">
      <div className="mr-4 flex items-center text-sm leading-5 text-lightgray">
        <div>Wallet Balance:</div>
        <div className="ml-1">1000</div>
      </div>
      <button className="border-0 leading-5 text-accentblue">Max</button>
    </div>
  );
}

export default function InputPanel({
  token,
  value,
  setValue,
  className,
}: {
  token: string;
  value: string;
  setToken: (_t: string) => void;
  setValue: (_v: string) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-[88px] rounded-xl border-2 border-black px-4 transition-colors focus-within:bg-yellow",
        className,
      )}
    >
      <TokenSelectDisplay token={token} />
      <div className="ml-4 flex flex-1 flex-col items-stretch justify-between py-3">
        <NumericalInput
          className="h-6 text-right"
          value={value}
          onUserInput={setValue}
          placeholder="0"
        />
        <BalanceDisplay />
      </div>
    </div>
  );
}
