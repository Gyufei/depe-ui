import { atom } from "jotai";
import { IToken } from "../types/token";
import { IPool } from "../types/pool";
import { IOrderOverview } from "../types/order-overview";

export const SBaseTokenAtom = atom<IToken | null>(null);
export const SQuoteTokenAtom = atom<IToken | null>(null);

export const SBaseTokenBalanceAtom = atom<string | null>(null);
export const SBaseTokenAmountAtom = atom<string | null>(null);
export const SQuoteTokenAmountAtom = atom<string | null>(null);
export const SAmountInMaxAtom = atom<bigint | null>(null);

export const SSlippageAtom = atom<string>("0.5");
export const SLeverageAtom = atom<number>(5);
export const SMintNftFlagAtom = atom<boolean>(false);
export const SPoolAtom = atom<IPool | null>(null);

export const SOrderOverViewAtom = atom<IOrderOverview | null>(null);
