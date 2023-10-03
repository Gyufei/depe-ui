import useOnclickOutside from "react-cool-onclickoutside";
import { useStrNum } from "@/lib/hooks/use-str-num";
import { cn } from "@/lib/utils/utils";
import { useEffect, useMemo, useState } from "react";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import { SLeverageAtom } from "@/lib/states/swap";
import { useAtom } from "jotai";
import { useTokens } from "@/lib/hooks/api/use-tokens";
import { Skeleton } from "@/components/ui/skeleton";

export default function LeverageSelectInput({
  className,
}: {
  className?: string;
}) {
  const { isLoading: isTokenLoading } = useTokens();

  const [isExpanded, setIsExpanded] = useState(false);
  const [currentLeverage, setCurrentLeverage] = useAtom(SLeverageAtom);
  const [inputLeverage, setInputLeverage] = useStrNum("5");

  const leverageOptions = useMemo(() => [5, 10, 15, 20, 25], []);

  useEffect(() => {
    setCurrentLeverage(leverageOptions[0]);
  }, [setCurrentLeverage, leverageOptions]);

  const inputBlur = () => {
    if (inputLeverage && !isNaN(Number(inputLeverage))) {
      setCurrentLeverage(Number(inputLeverage));
      setIsExpanded(false);
    }
  };

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
      ref={ref}
      style={{
        scrollbarWidth: "none",
      }}
    >
      {!isExpanded ? (
        <div
          onClick={() => handleExpand()}
          className="flex h-12 w-12 cursor-pointer items-center justify-center text-sm leading-[18px] text-black"
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
