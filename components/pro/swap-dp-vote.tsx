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
  const [isBuy] = useState(false);

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

      <div data-state={"active"} className="c-shadow-panel w-[774px]">
        <div className="relative flex items-center justify-between">
          <BaseInput />
          <SwapArrow />
          <DpVoteInput />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <BundleSelect />
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
      className="w-[355px]"
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
          prefixText="Wallet Balance"
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
      className="w-[355px]"
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

function SwapArrow() {
  return (
    <div className="z-10 -mx-3 h-12 w-12 rounded-lg border-2 border-black bg-white p-3">
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
    <div className="flex cursor-pointer items-center rounded-full border border-black px-[10px] py-[1px] text-black">
      {isLoading ? (
        <>
          <Skeleton className="my-[3px] ml-1 mr-[14px] h-4 w-[40px]" />
          <Skeleton className="h-[8px] w-[14px]" />
        </>
      ) : (
        <>
          <div className="ml-1 mr-[10px] leading-[22px]">Bundle #1</div>
          <Image
            width={14}
            height={8}
            src={Triangle}
            alt="triangle"
            className="-rotate-90"
          ></Image>
        </>
      )}
    </div>
  );
}

function ConfirmBtn() {
  return (
    <div className="z-1 relative -right-[55px] flex cursor-pointer items-center justify-between rounded-xl border-2 border-black bg-white px-4 py-2 leading-6">
      <div className="mr-3 font-title text-xl font-semibold text-[#3d3d3d]">
        Confirm
      </div>
      <Image
        width={24}
        height={24}
        src="/icons/big-arrow-right.svg"
        alt="back"
      ></Image>
    </div>
  );
}
