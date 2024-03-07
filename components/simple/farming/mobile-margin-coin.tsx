import Image from "next/image";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { range } from "lodash";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { useTokens } from "@/lib/hooks/api/use-tokens";
import { TitleText, ContentCon } from "./common";
import { FMarginTokenAtom } from "@/lib/states/farming";
import { Skeleton } from "@/components/ui/skeleton";
import { IToken } from "@/lib/types/token";
import useFarmingMatchPool from "@/lib/hooks/use-farming-pick-pool";
import { CircleFlag } from "@/components/share/circle-flag";

export function MobileMarginCoin() {
  const { marginTokens, isLoading } = useTokens();
  const { farmingPickPool } = useFarmingMatchPool();

  const [marginToken, setMarginToken] = useAtom(FMarginTokenAtom);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = (t: IToken) => {
    setMarginToken(() => {
      farmingPickPool({ token: t });
      return t;
    });
    setDialogOpen(false);
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
        <Dialog
          open={dialogOpen}
          onOpenChange={(isOpen) => setDialogOpen(isOpen)}
        >
          <DialogTrigger asChild>
            <div
              data-state="active"
              className=" c-active-border flex flex-1 cursor-pointer items-center justify-between rounded-xl border-2 p-3 hover:brightness-110 md:p-4"
            >
              <div className="flex items-center justify-start space-x-2">
                <Image
                  src={marginToken?.logoURI || ""}
                  width={16}
                  height={16}
                  alt="coin"
                  className="c-image-shadow"
                />
                <span className="text-sm leading-[17px]">
                  {marginToken?.symbol}
                </span>
                <Image
                  src="/icons/triangle.svg"
                  width={16}
                  height={16}
                  alt="triangle"
                />
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="w-[400px] px-1 py-2" showClose={false}>
            <div className="flex flex-col">
              {isLoading
                ? range(2).map((i) => (
                    <div
                      className="flex h-14 items-center justify-between pl-4 pr-2"
                      key={i}
                    >
                      <Skeleton className="mr-2 h-5 w-6 rounded-full" />
                    </div>
                  ))
                : marginTokens?.map((t) => (
                    <div
                      data-active={
                        marginToken?.address === t.address ? true : false
                      }
                      className="flex h-14 items-center justify-between rounded-xl pl-4 pr-2 data-[active=true]:bg-[#f5f6f7]"
                      key={t.address}
                      onClick={() => handleChange(t)}
                    >
                      <div className="leading-5 text-black">{t.symbol}</div>
                      {marginToken?.address === t.address && <CircleFlag />}
                    </div>
                  ))}
            </div>
          </DialogContent>
        </Dialog>
      </ContentCon>
    </div>
  );
}
