import { atom } from "jotai";

export type TPanel = "Portfolio" | "Swap" | "Farming" | null;

export const PanelOrderAtom = atom<Array<TPanel>>(["Portfolio", "Swap", "Farming"]);
export const ActivePanelAtom = atom<TPanel>("Swap");
export const HoverPanelAtom = atom<TPanel>(null);
