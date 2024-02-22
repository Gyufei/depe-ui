import Image from "next/image";
import { useAtomValue } from "jotai";

import { usePool } from "@/lib/hooks/api/use-pool";
import { PDPoolIdAtom } from "@/lib/states/poolDetail";
import { cn } from "@/lib/utils/common";
import { truncateAddr } from "@/lib/utils/web3";
import { Skeleton } from "../ui/skeleton";

import TipIcon from "/public/icons/tip.svg";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePoolFormat } from "@/lib/hooks/use-pool-format";
import { formatNum } from "@/lib/utils/number";
import { useTimeZone } from "@/lib/hooks/common/use-timezone";
import { useMemo } from "react";
import { format } from "date-fns";

export default function PoolDetail() {
  const poolId = useAtomValue(PDPoolIdAtom);
  const { data: pool, isLoading: isPoolLoading } = usePool({
    poolId,
  });

  const { leverage, endTime } = usePoolFormat(pool);
  const { tz } = useTimeZone();

  const shorterCreator = truncateAddr(pool?.creator || "");

  const totalLocked = {
    value: 1234,
    formatted: formatNum(1234),
  };

  const creatorRewards = {
    value: 3921,
    formatted: formatNum(3921),
  };

  const farmer = {
    value: 30001,
    formatted: formatNum(30001),
  };

  const endOnFormatted = useMemo(() => {
    if (!endTime) return "";
    return format(endTime, "MMM d, yyyy HH:mm");
  }, [endTime]);

  return (
    <div className="flex w-[calc(100vw-52px)] flex-col rounded-3xl bg-black/2 p-6 md:w-[574px]">
      <div className="c-font-title-65 text-xl leading-6 text-black">
        Pool Detail
      </div>
      <DetailRow
        className="mt-5 md:mt-8"
        label="Total Value Locked"
        isLoading={isPoolLoading}
      >
        ${totalLocked.formatted}
      </DetailRow>

      <DetailRow
        className="mt-5 md:mt-[47px]"
        label="Pool Creator"
        isLoading={isPoolLoading}
      >
        {shorterCreator}
      </DetailRow>

      <CreatorRewards isLoading={isPoolLoading} className="mt-5 md:mt-[47px]">
        ${creatorRewards.formatted}
      </CreatorRewards>

      <DetailRow
        className="mt-5 md:mt-[47px]"
        label="Farmers"
        isLoading={isPoolLoading}
      >
        {farmer.formatted}
      </DetailRow>

      <DetailRow
        className="mt-5 md:mt-[47px]"
        label="Max Leverage"
        isLoading={isPoolLoading}
      >
        1~{leverage}×
      </DetailRow>

      <DetailRow
        className="mt-5 md:mt-[47px]"
        label={`Ends on (${tz.text})`}
        isLoading={isPoolLoading}
      >
        {endOnFormatted}
      </DetailRow>
    </div>
  );
}

function DetailRow({
  label,
  children,
  className,
  isLoading,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex justify-between text-sm leading-[17px] text-black opacity-60 md:opacity-100",
        className,
      )}
    >
      <div>{label}</div>
      {isLoading ? (
        <Skeleton className="h-[14px] w-20" />
      ) : (
        <div className="c-font-text-65">{children}</div>
      )}
    </div>
  );
}

function CreatorRewards({
  children,
  className,
  isLoading,
}: {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex justify-between text-sm leading-[17px] text-black",
        className,
      )}
    >
      <div className="flex items-center">
        <span className="mr-1 text-black opacity-60 md:opacity-100">
          Pool Creator Rewards
        </span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Image src={TipIcon} width={16} height={16} alt="tip" />
            </TooltipTrigger>
            <TooltipContent>
              <p></p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {isLoading ? (
        <Skeleton className="h-[14px] w-20" />
      ) : (
        <div className="c-font-text-65">{children}</div>
      )}
    </div>
  );
}
