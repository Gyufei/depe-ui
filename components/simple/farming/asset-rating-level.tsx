import { TitleText, ContentCon, OptionBtn } from "./common";
import { useAtom } from "jotai";
import { FRatingLevelAtom } from "@/lib/states/farming";
import { useContext, useEffect } from "react";
import { IsActivePanelContext } from "../hover-active-panel";

export function AssetRatingLevel() {
  const isActive = useContext(IsActivePanelContext);

  const levels = ["High", "Moderate", "Low"];
  const [activeLevel, setActiveLevel] = useAtom(FRatingLevelAtom);

  useEffect(() => {
    setActiveLevel(levels[1]);
  }, []);

  return (
    <div>
      <TitleText>Asset Rating Level</TitleText>
      <ContentCon>
        <OptionBtn
          isActive={isActive}
          data-check={levels[0] === activeLevel ? "true" : "false"}
          className="data-[check=true]:border-green  data-[check=true]:text-green data-[check=false]:hover:bg-hover"
          onClick={() => setActiveLevel(levels[0])}
        >
          <div className="relative w-[60px] text-center">
            <div className="relative z-10">{levels[0]}</div>
            {levels[0] === activeLevel && (
              <div className="absolute bottom-[1px] z-0 h-[6px] w-[60px] bg-[#ADEED3]"></div>
            )}
          </div>
        </OptionBtn>
        <OptionBtn
          isActive={isActive}
          data-check={levels[1] === activeLevel ? "true" : "false"}
          className="data-[check=true]:border-tan  data-[check=true]:text-tan data-[check=false]:hover:bg-hover"
          onClick={() => setActiveLevel(levels[1])}
        >
          <div className="relative w-[60px] text-center">
            <div className="relative z-10">{levels[1]}</div>
            {levels[1] === activeLevel && (
              <div className="absolute bottom-[1px] z-0 h-[6px] w-[60px] bg-[#F0D270]"></div>
            )}
          </div>
        </OptionBtn>
        <OptionBtn
          isActive={isActive}
          data-check={levels[2] === activeLevel ? "true" : "false"}
          className="data-[check=true]:border-red  data-[check=true]:text-red data-[check=false]:hover:bg-hover"
          onClick={() => setActiveLevel(levels[2])}
        >
          <div className="relative w-[60px] text-center">
            <div className="relative z-10">{levels[2]}</div>
            {levels[2] === activeLevel && (
              <div className="absolute bottom-[1px] z-0  h-[6px] w-[60px] bg-[#FFC8C8]"></div>
            )}
          </div>
        </OptionBtn>
      </ContentCon>
    </div>
  );
}
