"use client";

import { useAtom } from "jotai";
import { ModeAtom, TMode } from "@/lib/states/mode";
import Image from "next/image";

import Trapezoid from "/public/icons/trapezoid.svg";

export default function ModeSwitch() {
  const [mode, setMode] = useAtom(ModeAtom);
  const modeOpt: Array<TMode> = ["Simple", "Pro"];

  const handleSwitch = (m: TMode) => {
    if (mode === m) return;
    setMode(m);
  };

  return (
    <div className="relative flex h-11 w-[210px] items-end justify-around rounded-xl border-2 border-black bg-white shadow-25 shadow-black">
      <Image
        data-state={mode === "Simple" ? "simple" : "pro"}
        className="absolute z-0 data-[state=simple]:left-[-2px] data-[state=simple]:bottom-[-2px] data-[state=pro]:-right-[3px] data-[state=pro]:-bottom-[2px]"
        width={120}
        height={48}
        src={Trapezoid}
        alt="Trapezoid"
        style={{
          transform:
            mode === "Simple" ? "rotate(0)" : "rotateX(360deg) rotateY(180deg)",
        }}
      ></Image>
      {modeOpt.map((m) => (
        <div
          className="data-[state=active]:c-font-title-65 flex h-full w-[120px] cursor-pointer items-center justify-center"
          key={m}
          data-state={mode === m ? "active" : "inactive"}
          onClick={() => handleSwitch(m)}
        >
          <span
            data-state={mode === m ? "active" : "inactive"}
            className="z-10 mb-0 data-[state=active]:mb-1"
          >
            {m}
          </span>
        </div>
      ))}
    </div>
  );
}
