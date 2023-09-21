import { atom } from "jotai";
import { IToken } from "../types/token";
import { IPool } from "../types/pool";

export const SBaseTokenAtom = atom<IToken | null>(null);
export const SQuoteTokenAtom = atom<IToken | null>(null);
export const SBaseTokenAmountAtom = atom<string | null>(null);
export const SQuoteTokenAmountAtom = atom<string | null>(null);
export const SPoolAtom = atom<IPool | null>(null);

export const SLeverageAtom = atom<number | null>(1);
export const SMintNftFlagAtom = atom<boolean>(false);
