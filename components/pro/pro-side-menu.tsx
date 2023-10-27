"use client";
import Image from "next/image";

import PoolsIcon from "/public/icons/pools.svg";
import PoolsActiveIcon from "/public/icons/pools-active.svg";
import GovernanceIcon from "/public/icons/governance.svg";
import AchievementsIcon from "/public/icons/achievements.svg";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/common";

export default function ProSideMenu({ className }: { className?: string }) {
  const routePath = ["/pools", "/governance", "/achievements"];
  const currentRoute = usePathname();

  return (
    <div className={cn("flex flex-col gap-y-10", className)}>
      <Pools isActive={currentRoute.includes(routePath[0])} />
      <Governance isActive={currentRoute.includes(routePath[1])} />
      <Achievements isActive={currentRoute === routePath[2]} />
    </div>
  );
}

function Pools({ isActive }: { isActive: boolean }) {
  return isActive ? (
    <Image src={PoolsActiveIcon} width={40} height={40} alt="pools" />
  ) : (
    <Image
      src={PoolsIcon}
      width={40}
      height={40}
      className="opacity-40"
      alt="pools"
    />
  );
}

function Governance({ isActive }: { isActive: boolean }) {
  return isActive ? (
    <Image src={GovernanceIcon} width={40} height={40} alt="governance" />
  ) : (
    <Image
      src={GovernanceIcon}
      width={40}
      height={40}
      className="opacity-40"
      alt="governance"
    />
  );
}

function Achievements({ isActive }: { isActive: boolean }) {
  return isActive ? (
    <Image src={AchievementsIcon} width={40} height={40} alt="achievements" />
  ) : (
    <Image
      src={AchievementsIcon}
      width={40}
      height={40}
      className="opacity-40"
      alt="achievements"
    />
  );
}
