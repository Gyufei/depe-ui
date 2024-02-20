"use client";
import Image from "next/image";

import PoolsIcon from "/public/icons/pools.svg";
import PoolsActiveIcon from "/public/icons/pools-active.svg";
import AchievementsIcon from "/public/icons/achievements.svg";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/common";
import Link from "next/link";

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
  return (
    <Link href="/pools">
      {isActive ? (
        <Image src={PoolsActiveIcon} width={40} height={40} alt="pools" />
      ) : (
        <Image
          src={PoolsIcon}
          width={40}
          height={40}
          className="opacity-40"
          alt="pools"
        />
      )}
    </Link>
  );
}

function Governance({ isActive }: { isActive: boolean }) {
  return (
    <Link href="/governance">
      <Image
        src={isActive ? "/icons/governance-fill.svg" : "/icons/governance.svg"}
        width={40}
        height={40}
        alt="governance"
      />
    </Link>
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
