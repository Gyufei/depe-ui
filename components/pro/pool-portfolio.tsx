import { useAtomValue } from "jotai";
import Image from "next/image";

import { usePool } from "@/lib/hooks/api/use-pool";
import { PDPoolIdAtom } from "@/lib/states/poolDetail";
import { usePendingReward } from "@/lib/hooks/contract/use-pending-reward";
import { Skeleton } from "../ui/skeleton";
import { usePoolAPY } from "@/lib/hooks/api/use-pool-apy";
import { usePoolParsedAsset } from "@/lib/hooks/use-pool-parsed-asset";
import { usePositions } from "@/lib/hooks/api/use-positions";
import { useMemo, useState } from "react";
import { usePositionFormat } from "@/lib/hooks/use-position-format";
import { ProfitText } from "../share/profit-text";
import { IToken } from "@/lib/types/token";

import OperatorInIcon from "/public/icons/operator-in.svg";
import OperatorInHoverIcon from "/public/icons/operator-in-hover.svg";
import { useMediaQuery } from "@/lib/hooks/common/use-media-query";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DialogGimp from "../share/dialog-gimp";
import ProPoolDialogContent from "./pro-pool-dialog-content";

export default function PoolPortfolio() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const poolId = useAtomValue(PDPoolIdAtom);

  const { data: pool, isLoading: isPoolLoading } = usePool({
    poolId,
  });

  const { data: poolAPY, isLoading: isPoolAPYLoading } = usePoolAPY(
    pool?.poolAddr || null,
  );

  const { data: pendingReward, isLoading: pendingRewardLoading } =
    usePendingReward(pool);

  const { data: assetData, isLoading: isAssetLoading } =
    usePoolParsedAsset(pool);

  const { data: positions, isLoading: isPositionsLoading } = usePositions();

  const poolPositions = useMemo(() => {
    if (!pool || !positions.length) return [];

    const pp = positions.filter((position) => {
      return position.dpPoolAddr === pool?.poolAddr;
    });

    return pp;
  }, [pool, positions]);

  const tradePositions = useMemo(() => {
    return poolPositions[0];
  }, [poolPositions]);

  const { baseToken, marginAmount, pnlAmount, pnlPercent, debtAmount } =
    usePositionFormat(tradePositions, pool);

  const [showPoolTrade, setShowPoolTrade] = useState(false);

  const handleGoFarming = () => {
    setShowPoolTrade(true);
  };

  return (
    <div
      data-state="active"
      className="c-shadow-panel h-fit w-[calc(100vw-52px)]  md:w-[574px]"
    >
      {!showPoolTrade ? (
        <>
          <div className="c-font-title-65 text-lg leading-6 text-[#3d3d3d] md:text-xl">
            Portfolio
          </div>
          <div className="mt-4 flex flex-col border-b border-[#eee] pb-6">
            <div className="flex justify-between">
              <div className="c-font-title-55 text-base leading-[30px] text-[#3d3d3d] md:text-xl">
                Farming
              </div>
              {!isDesktop && <OperatorIcon onClick={handleGoFarming} />}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-x-10">
                <Rewards
                  isLoading={isPoolLoading || pendingRewardLoading}
                  reward={pendingReward.formatted || ""}
                ></Rewards>
                <APYDisplay
                  isLoading={!poolAPY || isPoolAPYLoading}
                  apy={poolAPY}
                />
                <CurrentProviding
                  isLoading={isPoolLoading || isAssetLoading}
                  currProviding={assetData.value || ""}
                  baseToken={baseToken}
                />
              </div>
              {isDesktop && <OperatorIcon onClick={handleGoFarming} />}
            </div>
          </div>

          <div className="mt-6">
            <div className="c-font-title-55 text-xl leading-[30px] text-[#3d3d3d]">
              Trading
            </div>

            <div className="mt-4 flex items-center justify-between">
              <PL
                isLoading={isPoolLoading || isPositionsLoading}
                amount={pnlAmount.formatted || ""}
                percent={pnlPercent.formatted || ""}
              />

              <DebtDisplay
                isLoading={isPoolLoading || isPositionsLoading}
                debt={debtAmount.formatted || ""}
              />
            </div>

            <div className="mt-4 flex items-center justify-between md:gap-x-[140px]">
              <NotionalValue
                isLoading={isPoolLoading || isPositionsLoading}
                debt={debtAmount.formatted || ""}
              />

              <MarginDisplay
                isLoading={isPoolLoading || isPositionsLoading}
                margin={marginAmount.formatted || ""}
                baseToken={baseToken}
              />
            </div>
          </div>
        </>
      ) : (
        <ProPoolDialogContent
          pool={pool}
          asset={{
            data: assetData,
            isLoading: isAssetLoading,
          }}
        />
      )}
    </div>
  );
}

function Rewards({
  isLoading,
  reward,
}: {
  isLoading: boolean;
  reward: string;
}) {
  return (
    <div className="flex flex-col">
      <LabelText>Rewards</LabelText>
      {isLoading ? (
        <ValueSkeleton />
      ) : (
        <ValueText>
          <span className="text-green">+{reward || 0}</span>
        </ValueText>
      )}
    </div>
  );
}

function APYDisplay({
  isLoading,
  apy,
}: {
  isLoading: boolean;
  apy: string | null;
}) {
  return (
    <div className="flex flex-col">
      <LabelText>APY</LabelText>
      {isLoading ? (
        <ValueSkeleton />
      ) : (
        <ValueText>
          <APYText apy={apy} />
        </ValueText>
      )}
    </div>
  );
}

function CurrentProviding({
  isLoading,
  currProviding,
  baseToken,
}: {
  isLoading: boolean;
  currProviding: string;
  baseToken: IToken | null;
}) {
  return (
    <div className="flex flex-col">
      <LabelText>
        <span className="text-xs">Current Providing</span>
      </LabelText>
      <div className="flex items-center">
        {isLoading ? (
          <>
            <ValueSkeleton />
            <Skeleton className="ml-[6px] hidden h-5 w-5 rounded-full md:block" />
          </>
        ) : (
          <>
            <ValueText>{currProviding || "0"}</ValueText>
            <Image
              width={20}
              height={20}
              src={baseToken?.logoURI || ""}
              alt="token"
              className="c-image-shadow ml-[6px] hidden md:block"
            ></Image>
          </>
        )}
      </div>
    </div>
  );
}

function PL({
  isLoading,
  amount,
  percent,
}: {
  isLoading: boolean;
  amount: string | null;
  percent: string | null;
}) {
  return (
    <div className="flex flex-col">
      <LabelText>P/L</LabelText>
      <ValueText>
        {isLoading ? (
          <ValueSkeleton />
        ) : (
          <PnlText amount={amount} percent={percent} />
        )}
      </ValueText>
    </div>
  );
}

function NotionalValue({
  isLoading,
  debt,
}: {
  isLoading: boolean;
  debt: string | null;
}) {
  return (
    <div className="flex flex-col">
      <LabelText>Position Notional Value</LabelText>
      <ValueText>{isLoading ? <ValueSkeleton /> : `$${debt}`}</ValueText>
    </div>
  );
}

function DebtDisplay({
  isLoading,
  debt,
}: {
  isLoading: boolean;
  debt: string | null;
}) {
  return (
    <div className="flex flex-col">
      <LabelText>Total Debt</LabelText>
      <ValueText>{isLoading ? <ValueSkeleton /> : `$${debt}`}</ValueText>
    </div>
  );
}

function MarginDisplay({
  isLoading,
  margin,
  baseToken,
}: {
  isLoading: boolean;
  margin: string | null;
  baseToken: IToken | null;
}) {
  return (
    <div className="flex flex-col">
      <LabelText>Margin</LabelText>
      <div className="flex items-center">
        {isLoading ? (
          <>
            <ValueSkeleton />
            <Skeleton className="ml-[6px] h-5 w-5 rounded-full" />
          </>
        ) : (
          <>
            <ValueText> {margin} </ValueText>
            <Image
              width={20}
              height={20}
              src={baseToken?.logoURI || ""}
              alt="token"
              className="c-image-shadow ml-[6px] hidden md:block"
            ></Image>
          </>
        )}
      </div>
    </div>
  );
}

function OperatorIcon({ onClick }: { onClick: () => void }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="flex cursor-pointer items-center justify-center"
      onClick={() => onClick()}
    >
      {isHover ? (
        <Image
          src={OperatorInHoverIcon}
          width={32}
          height={32}
          alt="operator"
        />
      ) : (
        <Image src={OperatorInIcon} width={32} height={32} alt="operator" />
      )}
    </div>
  );
}

function PoolDialogBtn() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={(isOpen) => setDialogOpen(isOpen)}>
      <DialogTrigger asChild>
        <OperatorIcon onClick={() => setDialogOpen(true)} />
      </DialogTrigger>
      <DialogContent className="w-[calc(100vw-52px)] md:w-[400px]">
        <DialogGimp />
        <DialogTitle>Farming</DialogTitle>
      </DialogContent>
    </Dialog>
  );
}

function LabelText({ children }: { children: React.ReactNode }) {
  return (
    <div className="c-font-title-55 text-sm leading-6 text-lightgray md:text-base">
      {children}
    </div>
  );
}

function ValueText({ children }: { children: React.ReactNode }) {
  return (
    <div className="c-font-text-55 text-xl leading-[30px] text-black md:text-[28px] md:leading-[42px]">
      {children}
    </div>
  );
}

function ValueSkeleton() {
  return <Skeleton className="my-[7px] h-[28px] w-[100px]" />;
}

export function APYText({ apy }: { apy: string | null }) {
  const isGtZero = apy && Number(apy) > 0;

  return (
    <ProfitText isGtZero={!!isGtZero}>
      {isGtZero ? "+" : ""}
      {apy}%
    </ProfitText>
  );
}

function PnlText({
  amount,
  percent,
}: {
  amount: string | null;
  percent: string | null;
}) {
  const isGtZero = amount && Number(amount) > 0;

  return (
    <ProfitText isGtZero={!!isGtZero}>
      {amount && (
        <>
          {isGtZero ? "+" : ""}
          {amount}
        </>
      )}{" "}
      {percent && (
        <>
          ({isGtZero ? "+" : ""}
          {percent}%)
        </>
      )}
    </ProfitText>
  );
}
