import { forwardRef } from "react";
import { Skeleton } from "../../ui/skeleton";

export function TitleText({ children }: { children: React.ReactNode }) {
  return <div className="text-lg leading-7 text-black">{children}</div>;
}

export function SecondText({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs leading-[18px] text-lightgray">{children}</div>
  );
}

export function APYText({ apy }: { apy: string | null }) {
  const isGreaterThanZero = apy && Number(apy) > 0;

  return (
    <div
      data-state={isGreaterThanZero ? "positive" : "negative"}
      className="text-lg leading-7 data-[state=positive]:text-green data-[state=negative]:text-red"
    >
      {isGreaterThanZero ? "+" : ""}
      {apy}%
    </div>
  );
}

export const OperationPopRow = forwardRef(
  (
    { children, ...rest }: { children: React.ReactNode; [key: string]: any },
    ref: any,
  ) => (
    <div
      ref={ref}
      className="flex h-12 cursor-pointer items-center rounded-xl px-4 text-sm text-black hover:bg-[#f5f6f7]"
      {...rest}
    >
      {children}
    </div>
  ),
);

OperationPopRow.displayName = "OperationPopRow";

export function SkeletonRow() {
  return (
    <div className="mb-2 flex pl-2 pt-[16px] pr-6 last:mb-0">
      <div className="h-8 w-8">
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <div className="ml-3 flex flex-1 pb-[14px]">
        <div className="flex flex-col space-y-[6px] pr-[22px]">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
        <div className="flex flex-col items-end space-y-[6px] pr-[22px]">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
        <div className="flex flex-col items-end space-y-[6px] pr-[22px]">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
        <div className="flex flex-col items-end space-y-[6px] pr-[18px]">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
        <Skeleton className="h-5 w-1" />
      </div>
    </div>
  );
}
