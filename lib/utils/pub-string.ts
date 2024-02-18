import { PublicKey } from "@solana/web3.js";

import { isString } from "lodash";

const pubCache = new WeakMap<PublicKey, string>();
const reversePubCache = new Map<string, WeakRef<PublicKey>>();

export default function toPubString(
  mint: PublicKey | string | undefined | null,
): string {
  if (!mint) return "";
  if (isString(mint)) return mint;
  if (pubCache.has(mint)) {
    return pubCache.get(mint)!;
  } else {
    const mintString = mint.toBase58();
    pubCache.set(mint, mintString);
    reversePubCache.set(mintString, new WeakRef(mint));
    return mintString;
  }
}

export function toPub(mint: PublicKey | string): PublicKey;
export function toPub(mint: undefined): undefined;
export function toPub(
  mint: PublicKey | string | undefined,
): PublicKey | undefined;
export function toPub(
  mint: PublicKey | string | undefined,
): PublicKey | undefined {
  if (!mint) return undefined;
  if (mint instanceof PublicKey) return mint;
  if (reversePubCache.has(mint)) {
    const pub = reversePubCache.get(mint)!.deref(); // may be undefined
    if (pub) return pub;
  }

  const pub = (() => {
    try {
      return new PublicKey(mint);
    } catch {
      return undefined;
    }
  })();
  pub && reversePubCache.set(mint, new WeakRef(pub));
  pub && pubCache.set(pub, mint);
  return pub;
}
