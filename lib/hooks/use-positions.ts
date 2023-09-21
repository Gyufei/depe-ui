import { useMemo } from "react";
import { IPosition } from "../types/position";
import { useGqlRequest } from "./use-graphql";
import { PositionsDoc } from "../gql-document/position";

export function usePositions() {
  const { data: positionsRes, isLoading } = useGqlRequest(
    PositionsDoc("0x63469916bcE971091c0E651a706200159622A8DB"),
  );

  const positions: Array<IPosition> = useMemo(() => {
    const poolsData = positionsRes?.positions?.data || [];
    return poolsData;
  }, [positionsRes]);

  return { positions, isLoading };
}
