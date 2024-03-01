import NP from "number-precision";
import { ButtonHTMLAttributes, ReactNode, useEffect, useState } from "react";

import { IToken } from "@/lib/types/token";
import WithWalletBtn from "./with-wallet-btn";
import { useApprove } from "@/lib/hooks/contract/use-approve";

export default function WithApproveBtn({
  isActive = true,
  isLoading = false,
  balanceAmount,
  willUseAmount,
  liquidityAmount,
  token,
  onClick,
  children,
  ...rest
}: {
  isLoading: boolean;
  isActive?: boolean;

  token: IToken | null;
  balanceAmount: string;
  willUseAmount: string;
  liquidityAmount?: string;

  children: ReactNode;
  onClick: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const {
    shouldApprove,
    isAllowanceLoading,
    isLoading: isApproveLoading,
    write: approveAction,
  } = useApprove(token?.address || null, willUseAmount);

  const handleBtnClick = () => {
    if (shouldApprove) {
      (approveAction as any)();
    } else {
      onClick();
    }
  };

  const [btnText, setBtnText] = useState<string | null>(null);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  useEffect(() => {
    if (isAllowanceLoading) {
      setIsBtnDisabled(true);
      return;
    }

    if (NP.minus(willUseAmount || 0, balanceAmount || 0) > 0) {
      setBtnText(`Insufficient ${token?.symbol || ""} `);
      setIsBtnDisabled(true);
      return;
    }

    if (
      liquidityAmount != undefined &&
      NP.minus(willUseAmount || 0, liquidityAmount) > 0
    ) {
      setBtnText(`Insufficient liquidity`);
      setIsBtnDisabled(true);
      return;
    }

    if (shouldApprove) {
      setBtnText(`Approve ${token?.symbol || ""}`);
      return;
    }

    setBtnText(null);
    setIsBtnDisabled(false);
  }, [
    isAllowanceLoading,
    willUseAmount,
    balanceAmount,
    token?.symbol,
    shouldApprove,
    liquidityAmount,
  ]);

  return (
    <WithWalletBtn
      {...rest}
      isActive={isActive}
      disabled={isBtnDisabled || rest?.disabled}
      isLoading={shouldApprove ? isApproveLoading : isLoading}
      onClick={handleBtnClick}
    >
      {btnText ? btnText : children}
    </WithWalletBtn>
  );
}
