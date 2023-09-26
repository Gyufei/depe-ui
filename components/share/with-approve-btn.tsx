import NP from "number-precision";
import { ButtonHTMLAttributes, ReactNode, useEffect, useState } from "react";

import { IToken } from "@/lib/types/token";
import WithWalletBtn from "./with-wallet-btn";
import { useApprove } from "@/lib/hooks/use-approve";

export default function WithApproveBtn({
  isActive = true,
  isLoading = false,
  useAmount,
  amount,
  token,
  onClick,
  children,
  ...rest
}: {
  isLoading: boolean;
  isActive?: boolean;

  token: IToken | null;
  useAmount: string;
  amount: string;

  children: ReactNode;
  onClick: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const {
    shouldApprove,
    isAllowanceLoading,
    isLoading: isApproveLoading,
    write: approveAction,
  } = useApprove(token?.address || null, useAmount);

  const handleBtnClick = () => {
    if (shouldApprove) {
      approveAction();
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

    if (NP.minus(useAmount || 0, amount || 0) > 0) {
      setBtnText(`Insufficient ${token?.symbol} `);
      setIsBtnDisabled(true);
      return;
    }

    if (shouldApprove) {
      setBtnText(`Approve ${token?.symbol}`);
      return;
    }

    setBtnText(null);
    setIsBtnDisabled(false);
  }, [isAllowanceLoading, useAmount, amount, token?.symbol, shouldApprove]);

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
