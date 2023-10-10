import { atom } from "jotai";

export type IActionName =
  | "OpenPosition"
  | "AppendMargin"
  | "WithdrawMargin"
  | "IncreasePosition"
  | "DecreasePosition"
  | "Deposit"
  | "Withdraw"
  | "Mint"
  | "TransferNFT";

export type IActionType = "success" | "warning" | "error";

export const GlobalMessageAtom = atom<{
  type: IActionType;
  message: string;
  actionName?: IActionName;
} | null>(null);

export const GlobalRefreshMapAtom = atom<
  Record<
    string,
    {
      actionNames: Array<IActionName>;
      cb: () => void;
    }
  >
>({});
