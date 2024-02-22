import { atom } from "jotai";

export type TPDPanel = "Portfolio" | "Positions" | null;

export const PDActivePanelAtom = atom<TPDPanel>("Portfolio");
