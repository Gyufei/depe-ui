/* eslint-disable @next/next/no-img-element */
import { ReactNode, useMemo, useState } from "react";
import domtoimage from "dom-to-image";
import { useAccount } from "wagmi";

import { usePositionFormat } from "@/lib/hooks/use-position-format";
import { IPool } from "@/lib/types/pool";
import { EPositionStatus, IPosition } from "@/lib/types/position";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "../../ui/checkbox";

export default function ShareDialogContent({
  position,
  pool,
}: {
  position: IPosition;
  pool: IPool;
}) {
  const { address: account } = useAccount();

  const {
    quoteToken,
    leverage,
    pnlAmount,
    pnlPercent,
    openPrice,
    currentPriceRes,
    openOn,
  } = usePositionFormat(position, pool);

  const [showHash, setShowHash] = useState(true);
  const [showPnlAmount, setShowPnlAmount] = useState(true);
  const showTrader = useMemo(() => {
    return account === position.trader;
  }, [account, position.trader]);

  async function handleDownload() {
    const shareDomNode = document.querySelector("#share-content");
    if (!shareDomNode) return;

    try {
      const imgData = await domtoimage.toJpeg(shareDomNode);
      const link = document.createElement("a");
      link.download = `${position.positionAddr}.jpeg`;
      link.href = imgData;
      link.click();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div
        data-state="active"
        id="share-content"
        className="c-shadow-panel relative w-[750px] rounded-3xl border-4 border-black bg-brown p-10 "
      >
        <div className="absolute -left-[4px] top-[27px] flex h-full flex-col justify-between">
          <div>
            <div className="h-[28px] w-[14px] rounded-r-md border-4 border-l-0 border-black bg-white"></div>
            <div className="mt-[35px] h-[28px] w-[14px] rounded-r-md border-4 border-l-0 border-black bg-white"></div>
          </div>
        </div>
        <div className="relative w-[670px]">
          {Number(position.positionStatus) === EPositionStatus["closed"] && (
            <ClosedImg />
          )}
          <div className="rounded-[36px] border-4 border-[#0b073b] bg-white p-10">
            <div className="flex flex-col items-start">
              <LeverageAndToken
                leverage={leverage}
                token={quoteToken?.symbol || ""}
              ></LeverageAndToken>
              <Pnl
                showAmount={showPnlAmount}
                amount={pnlAmount.formatted || ""}
                percent={pnlPercent.formatted || ""}
              />
            </div>

            <div className="mt-10 flex items-center space-x-[156px]">
              <div className="flex flex-col space-y-[2px]">
                <LabelTitle>Avg. Open Price</LabelTitle>
                <ContentText>${openPrice.formatted}</ContentText>
              </div>
              <div className="flex flex-col space-y-[2px]">
                <LabelTitle>Last Price</LabelTitle>
                {currentPriceRes.isLoading ? (
                  <Skeleton className="h-1 w-[100px]" />
                ) : (
                  <ContentText>${currentPriceRes.data.formatted}</ContentText>
                )}
              </div>
            </div>

            {showTrader && (
              <div className="mt-10">
                <LabelTitle>Trader</LabelTitle>
                <ContentText>{position.trader}</ContentText>
              </div>
            )}

            {showHash && (
              <div className="mt-10">
                <LabelTitle>Position Hash</LabelTitle>
                <ContentText>{position.positionAddr}</ContentText>
              </div>
            )}

            <div className="mt-10 flex items-center justify-between">
              <div>
                <img
                  src="/icons/logo-linear.svg"
                  className="ml-2 h-[69px] w-[90px]"
                  width={90}
                  height={69}
                  alt="logo"
                />
                <OpenedOn openDate={openOn.formatted || ''}></OpenedOn>
              </div>
              <QrCode />
            </div>
          </div>
        </div>
      </div>

      <OptionCon
        showHash={showHash}
        setShowHash={setShowHash}
        showPnlAmount={showPnlAmount}
        setShowPnlAmount={setShowPnlAmount}
        onDownload={handleDownload}
      />
    </>
  );
}

function LeverageAndToken({
  leverage,
  token,
}: {
  leverage: number;
  token: string;
}) {
  return (
    <div className="flex items-center justify-start rounded-[48px] border-4 border-[#0b073b] p-2 pr-10">
      <div className="c-font-text-65 mr-8 rounded-[48px] bg-[#0b073b] py-2 px-6 text-[32px] leading-10 text-[#ebf26f]">
        {leverage}×
      </div>
      <div className="c-font-title-55 text-[44px] leading-[60px] text-[#333]">
        ${token}
      </div>
    </div>
  );
}

function Pnl({
  amount,
  percent,
  showAmount,
}: {
  showAmount: boolean;
  amount: string;
  percent: string;
}) {
  const isLoss = Number(amount) < 0;
  const absProfit = Math.abs(Number(amount));
  const absPercent = Math.abs(Number(percent));

  return (
    <>
      <div
        data-state={isLoss ? "loss" : "profit"}
        className="c-font-text-65 mt-6 mb-2 text-[80px] leading-[100px] data-[state=loss]:text-red data-[state=profit]:text-green"
      >
        {isLoss && "-"}
        {absPercent}
        <span className="text-[60px]">%</span>
      </div>
      {showAmount && (
        <div
          data-state={isLoss ? "loss" : "profit"}
          className="c-font-title-55 text-[48px] leading-[48px] data-[state=loss]:text-red data-[state=profit]:text-green"
        >
          {isLoss && "-"}${absProfit}
        </div>
      )}
    </>
  );
}

function ClosedImg() {
  return (
    <img
      className="absolute top-0 right-0 h-[240px] w-[240px]"
      width={240}
      height={240}
      src="/img/closed.png"
      alt="closed"
    />
  );
}

function LabelTitle({ children }: { children: ReactNode }) {
  return (
    <div className="c-font-title-55 text-2xl leading-9 text-gray">
      {children}
    </div>
  );
}

function ContentText({ children }: { children: ReactNode }) {
  return (
    <div className="break-all text-[30px] leading-[44px] text-[#0b073b]">
      {children}
    </div>
  );
}

function OpenedOn({ openDate }: { openDate: string }) {
  return (
    <div className="flex items-center">
      <img
        src="/icons/time-clock.svg"
        className="h-5 w-5"
        width={20}
        height={20}
        alt="open on"
      />
      <span className="c-font-title-55 ml-2 text-2xl leading-9 text-lightgray">
        Opened on {openDate}
      </span>
    </div>
  );
}

function QrCode() {
  return (
    <div className="relative border-[6px] border-brown">
      <div className="absolute -right-4 -bottom-4 h-[120px] w-[120px] border-r-[6px] border-b-[6px] border-brown"></div>
      <img
        className="h-[120px] w-[120px]"
        src="/img/qr-code.png"
        width={120}
        height={120}
        alt="logo"
      />
    </div>
  );
}

function OptionCon({
  showHash,
  setShowHash,
  showPnlAmount,
  setShowPnlAmount,
  onDownload,
}: {
  showHash: boolean;
  setShowHash: (_v: boolean) => void;
  showPnlAmount: boolean;
  setShowPnlAmount: (_v: boolean) => void;
  onDownload: () => void;
}) {
  const LabelText = ({
    htmlFor,
    children,
  }: {
    htmlFor: string;
    children: ReactNode;
  }) => {
    return (
      <label
        className="c-font-text-65 cursor-pointer select-none text-[30px] leading-[44px] text-[#333]"
        htmlFor={htmlFor}
      >
        {children}
      </label>
    );
  };

  return (
    <div>
      <div className="flex h-[28px] justify-between px-[34px]">
        <div className="w-6 border-x-4 border-black"></div>
        <div className="w-6 border-x-4 border-black"></div>
      </div>
      <div
        data-state="active"
        className="c-shadow-panel flex items-end justify-between rounded-3xl border-4 bg-white"
      >
        <div className="flex flex-col">
          <div className="c-font-title-55 text-2xl leading-9 text-[#333]">
            Optional information to share
          </div>
          <div className="mt-2 flex items-center">
            <div className="mr-5 flex items-center">
              <Checkbox
                id="hash"
                checked={showHash}
                onCheckedChange={(v) => setShowHash(!!v)}
                className="mr-3 h-[26px] w-[26px]"
              />
              <LabelText htmlFor="hash">Hashes</LabelText>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="amount"
                checked={showPnlAmount}
                onCheckedChange={(v) => setShowPnlAmount(!!v)}
                className="[10px] mr-3 h-[26px] w-[26px]"
              />
              <LabelText htmlFor="amount">PNL Amount</LabelText>
            </div>
          </div>
        </div>

        <button
          onClick={onDownload}
          className="c-font-text-65 rounded-2xl border-[3px] border-black bg-yellow py-[10px] px-[26px] text-[30px] text-black hover:brightness-95 active:brightness-105"
        >
          Download
        </button>
      </div>
    </div>
  );
}
