import { useContext, useEffect } from "react";
import { TitleText, ContentCon, OptionBtn } from "./common";
import { useAtom } from "jotai";
import { FLeverageAtom } from "@/lib/states/farming";
import { IsActivePanelContext } from "../hover-active-panel";
import useFarmingMatchPool from "@/lib/hooks/use-farming-pick-pool";

export function MaxLeverage() {
  const isActive = useContext(IsActivePanelContext);

  const { farmingPickPool } = useFarmingMatchPool();

  const leverages = [5, 10, 20, 50];
  const [activeLeverage, setActiveLeverage] = useAtom(FLeverageAtom);

  useEffect(() => {
    setActiveLeverage(leverages[0]);
  }, [setActiveLeverage]);

  const handleChange = (l: number) => {
    setActiveLeverage(() => {
      farmingPickPool({ leverage: l });
      return l;
    });
  };

  return (
    <div>
      <TitleText>Max Leverage</TitleText>
      <ContentCon>
        {leverages.map((l) => (
          <OptionBtn
            key={l}
            isActive={isActive}
            data-check={l === activeLeverage ? "true" : "false"}
            className="hover:bg-hover data-[check=true]:bg-yellow"
            onClick={() => handleChange(l)}
          >
            {l}×
          </OptionBtn>
        ))}
      </ContentCon>
    </div>
  );
}
