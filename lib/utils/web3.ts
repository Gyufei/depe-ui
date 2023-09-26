import { Address, encodeAbiParameters } from "viem";
import { UNISWAP_FEES } from "../constant";

export function encodePath(path: Array<Address>, fees: number[]): Address {
  if (path.length != fees.length + 1) {
    throw new Error("path/fee lengths do not match");
  }

  let encoded = "";
  for (let i = 0; i < fees.length; i++) {
    // 20 byte encoding of the address
    encoded += path[i].slice(2);
    // 3 byte encoding of the fee
    encoded += fees[i].toString(16).padStart(2 * 3, "0");
  }

  // encode the final token
  encoded += path[path.length - 1].slice(2);

  return `0x${encoded.toLowerCase()}`;
}

export function encodeTxExtendedParamsBytes(
  address1: Address,
  address2: Address,
): Address {
  const path = [address1, address2];
  const ePath = encodePath(path, UNISWAP_FEES);
  const abiEncodedPath = encodeAbiParameters(
    [
      {
        name: "extendedParamsBytes",
        type: "bytes",
      },
    ],
    [ePath],
  );

  return abiEncodedPath;
}

export function truncateAddr(
  address: Address,
  params = {
    nPrefix: 4,
    nSuffix: 4,
  },
): Address {
  if (!address) return address;

  const { nPrefix, nSuffix } = params;

  const match = address.match(/^(0x[a-zA-Z0-9])[a-zA-Z0-9]+([a-zA-Z0-9])$/);

  const nTotalIsLongerThanAddress =
    (nPrefix || 0) + (nSuffix || 0) > address.length;

  return match && !nTotalIsLongerThanAddress
    ? `0x${address.slice(2, 2 + (nPrefix || 4))}…
      ${address.slice(address.length - (nSuffix || 4))}`
    : address;
}
