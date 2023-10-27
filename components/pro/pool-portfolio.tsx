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

export default function PoolPortfolio() {
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

  const handleGoFarming = () => {};

  const handleGoTrade = () => {};

  return (
    <div data-state="active" className="c-shadow-panel h-fit w-[574px]">
      <div className="c-font-title-65 text-xl leading-6 text-[#3d3d3d]">
        Portfolio
      </div>
      <div className="mt-4 flex flex-col border-b border-[#eee] pb-6">
        <div className="c-font-title-55 text-xl leading-[30px] text-[#3d3d3d]">
          Farming
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
          <OperatorIcon onClick={handleGoFarming} />
        </div>
      </div>

      <div className="mt-6">
        <div className="c-font-title-55 text-xl leading-[30px] text-[#3d3d3d]">
          Trading
        </div>

        <div className="mt-4 flex items-center justify-between">
          <PL
            isLoading={isPoolLoading || isPositionsLoading}
            amount={pnlAmount.formatted}
            percent={pnlPercent.formatted}
          />

          <OperatorIcon onClick={handleGoTrade} />
        </div>

        <div className="mt-4 flex items-center gap-x-[140px]">
          <DebtDisplay
            isLoading={isPoolLoading || isPositionsLoading}
            debt={debtAmount.formatted}
          />

          <MarginDisplay
            isLoading={isPoolLoading || isPositionsLoading}
            margin={marginAmount.formatted}
            baseToken={baseToken}
          />
        </div>
      </div>
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
      <LabelText>Current Providing</LabelText>
      <div className="flex items-center">
        {isLoading ? (
          <>
            <ValueSkeleton />
            <Skeleton className="ml-[6px] h-5 w-5 rounded-full" />
          </>
        ) : (
          <>
            <ValueText>{currProviding || "0"}</ValueText>
            <Image
              width={20}
              height={20}
              src={baseToken?.logoURI || ""}
              alt="token"
              className="c-image-shadow ml-[6px]"
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

function DebtDisplay({
  isLoading,
  debt,
}: {
  isLoading: boolean;
  debt: string | null;
}) {
  return (
    <div className="flex flex-col">
      <LabelText>Position Debt</LabelText>
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
              className="c-image-shadow ml-[6px]"
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

function LabelText({ children }: { children: React.ReactNode }) {
  return (
    <div className="c-font-title-55 leading-6 text-lightgray">{children}</div>
  );
}

function ValueText({ children }: { children: React.ReactNode }) {
  return (
    <div className="c-font-text-55 text-[28px] leading-[42px] text-black">
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
