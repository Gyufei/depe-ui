"use client";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "../../ui/skeleton";

export function ListContainer({
  title, isActivePanel, children, className, isLoading,
}: {
  title: string;
  isActivePanel: boolean;
  isLoading: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      data-state={isActivePanel ? "active" : "inactive"}
      className={cn("c-active-border rounded-xl border-2 p-2", className)}
    >
      {isLoading ? (
        <Skeleton className="mb-1 h-5 w-[72px]" />
      ) : (
        <div className="c-font-title-65 mb-1 px-2 text-base leading-5 text-black">
          {title}
        </div>
      )}
      {children}
    </div>
  );
}
