import { useEffect, useMemo } from "react";
import NP from "number-precision";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { IPool } from "@/lib/types/pool";
import TokenPairImage from "../share/token-pair-image";
import { Skeleton } from "../ui/skeleton";
import ExpirationIcon from "/public/icons/expiration.svg";
import MakerIcon from "/public/icons/maker.svg";
import { usePoolFormat } from "@/lib/hooks/use-pool-format";
import { usePoolAPY } from "@/lib/hooks/api/use-pool-apy";
import { usePoolParsedAsset } from "@/lib/hooks/use-pool-parsed-asset";
import { useTokenPrice } from "@/lib/hooks/contract/use-token-price";
import { formatNum } from "@/lib/utils/number";
import { useMediaQuery } from "@/lib/hooks/common/use-media-query";

export default function PoolPanel({
  pool,
  isLoading: isPoolLoading,
  recordAPY,
}: {
  pool: IPool;
  isLoading: boolean;
  recordAPY: (_id: string, _a: string) => void;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const router = useRouter();
  const { baseToken, quoteToken, leverage, expiration } = usePoolFormat(pool);
  const { data: poolAPY, isLoading: isPoolAPYLoading } = usePoolAPY(
    pool.poolAddr,
  );

  useEffect(() => {
    recordAPY(pool.poolId, poolAPY);
  }, [poolAPY, recordAPY, pool.poolId]);

  const { data: basePriceData, isLoading: isPriceLoading } = useTokenPrice(
    baseToken?.address || null,
    18,
  );

  const { data: assetData, isLoading: isAssetLoading } =
    usePoolParsedAsset(pool);

  const isTvlLoading = isPoolLoading || isPriceLoading || isAssetLoading;

  const tvl = useMemo(() => {
    if (!basePriceData.value || !assetData.value) return "0";

    const tvlVal = NP.times(basePriceData.value, assetData.value);

    return formatNum(tvlVal);
  }, [basePriceData, assetData]);

  const handleDetail = () => {
    router.push(`/pools/${pool.poolId}`);
  };

  return (
    <div className="relative flex flex-col ">
      <div
        style={{
          clipPath: isDesktop
            ? "polygon(0 0%, 375px 0%, 100% 400px, 0% 100%)"
            : "polygon(0 0%, 139px 0%, 100% 455px, 0% 100%)",
        }}
        className="flex h-16 items-center rounded-tl-3xl border-t-2 border-l-2 border-black bg-white p-4 md:p-6"
      >
        {isPoolLoading ? (
          <>
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="ml-4 h-5 w-20" />
          </>
        ) : (
          <>
            <TokenPairImage
              img1={quoteToken?.logoURI || ""}
              img2={baseToken?.logoURI || ""}
            />
            {isDesktop ? (
              <div className="c-font-text-65 ml-4 leading-6">
                {quoteToken?.symbol}/{baseToken?.symbol}
              </div>
            ) : (
              <div className="ml-2">
                <div className="text-green">High</div>
                <div>1~{pool.maxleverage}</div>
              </div>
            )}
          </>
        )}
      </div>

      <PanelLogo isLoading={isPoolLoading} />

      <div className="relative z-30 box-border h-[280px] rounded-3xl rounded-tl-none border-2 border-black bg-white p-6 shadow-50 before:bg-white before:content-[''] before:absolute before:left-0 before:-top-[2px] before:w-[51%] before:h-[2px] md:before:w-[403.5px] before:skew-x-[26deg]">
        <div className="flex flex-col gap-y-6 border-b border-[#eee] pb-6">
          <FieldRow>
            <TitleText>Leverage</TitleText>
            <FieldText isLoading={isPoolLoading}>1~{leverage}×</FieldText>
          </FieldRow>
          <FieldRow>
            <TitleText>Earn APY</TitleText>
            <FieldText isLoading={!poolAPY || isPoolAPYLoading}>
              {poolAPY && Number(poolAPY) < 0 ? "-" : "+"}
              {poolAPY}%
            </FieldText>
          </FieldRow>
          <FieldRow>
            <TitleText>TVL</TitleText>
            <FieldText isLoading={isTvlLoading}>${tvl}</FieldText>
          </FieldRow>
          <FieldRow>
            <TitleText>Expiration</TitleText>
            <FieldText isLoading={isPoolLoading}>
              <div className="flex items-center">
                <Image
                  src={ExpirationIcon}
                  width={16}
                  height={16}
                  alt="expiration"
                />
                <div className="ml-[1px]">{expiration.simple}</div>
              </div>
            </FieldText>
          </FieldRow>
        </div>

        <div className="flex items-center justify-between pt-4">
          {isPoolLoading ? (
            <Skeleton className="h-[30px] w-10" />
          ) : (
            <div className="c-font-title-65 text-xl leading-[30px]">
              # {pool.poolId}
            </div>
          )}
          <button
            disabled={isPoolLoading}
            className="rounded-md border border-black px-10 py-2 leading-6 hover:contrast-50 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleDetail}
          >
            Detail
          </button>
        </div>
      </div>
    </div>
  );
}

function PanelLogo({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      <div className="absolute left-[155px] z-10 flex skew-x-[26deg] md:left-[390px]">
        <div className="h-[66px] w-[2px] bg-black"></div>
        <div className="mt-[10px] h-[55px] w-[4px] bg-black"></div>
        <div className="relative top-6 h-2 w-5 border-y-2 border-black bg-white"></div>
        <div className="relative -right-[120px] -bottom-[46px] h-5 w-2 -skew-x-[26deg] border-x-2 border-black bg-white"></div>
      </div>

      <div className="absolute right-0 top-0 z-20">
        <button className="flex items-center gap-x-2 rounded-full border-2 border-black bg-white px-4 py-3 shadow-25">
          {isLoading ? (
            <>
              <Skeleton className="h-6 w-[90px] " />
              <Skeleton className="ml-1 h-6 w-6" />
            </>
          ) : (
            <>
              <Image width={90} height={12} src={MakerIcon} alt="maker"></Image>
              <Image
                width={24}
                height={24}
                src="/icons/dev/ETH.svg"
                alt="token"
                className="ml-1"
              ></Image>
            </>
          )}
        </button>
      </div>
    </>
  );
}

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

function FieldText({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading?: boolean;
}) {
  return isLoading ? (
    <Skeleton className="h-5 w-20" />
  ) : (
    <div className="c-font-title-55 text-sm leading-5 text-black">
      {children}
    </div>
  );
}
