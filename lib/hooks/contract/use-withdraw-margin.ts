import { useEffect } from "react";
import { usePositions } from "../api/use-positions";
import useTxStatus from "./use-tx-status";
import { useTempMock } from "./temp-mock";
import useDepeProgram from "../use-depe-program";
import BN from "bn.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

export function useWithdrawMargin() {
  // poolAddr: Address, positionAddr: Address
  const { owner, GlobalVars } = useTempMock();
  const { program } = useDepeProgram();

  const writeAction = async (amount: bigint) => {
    // if (!poolAddr || !positionAddr) return;

    await program.methods
      .decreaseMargin(new BN(Number(amount)))
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
