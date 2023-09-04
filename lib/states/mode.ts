import { atomWithStorage } from "jotai/utils";

export type TMode = "Simple" | "Pro";

export const ModeAtom = atomWithStorage<TMode>("mode", "Simple");
