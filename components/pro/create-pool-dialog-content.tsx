import NP from "number-precision";
import { useTokens } from "@/lib/hooks/api/use-tokens";
import { CoinIcon, ContentCon, OptionBtn } from "../simple/farming/common";
import { range } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo, useState } from "react";
import { IToken } from "@/lib/types/token";
import {
  BtnTextUnderline,
  LevelBtn,
} from "../simple/farming/asset-rating-level";
import { RATING_LEVELS } from "@/lib/constant";
import { formatNum } from "@/lib/utils/number";
import { NumericalInput } from "../share/numerical-input";
import WithApproveBtn from "../share/with-approve-btn";
import { useCreatePool } from "@/lib/hooks/contract/use-create-pool";

export default function CreatePoolDialogContent() {
  return (
    <div className="flex flex-col items-stretch gap-y-6 md:mx-6">
      <Margin />
      <AssetLevel />
      <MaxLeverage />
      <Dex />
      <TradingFee />
      <CreateBtn />
    </div>
  );
}

function Margin() {
  const { marginTokens, isLoading } = useTokens();
  const [marginToken, setMarginToken] = useState(
    marginTokens ? marginTokens[0] : { address: null },
  );

  const handleChange = (t: IToken) => {
    console.log(t);
    setMarginToken(t);
  };

  return (
    <div>
      <div className="font-title text-sm leading-5 text-gray">Margin Coin</div>
      <ContentCon>
        {isLoading
          ? range(2).map((i) => (
              <OptionBtn key={i} isActive={true}>
                <div className="flex items-center">
                  <Skeleton className="mr-2 h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-10" />
                </div>
              </OptionBtn>
            ))
          : marginTokens?.map((t) => (
              <OptionBtn
                key={t.symbol}
                isActive={true}
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

function AssetLevel() {
  const levels = RATING_LEVELS;
  const [activeLevel, setActiveLevel] = useState(levels[1]);

  const handleChange = (e: any) => {
    setActiveLevel(e);
  };

  return (
    <div>
      <div className="font-title text-sm leading-5 text-gray">
        Asset Rating Level
      </div>
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

function MaxLeverage() {
  const leverages = useMemo(() => [5, 10, 20, 50], []);
  const [activeLeverage, setActiveLeverage] = useState(10);

  const handleChange = (l: number) => {
    setActiveLeverage(l);
  };

  return (
    <div>
      <div className="font-title text-sm leading-5 text-gray">Max Leverage</div>
      <ContentCon>
        {leverages.map((l) => (
          <OptionBtn
            key={l}
            isActive={true}
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

function Dex() {
  const isLoading = true;
  const dexs: Array<any> = [];
  const [dex, setDex] = useState(dexs[0]);

  const handleChange = (d: any) => {
    console.log(dex);
    setDex(d);
  };

  return (
    <div>
      <div className="font-title text-sm leading-5 text-gray">Margin Coin</div>
      <ContentCon>
        {isLoading
          ? range(2).map((i) => (
              <OptionBtn key={i} isActive={true}>
                <div className="flex items-center">
                  <Skeleton className="mr-2 h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-10" />
                </div>
              </OptionBtn>
            ))
          : dexs?.map((t) => (
              <OptionBtn
                key={t.symbol}
                isActive={true}
                data-check={dex?.name === t}
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

function TradingFee() {
  const fees: Array<number> = [0.001, 0.005, 0.02];
  const [fee, setFee] = useState(fees[0]);

  const handleChange = (f: any) => {
    console.log(f);
    setFee(f);
  };

  return (
    <div>
      <div className="font-title text-sm leading-5 text-gray">Trading Fee</div>
      <ContentCon>
        {fees?.map((f) => (
          <OptionBtn
            key={f}
            isActive={true}
            data-check={fee === f}
            className="hover:bg-hover data-[check=true]:bg-yellow"
            onClick={() => handleChange(f)}
          >
            <div className="flex items-center">
              {formatNum(NP.times(f, 100)) + "%"}
            </div>
          </OptionBtn>
        ))}
        <OptionBtn isActive={true}>
          <div className="flex items-center">
            <NumericalInput
              className="h-6 w-[40px] text-center"
              value={NP.divide(fee, 100)}
              onUserInput={(e) => setFee(NP.divide(e, 100))}
            />
            <div>%</div>
          </div>
        </OptionBtn>
      </ContentCon>
    </div>
  );
}

function CreateBtn() {
  const cost = 10;
  const baseToken = {} as IToken;
  const originBtnText = "Submit";

  const { write } = useCreatePool();

  const handleBtnClick = () => {
    write();
    // console.log("submit");
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-1 text-sm leading-5">
        <div className="text-gray">This will cost you</div>
        <div className="text-green">${cost}</div>
      </div>
      <WithApproveBtn
        isActive={true}
        token={baseToken}
        balanceAmount={"0"}
        willUseAmount={"0"}
        isLoading={false}
        disabled={false}
        onClick={handleBtnClick}
      >
        {originBtnText}
      </WithApproveBtn>
    </div>
  );
}
