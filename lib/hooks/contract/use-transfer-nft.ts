import { useEffect } from "react";
import { IPosition } from "../../types/position";
import { usePositions } from "../api/use-positions";
import useTxStatus from "./use-tx-status";

export function useTransferNFT(position: IPosition) {
  const writeAction = async (to: string) => {
    if (!position?.isNFT || !to) return;
  };

  const { mutate: refetchPositions } = usePositions();
  const wrapRes = useTxStatus(writeAction);

  useEffect(() => {
    if (wrapRes.isSuccess) {
      refetchPositions();
    }
  }, [wrapRes.isSuccess, refetchPositions]);

  return wrapRes;
}
