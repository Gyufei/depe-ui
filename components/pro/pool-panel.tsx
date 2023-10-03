import Image from "next/image";

import { IPool } from "@/lib/types/pool";
import TokenPairImage from "../share/token-pair-image";
import { Skeleton } from "../ui/skeleton";
import ExpirationIcon from "@/components/share/icons/expiration";
import MakerIcon from "/public/icons/maker.svg";
import { usePoolFormat } from "@/lib/hooks/use-pool-format";
import { usePoolAPY } from "@/lib/hooks/api/use-pool-apy";

function FieldRow({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-between">{children}</div>;
}

function TitleText({ children }: { children: React.ReactNode }) {
  return (
    <div className="c-font-title-55 text-sm leading-5 text-black opacity-60">
      {children}
    </div>
  );
}

function FieldText({ children }: { children: React.ReactNode }) {
  return (
    <div className="c-font-title-55 text-sm leading-5 text-black">
      {children}
    </div>
  );
}

export default function PoolPanel({ pool }: { pool: IPool }) {
  const { baseToken, quoteToken, leverage } = usePoolFormat(pool);
  const { data: poolAPY, isLoading: isPoolAPYLoading } = usePoolAPY(
    pool.poolAddr,
  );

  return (
    <div className="relative flex flex-col ">
      <div
        style={{
          clipPath: "polygon(0 0%, 375px 0%, 100% 400px, 0% 100%)",
        }}
        className="flex h-16 items-center rounded-tl-3xl border-t-2 border-l-2 border-black bg-white p-6"
      >
        <TokenPairImage
          img1={quoteToken?.logoURI || ""}
          img2={baseToken?.logoURI || ""}
        />
        <div className="c-font-text-65 ml-4 leading-6">
          {quoteToken?.symbol}/{baseToken?.symbol}
        </div>
      </div>

      <div className="absolute left-[390px] z-10 flex skew-x-[26deg]">
        <div className="h-[66px] w-[2px] bg-black"></div>
        <div className="mt-[10px] h-[55px] w-[4px] bg-black"></div>
        <div className="relative top-6 h-2 w-5 border-y-2 border-black bg-white"></div>
        <div className="-right-30 relative -bottom-[46px] h-5 w-2 -skew-x-[26deg] border-x-2 border-black bg-white"></div>
      </div>

      <div className="absolute right-0 top-0 z-20">
        <button className="flex items-center gap-x-2 rounded-full border-2 border-black bg-white px-4 py-3 shadow-25">
          <Image width={90} height={12} src={MakerIcon} alt="maker"></Image>
          <Image
            width={24}
            height={24}
            src="/icons/dev/ETH.svg"
            alt="token"
            className="ml-1"
          ></Image>
        </button>
      </div>

      <div className="relative z-30 box-border h-[280px] rounded-3xl rounded-tl-none border-2 border-black bg-white p-6 shadow-50 before:absolute before:left-0 before:-top-[2px] before:h-[2px] before:w-[403.5px] before:skew-x-[26deg] before:bg-white before:content-['']">
        <div className="flex flex-col gap-y-6 border-b border-[#eee] pb-6">
          <FieldRow>
            <TitleText>Leverage</TitleText>
            <FieldText>1~{leverage}×</FieldText>
          </FieldRow>
          <FieldRow>
            <TitleText>Earn APY</TitleText>
            {!poolAPY || isPoolAPYLoading ? (
              <Skeleton className="h-5 w-10" />
            ) : (
              <FieldText>
                {poolAPY && Number(poolAPY) > 0 ? "+" : "-"}
                {poolAPY}%
              </FieldText>
            )}
          </FieldRow>
          <FieldRow>
            <TitleText>TVL</TitleText>
            <FieldText>$300</FieldText>
          </FieldRow>
          <FieldRow>
            <TitleText>Expiration</TitleText>
            <FieldText>
              <div className="flex items-center">
                <ExpirationIcon />
                <div className="ml-[1px]">23 d 5 h</div>
              </div>
            </FieldText>
          </FieldRow>
        </div>

        <div className="flex justify-between pt-4">
          <div className="c-font-title-65 text-xl leading-[30px]">
            # {pool.poolId}
          </div>
          <button className="rounded-md border border-black px-14 py-2 leading-6 hover:contrast-50">
            Detail
          </button>
        </div>
      </div>
    </div>
  );
}
