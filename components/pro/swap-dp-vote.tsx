import Image from "next/image";
import PanelLeaderButton from "../share/panel-leader-button";
import { useState } from "react";
import InputPanel from "../share/input-panel";
import { StableTokenSelectDisplay } from "../share/input-panel-token-display";
import { useTokens } from "@/lib/hooks/api/use-tokens";
import { IToken } from "@/lib/types/token";
import BalanceDisplay from "../share/balance-display";
import { Skeleton } from "../ui/skeleton";
import Triangle from "/public/icons/triangle.svg";

export default function SwapDpVote() {
  const [isBuy, setIsBuy] = useState(false);

  const handleClickArrow = () => {
    setIsBuy(!isBuy);
  };

  return (
    <>
      <PanelLeaderButton
        className={`${isBuy ? "bg-brown" : "bg-sea"}`}
        defaultActive={true}
      >
        <div className="flex items-center gap-x-4">
          <div className="flex items-center">
            <div>{isBuy ? "Buy" : "Sell"}</div>
            <Image
              src="/icons/arrow-down.svg"
              width={20}
              height={20}
              alt="arrow"
            />
            <div>dpVote</div>
          </div>
        </div>
      </PanelLeaderButton>

      <div
        data-state={"active"}
        className="c-shadow-panel w-[calc(100w-52px)]  md:w-[774px]"
      >
        <div className="relative flex flex-col items-center justify-between md:flex-row">
          <BaseInput />
          <SwapArrow handleClick={handleClickArrow} />
          <DpVoteInput />
        </div>

        <div className="mt-4 flex items-center justify-between gap-x-3">
          {!isBuy && <BundleSelect />}
          <ConfirmBtn />
        </div>
      </div>
    </>
  );
}

function BaseInput() {
  const { marginTokens, isLoading: isTokenLoading } = useTokens();
  const baseToken = marginTokens?.[0];
  const onTokenSelected = (t: IToken) => {
    console.log(t);
  };

  const isBalanceLoading = false;
  const baseTokenBalance = 0;
  const handleValueChange = (value: string) => {
    setBaseTokenAmount(value);
  };

  const [baseTokenAmount, setBaseTokenAmount] = useState("");

  return (
    <InputPanel
      className="w-full md:w-[355px]"
      tokenDisplay={
        <StableTokenSelectDisplay
          isLoading={isTokenLoading}
          tokens={marginTokens || []}
          token={baseToken!}
          setToken={onTokenSelected}
        />
      }
      balanceDisplay={
        <BalanceDisplay
          isLoading={isBalanceLoading}
          balance={baseTokenBalance || null}
          prefixText="Balance"
          setMax={() => handleValueChange("")}
        />
      }
      isActive={true}
      value={baseTokenAmount || ""}
      setValue={handleValueChange}
    />
  );
}

function DpVoteInput() {
  const [dpVoteValue, setDpVoteValue] = useState("");
  return (
    <InputPanel
      className="w-full md:w-[355px]"
      tokenDisplay={<DpVoteToken />}
      balanceDisplay={<></>}
      isActive={true}
      value={dpVoteValue}
      setValue={setDpVoteValue}
    />
  );
}

function DpVoteToken() {
  return (
    <div className="flex h-full flex-col items-start justify-around space-y-3 py-4">
      <div className="flex items-center text-xl leading-6 text-black">
        dpVote
      </div>
      <Image
        width={24}
        height={24}
        src="/icons/dp-vote.svg"
        alt="dp-vote"
      ></Image>
    </div>
  );
}

function SwapArrow({ handleClick }: { handleClick: () => void }) {
  return (
    <div
      onClick={handleClick}
      className="z-10 -my-3 h-10 w-10 rounded-lg border-2 border-black bg-white p-3 md:-mx-3 md:h-12 md:w-12"
    >
      <Image
        width={24}
        height={24}
        src="/icons/arrow-right.svg"
        alt="dp-vote"
      ></Image>
    </div>
  );
}

function BundleSelect() {
  const isLoading = false;

  return (
    <div className="flex cursor-pointer items-center rounded-xl border-2 border-black py-2 px-4 text-black md:rounded-full md:border md:px-[10px] md:py-[1px]">
      {isLoading ? (
        <>
          <Skeleton className="my-[3px] ml-1 mr-[14px] hidden h-4 w-[40px] md:block" />
          <Skeleton className="hidden h-[8px] w-[14px] md:block" />
        </>
      ) : (
        <>
          <div className="ml-1 mr-[10px] hidden leading-[22px] md:block">
            Bundle #1
          </div>
          <Image
            width={14}
            height={8}
            src={Triangle}
            alt="triangle"
            className="hidden -rotate-90 md:block"
          ></Image>
          <div className="flex flex-col justify-between md:hidden">
            <div className="leading-5 text-black">#1</div>
            <div className="text-xs leading-4 text-gray">Bundle</div>
          </div>
        </>
      )}
    </div>
  );
}

function ConfirmBtn() {
  return (
    <div className="z-1 relative flex h-14 flex-1 cursor-pointer items-center justify-center rounded-xl border-black bg-black px-4 py-2 leading-6 md:-right-[55px] md:h-auto md:flex-none md:justify-between md:border-2 md:bg-white md:text-black">
      <div className="font-title text-xl font-semibold text-yellow md:mr-3 md:text-[#3d3d3d]">
        Confirm
      </div>
      <Image
        width={24}
        height={24}
        src="/icons/big-arrow-right.svg"
        alt="back"
        className="hidden md:block"
      ></Image>
    </div>
  );
}
