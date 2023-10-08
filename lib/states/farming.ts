import { atom } from "jotai";
import { IToken } from "../types/token";
import { IPool } from "../types/pool";
import { RATING_LEVELS } from "../constant";

export const FMarginTokenAtom = atom<IToken | null>(null);
export const FRatingLevelAtom = atom<(typeof RATING_LEVELS)[number] | null>(
  null,
);
export const FLeverageAtom = atom<number | null>(null);

export const FPoolAtom = atom<IPool | null>(null);

export const FDepositAmountAtom = atom<string | null>(null);
