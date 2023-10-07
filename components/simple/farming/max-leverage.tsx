import { useContext, useEffect } from "react";
import { TitleText, ContentCon, OptionBtn } from "./common";
import { useAtom } from "jotai";
import { FLeverageAtom } from "@/lib/states/farming";
import { IsActivePanelContext } from "../hover-active-panel";

export function MaxLeverage() {
  const isActive = useContext(IsActivePanelContext);

  const leverages = [5, 10, 20, 50];
  const [activeLeverage, setActiveLevel] = useAtom(FLeverageAtom);

  useEffect(() => {
    setActiveLevel(leverages[0]);
  }, []);

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
            onClick={() => setActiveLevel(l)}
          >
            {l}×
          </OptionBtn>
        ))}
      </ContentCon>
    </div>
  );
}
