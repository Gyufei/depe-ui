import { TitleText, ContentCon, OptionBtn } from "./common";
import { useAtom } from "jotai";
import { FRatingLevelAtom } from "@/lib/states/farming";
import { useContext, useEffect } from "react";
import { IsActivePanelContext } from "../hover-active-panel";
import { RATING_LEVELS } from "@/lib/constant";
import useFarmingMatchPool from "@/lib/hooks/use-farming-pick-pool";
import { cn } from "@/lib/utils/common";

export function AssetRatingLevel() {
  const { farmingPickPool } = useFarmingMatchPool();

  const levels = RATING_LEVELS;
  const [activeLevel, setActiveLevel] = useAtom(FRatingLevelAtom);

  useEffect(() => {
    setActiveLevel(levels[0]);
  }, [setActiveLevel, levels]);

  const handleChange = (level: (typeof RATING_LEVELS)[number]) => {
    setActiveLevel(() => {
      farmingPickPool({ level });

      return level;
    });
  };

  return (
    <div>
      <TitleText>Asset Rating Level</TitleText>
      <ContentCon>
        <LevelBtn
          className="data-[check=true]:border-green  data-[check=true]:text-green"
          level={levels[0]}
          activeLevel={activeLevel}
          handleChange={(e) => handleChange(e)}
        >
          <BtnTextUnderline
            style={{
              background:
                "linear-gradient(to right, rgba(173, 238, 211, 1), rgba(173, 238, 211, 0))",
            }}
          />
        </LevelBtn>

        <LevelBtn
          className="data-[check=true]:border-tan  data-[check=true]:text-tan"
          level={levels[1]}
          activeLevel={activeLevel}
          handleChange={(e) => handleChange(e)}
        >
          <BtnTextUnderline
            style={{
              background:
                "linear-gradient(to right, rgba(240, 210, 112, 1), rgba(240, 210, 112, 0))",
            }}
          />
        </LevelBtn>

        <LevelBtn
          className="data-[check=true]:border-red data-[check=true]:text-red"
          level={levels[2]}
          activeLevel={activeLevel}
          handleChange={(e) => handleChange(e)}
        >
          <BtnTextUnderline
            style={{
              background:
                "linear-gradient(to right, rgba(255, 200, 200, 1), rgba(255, 200, 200, 0))",
            }}
          />
        </LevelBtn>
      </ContentCon>
    </div>
  );
}

export function LevelBtn({
  level,
  activeLevel,
  handleChange,
  children,
  className,
}: {
  level: (typeof RATING_LEVELS)[number];
  activeLevel: string | null;
  handleChange: (level: string) => void;
  children?: React.ReactNode;
  className?: string;
}) {
  const isActive = useContext(IsActivePanelContext);

  const isCheck = level === activeLevel;

  return (
    <OptionBtn
      isActive={isActive}
      data-check={isCheck}
      className={cn("data-[check=false]:hover:bg-hover", className)}
      onClick={() => handleChange(level)}
    >
      <div className="relative w-[60px] text-center">
        <div className="relative z-10">{level}</div>
        {isCheck && children}
      </div>
    </OptionBtn>
  );
}

export function BtnTextUnderline({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn(
        "absolute bottom-[1px] z-0 h-[6px] w-[60px] rounded-3xl bg-[#F0D270]",
        className,
      )}
      style={style}
    ></div>
  );
}
