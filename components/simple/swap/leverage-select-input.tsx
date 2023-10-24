import NP from "number-precision";
import { useMemo, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { useAtom, useAtomValue } from "jotai";

import { useStrNum } from "@/lib/hooks/common/use-str-num";
import { cn } from "@/lib/utils/common";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import { SLeverageAtom, SPoolAtom } from "@/lib/states/swap";
import { useTokens } from "@/lib/hooks/api/use-tokens";
import { Skeleton } from "@/components/ui/skeleton";
import useSwapPickPool from "@/lib/hooks/use-swap-pick-pool";
import { range } from "lodash";

export default function LeverageSelectInput({
  className,
}: {
  className?: string;
}) {
  const { isLoading: isTokenLoading } = useTokens();

  const { swapPickPool } = useSwapPickPool();

  const pool = useAtomValue(SPoolAtom);
  const [currentLeverage, setCurrentLeverage] = useAtom(SLeverageAtom);

  const [isExpanded, setIsExpanded] = useState(false);
  const [inputLeverage, setInputLeverage] = useStrNum();

  const leverageOptions = useMemo(() => {
    if (pool) {
      const pLeverage = NP.divide(pool.maxleverage, 100);
      return range(1, pLeverage);
    }

    return [5, 10, 15, 20, 25];
  }, [pool]);

  const ref = useOnclickOutside(() => {
    setIsExpanded(false),
      {
        disabled: !isExpanded,
      };
  });

  const handleExpand = () => {
    if (isTokenLoading) return;
    setIsExpanded(true);
  };

  const handleClickLeverage = (l: number) => {
    setCurrentLeverage(() => {
      if (!pool) {
        swapPickPool({ leverage: l });
      }
      return l;
    });
    setIsExpanded(false);
  };

  const handleInput = (l: string) => {
    setInputLeverage(l);
    if (l && !isNaN(Number(l))) {
      setCurrentLeverage(() => {
        swapPickPool({ leverage: Number(l) });
        return Number(l);
      });
    }
  };

  return (
    <div
      className={cn(
        "h-12 w-fit max-w-[296px] overflow-hidden rounded-lg border-2 border-black bg-white transition-all",
        className,
      )}
      ref={ref}
      style={{
        scrollbarWidth: "none",
      }}
    >
      {!isExpanded ? (
        <div
          onClick={() => handleExpand()}
          className="flex h-12 w-12 cursor-pointer items-center justify-center pb-[3px] text-sm leading-[18px] text-black"
        >
          {isTokenLoading ? (
            <Skeleton className="h-5 w-5" />
          ) : (
            <>{currentLeverage}×</>
          )}
        </div>
      ) : (
        <ScrollArea className="flex h-full w-[296px] items-center gap-x-2 px-2">
          <ScrollBar orientation="horizontal" className="h-0" />
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
                className="flex h-8 w-[56px] rounded-lg border-2 border-black bg-white py-2 pl-3 pr-5 text-right text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-lightgray focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="0"
                value={inputLeverage}
                onChange={(e) => handleInput(e.target.value)}
              />
              <span className="absolute top-[4px] right-[9px]">×</span>
            </div>
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
