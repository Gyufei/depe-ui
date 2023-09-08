"use client";

import { useBlockNumber } from "wagmi";
import { Skeleton } from "../ui/skeleton";

export default function BlockNumberTag() {
  const { data, isLoading, status } = useBlockNumber();

  return (
    <div
      data-status={status}
      className="mt-8 flex items-center self-end rounded-3xl border-2 px-4 py-[6px] 
      data-[status='success']:border-green data-[status='error']:border-red
      data-[status='loading']:border-tan data-[status='success']:text-green
      data-[status='error']:text-red data-[status='loading']:text-tan
      "
    >
      {isLoading ? (
        <>
          <Skeleton className="mr-2 h-2 w-2 rounded-full" />
          <Skeleton className="h-4 w-14" />
        </>
      ) : (
        <>
          <div
            data-status={status}
            className="mr-2 h-2 w-2 rounded-full data-[status='success']:bg-green data-[status='error']:bg-red data-[status='loading']:bg-tan"
          ></div>
          {data?.toString()}
        </>
      )}
    </div>
  );
}
