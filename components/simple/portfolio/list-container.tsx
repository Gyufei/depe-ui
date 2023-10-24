import { ReactNode, useContext } from "react";
import { cn } from "@/lib/utils/common";

import { Skeleton } from "../../ui/skeleton";
import { IsActivePanelContext } from "../hover-active-panel";

export function ListContainer({
  title,
  children,
  className,
  isLoading,
}: {
  title: string;
  isLoading: boolean;
  children: ReactNode;
  className?: string;
}) {
  const isActive = useContext(IsActivePanelContext);

  return (
    <div
      data-state={isActive ? "active" : "inactive"}
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
