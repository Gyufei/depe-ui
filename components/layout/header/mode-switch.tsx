"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAtom } from "jotai";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { ModeAtom, TMode } from "@/lib/states/mode";

import Image from "next/image";
import Menu from "/public/icons/menu.svg";

const routerMath = {
  Simple: ["/"],
  Pro: ["/pools", "/governance"],
};

const modeOpt: Array<TMode> = ["Simple", "Pro"];

export default function ModeSwitch() {
  const pathname = usePathname();
  const router = useRouter();

  const [popOpen, setPopOpen] = useState(false);

  const [mode, setMode] = useAtom(ModeAtom);

  const handleSwitch = (m: boolean) => {
    const checkMode = m ? modeOpt[1] : modeOpt[0];
    if (mode === checkMode) return;
    setMode(checkMode);
    router.push(routerMath[checkMode][0]);
  };

  useEffect(() => {
    if (routerMath.Simple.includes(pathname)) {
      setMode("Simple");
    } else if (routerMath.Pro.includes(pathname)) {
      setMode("Pro");
    }
  }, [pathname, setMode]);

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger asChild>
        <Image
          className="hidden cursor-pointer md:block"
          width={24}
          height={24}
          src={Menu}
          alt="menu"
        ></Image>
      </PopoverTrigger>
      <PopoverContent
        className="flex w-[220px] flex-col items-stretch border-[2px] border-black bg-white py-2"
        align="start"
      >
        <div className="flex items-center justify-between">
          <div className="font-medium text-black">{modeOpt[0]}</div>
          <Switch
            checked={mode === modeOpt[1]}
            onCheckedChange={handleSwitch}
          />
          <div className="font-medium text-black">{modeOpt[1]}</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
