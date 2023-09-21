import { AddressType } from "../types/address";

export function encodePath(
  path: Array<AddressType>,
  fees: number[],
): AddressType {
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
