import { atom } from "jotai";

export type TPanel = "Portfolio" | "Swap" | "Farming" | null;

export const ActivePanelAtom = atom<TPanel>(null);
