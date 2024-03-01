import { useEffect } from "react";
import { usePositions } from "../api/use-positions";
import { useTempMock } from "./temp-mock";
import useDepeProgram from "../use-depe-program";
import BN from "bn.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import useTxStatus from "./use-tx-status";
import { IToken } from "@/lib/types/token";

export function useAppendMargin(
  poolAddr: string,
  positionAddr: string,
  baseToken: IToken | null,
) {
  console.log(poolAddr, positionAddr, baseToken);

  const { owner, GlobalVars } = useTempMock();
  const { program } = useDepeProgram();

  const writeAction = async (amount: number) => {
    if (!poolAddr || !positionAddr || !amount) return;

    await program.methods
      .increaseMargin(new BN(Number(amount)))
      .accounts({
        trader: owner.publicKey,
        position: GlobalVars.position,
        pool: GlobalVars.pool,
        userSourceTokenAccount: GlobalVars.userSourceTokenAccount,
        poolSourceTokenAccount: GlobalVars.poolSourceTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .signers([owner])
      .rpc();
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
