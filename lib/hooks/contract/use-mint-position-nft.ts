import { IPosition } from "../../types/position";
import useTxStatus from "./use-tx-status";

export function useMintPositionNft(position: IPosition) {
  console.log(position);
  const writeAction = async () => {};

  const wrapRes = useTxStatus(writeAction);

  return wrapRes;
}
