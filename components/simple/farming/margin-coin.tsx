import { useContext, useEffect } from "react";
import { useAtom } from "jotai";
import { range } from "lodash";

import { useTokens } from "@/lib/hooks/api/use-tokens";
import { TitleText, ContentCon, OptionBtn, CoinIcon } from "./common";
import { FMarginTokenAtom } from "@/lib/states/farming";
import { Skeleton } from "@/components/ui/skeleton";
import { IsActivePanelContext } from "../hover-active-panel";
import { IToken } from "@/lib/types/token";
import useFarmingMatchPool from "@/lib/hooks/use-farming-pick-pool";

export function MarginCoin() {
  const isActive = useContext(IsActivePanelContext);

  const { marginTokens, isLoading } = useTokens();
  const { farmingPickPool } = useFarmingMatchPool();

  const [marginToken, setMarginToken] = useAtom(FMarginTokenAtom);

  const handleChange = (t: IToken) => {
    setMarginToken(() => {
      farmingPickPool({ token: t });
      return t;
    });
  };

  useEffect(() => {
    if (marginTokens?.length) {
      setMarginToken(marginTokens[0]);
    }
  }, [marginTokens, setMarginToken]);

  return (
    <div>
      <TitleText>Margin Coin</TitleText>
      <ContentCon>
        {isLoading
          ? range(2).map((i) => (
              <OptionBtn key={i} isActive={isActive}>
                <div className="flex items-center">
                  <Skeleton className="mr-2 h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-10" />
                </div>
              </OptionBtn>
            ))
          : marginTokens?.map((t) => (
              <OptionBtn
                key={t.symbol}
                isActive={isActive}
                data-check={marginToken?.address === t.address}
                className="hover:bg-hover data-[check=true]:bg-yellow"
                onClick={() => handleChange(t)}
              >
                <div className="flex items-center">
                  <CoinIcon src={t.logoURI} />
                  {t.symbol}
                </div>
              </OptionBtn>
            ))}
      </ContentCon>
    </div>
  );
}
