"use client";

import Image from "next/image";
import { range } from "lodash";
import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function MobileRouterMenu() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="block md:hidden">
      <button
        data-show={showMenu ? true : false}
        className="c-shadow-translate flex h-10 w-10 items-center justify-center rounded-xl border-2 shadow-25 transition-all data-[show=false]:bg-white data-[show=true]:bg-yellow "
        onClick={() => setShowMenu(!showMenu)}
      >
        {showMenu ? (
          <X className="h-4 w-4" />
        ) : (
          <div className="flex flex-col space-y-[5.5px]">
            {range(3).map((i) => (
              <div
                key={i}
                className="h-[1.5px] w-[18px] rounded-sm bg-black"
              ></div>
            ))}
          </div>
        )}
      </button>
      {showMenu && <MenuList onEnd={() => setShowMenu(false)} />}
    </div>
  );
}

function MenuList({ onEnd }: { onEnd: () => void }) {
  const router = useRouter();
  const routePath = ["/pools", "/governance", "/achievements"];
  const currentRoute = usePathname();

  const isPoolActive = currentRoute.includes(routePath[0]);
  const isGovernanceActive = currentRoute.includes(routePath[1]);
  // const isAchievementsActive = currentRoute === routePath[2];

  const handleClick = (r: string) => {
    router.push(r);
    onEnd();
  };

  return (
    <div className="fixed left-0 top-[100px] z-10 h-[calc(100vh-100px)] w-screen bg-sky p-4">
      <div
        className="mb-2 flex items-center space-x-3 py-3"
        style={{
          boxShadow: "inset 0px -1px 0px 0px rgba(14, 4, 62, 0.1)",
        }}
        onClick={() => handleClick("/pools")}
      >
        <Image
          src={isPoolActive ? "/icons/pools-active.svg" : "/icons/pools.svg"}
          width={40}
          height={40}
          alt="pools"
        />
        <div className="text-lg leading-5 text-black">Pools</div>
      </div>
      <div
        className="mb-2 flex items-center space-x-3 py-3"
        style={{
          boxShadow: "inset 0px -1px 0px 0px rgba(14, 4, 62, 0.1)",
        }}
        onClick={() => handleClick("/governance")}
      >
        <Image
          src={
            isGovernanceActive
              ? "/icons/governance-fill.svg"
              : "/icons/governance.svg"
          }
          width={40}
          height={40}
          alt="governance"
        />
        <div className="text-lg leading-5 text-black">Governance</div>
      </div>
      <div
        className="mb-2 flex items-center space-x-3 py-3"
        style={{
          boxShadow: "inset 0px -1px 0px 0px rgba(14, 4, 62, 0.1)",
        }}
      >
        <Image
          src="/icons/achievements.svg"
          width={40}
          height={40}
          alt="achievements"
        />
        <div className="text-lg leading-5 text-black">Achievement</div>
      </div>
    </div>
  );
}
