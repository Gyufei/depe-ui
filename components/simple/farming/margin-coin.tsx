import { useTokens } from "@/lib/hooks/api/use-tokens";
import { TitleText, ContentCon, OptionBtn, CoinIcon } from "./common";
import { useAtom } from "jotai";
import { FMarginTokenAtom } from "@/lib/states/farming";
import { range } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";

export function MarginCoin({ isActive }: { isActive: boolean }) {
  const { marginTokens, isLoading } = useTokens();
  const [marginToken, setMarginToken] = useAtom(FMarginTokenAtom);

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
                onClick={() => setMarginToken(t)}
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
