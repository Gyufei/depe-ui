import { useEffect } from "react";
import { usePositions } from "../api/use-positions";
import BN from "bn.js";
import { useTempMock } from "./temp-mock";
import useDepeProgram from "../use-depe-program";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import useTxStatus from "./use-tx-status";

export function useDecreasePosition() {
  // pool: IPool, position: IPosition
  const { owner, GlobalVars } = useTempMock();
  const { program } = useDepeProgram();

  const writeAction = async (amount: string) => {
    await program.methods
      .decreasePosition(new BN(Number(amount)), new BN(5 * 100), [])
      .accounts({
        trader: owner.publicKey,
        position: GlobalVars.position,
        pool: GlobalVars.pool,
        userSourceTokenAccount: GlobalVars.userSourceTokenAccount,
        poolSourceTokenAccount: GlobalVars.poolSourceTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
        poolTokenAuthority: GlobalVars.initializeDataInfo.poolTokenAuthority,
        initializeData: GlobalVars.initializeData,
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
