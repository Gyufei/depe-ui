"use client";

import PoolsIcon from "@/components/share/icons/pools";
import GovernanceIcon from "@/components/share/icons/governance";
import AchievementsIcon from "@/components/share/icons/achievements";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function ProSideMenu({ className }: { className?: string }) {
  const routePath = ["/pools", "/governance", "/achievements"];
  const currentRoute = usePathname();

  return (
    <div className={cn("flex flex-col gap-y-10", className)}>
      <PoolsIcon
        active={currentRoute === routePath[0]}
        data-state={currentRoute === routePath[0] ? "active" : "inactive"}
        className="h-10 w-10 cursor-pointer data-[state=inactive]:fill-gray data-[state=active]:fill-black"
      />
      <GovernanceIcon
        data-state={currentRoute === routePath[1] ? "active" : "inactive"}
        className="h-10 w-10 cursor-pointer data-[state=inactive]:text-gray data-[state=active]:text-yellow"
      />
      <AchievementsIcon
        data-state={currentRoute === routePath[2] ? "active" : "inactive"}
        className="h-10 w-10 cursor-pointer data-[state=inactive]:text-gray data-[state=active]:text-yellow"
      />
    </div>
  );
}
