import useTxStatus from "./use-tx-status";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import BN from "bn.js";
import { useTempMock } from "./temp-mock";
import useDepeProgram from "../use-depe-program";
import { usePositions } from "../api/use-positions";
import { useEffect } from "react";

export function useIncreasePosition() {
  // pool: IPool, position: IPosition
  const { owner, GlobalVars } = useTempMock();
  const { program } = useDepeProgram();

  const writeAction = async (amount: string) => {
    await program.methods
      .increasePosition(new BN(Number(amount)), new BN(5 * 100), [])
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

  const wrapRes = useTxStatus(writeAction);

  const { mutate: refetchPositions } = usePositions();

  useEffect(() => {
    if (wrapRes.isSuccess) {
      refetchPositions();
    }
  }, [wrapRes.isSuccess, refetchPositions]);

  return wrapRes;
}
