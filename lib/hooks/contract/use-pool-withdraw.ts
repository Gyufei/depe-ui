import { useEffect } from "react";
import { usePoolAsset } from "../api/use-pool-asset";
import useTxStatus from "./use-tx-status";
import useDepeProgram from "../use-depe-program";
import { useTempMock } from "./temp-mock";
import BN from "bn.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

export function usePoolWithdraw() {
  // poolAddr: IPool["poolAddr"] | null

  const { owner, GlobalVars } = useTempMock();
  const { program } = useDepeProgram();

  const writeAction = async (amount: bigint) => {
    await program.methods
      .withdraw(new BN(Number(amount)))
      .accounts({
        provider: owner.publicKey,
        userDepeTokenAccount: GlobalVars.userDepeTokenAccount,
        poolSourceTokenAccount: GlobalVars.poolSourceTokenAccount,
        userSourceTokenAccount: GlobalVars.userSourceTokenAccount,
        depeTokenMint: GlobalVars.depeBaseTokenMint!.publicKey,
        poolTokenAuthority: GlobalVars.initializeDataInfo.poolTokenAuthority,
        tokenProgram: TOKEN_PROGRAM_ID,
        initializeData: GlobalVars.initializeData,
      })
      .signers([owner])
      .rpc();
  };

  const { mutate: refetchPoolAsset } = usePoolAsset();

  const wrapRes = useTxStatus(writeAction);

  useEffect(() => {
    if (wrapRes.isSuccess) {
      refetchPoolAsset();
    }
  }, [wrapRes.isSuccess, refetchPoolAsset]);

  return wrapRes;
}
