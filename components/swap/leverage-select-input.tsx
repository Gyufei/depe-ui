import { useStrNum } from "@/lib/hooks/use-str-num";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export default function LeverageSelectInput({
  className,
}: {
  className?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentLeverage, setCurrentLeverage] = useState(5);
  const [inputLeverage, setInputLeverage] = useStrNum("5");

  const leverageOptions = [5, 10, 15, 20, 25];

  const inputBlur = () => {
    if (inputLeverage && !isNaN(Number(inputLeverage))) {
      setCurrentLeverage(Number(inputLeverage));
      setIsExpanded(false);
    }
  };

  const handleClickLeverage = (l: number) => {
    setCurrentLeverage(l);
    setInputLeverage(l.toString());
    setIsExpanded(false);
  };

  return (
    <div
      className={cn(
        "h-12 w-fit max-w-[296px] overflow-hidden rounded-lg border-2 border-black bg-white transition-all",
        className,
      )}
      style={{
        scrollbarWidth: "none",
      }}
    >
      {!isExpanded ? (
        <div
          onClick={() => setIsExpanded(true)}
          className="flex h-12 w-12 cursor-pointer items-center justify-center text-sm leading-[18px] text-black"
        >
          {currentLeverage}×
        </div>
      ) : (
        <ScrollArea className="flex h-full w-[296px] items-center gap-x-2 px-2">
          <ScrollBar orientation="horizontal" />
          <div className="flex h-11 w-fit items-center gap-x-2 px-2">
            {leverageOptions.map((l) => (
              <button
                className="flex h-8 w-[56px] items-center justify-center rounded-lg border-2 border-black text-sm leading-[18px]"
                key={l}
                onClick={() => handleClickLeverage(l)}
              >
                {l}×
              </button>
            ))}
            <div className="relative">
              <input
                className="flex h-8 w-[56px] rounded-lg border-2 border-black bg-white py-2 pl-3 pr-4 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-lightgray focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                value={inputLeverage}
                onChange={(e) => setInputLeverage(e.target.value)}
                onBlur={inputBlur}
              />
              <span className="absolute top-[4px] right-[9px]">×</span>
            </div>
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
