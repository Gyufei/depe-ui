import { useEffect } from "react";
import { usePoolAsset } from "../api/use-pool-asset";
import BN from "bn.js";
import useTxStatus from "./use-tx-status";
import { useTempMock } from "./temp-mock";
import { PublicKey } from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import useDepeProgram from "../use-depe-program";
import { IPool } from "@/lib/types/pool";
import { IToken } from "@/lib/types/token";

export function usePoolDeposit(
  poolAddr: IPool["poolAddr"] | null,
  baseToken: IToken | null,
) {
  console.log(poolAddr, baseToken);
  const { owner, GlobalVars, init } = useTempMock();
  const { program, systemProgram } = useDepeProgram();

  const writeAction = async (amount: BN) => {
    await init();
    // if (!poolAddr || !amount) return;
    const userSourceTokenAccount =
      await GlobalVars.baseTokenMint?.createAssociatedTokenAccount(
        owner.publicKey,
      );
    GlobalVars.userSourceTokenAccount = userSourceTokenAccount || null;

    const poolSourceTokenAccount = PublicKey.findProgramAddressSync(
      [
        GlobalVars.initializeDataInfo.poolTokenAuthority.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        GlobalVars.baseTokenMint?.publicKey.toBuffer(),
      ],
      ASSOCIATED_TOKEN_PROGRAM_ID,
    )[0];
    GlobalVars.poolSourceTokenAccount = poolSourceTokenAccount || null;

    const userDepeTokenAccount = PublicKey.findProgramAddressSync(
      [
        owner.publicKey.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        GlobalVars.depeBaseTokenMint!.publicKey.toBuffer(),
      ],
      ASSOCIATED_TOKEN_PROGRAM_ID,
    )[0];

    await GlobalVars.baseTokenMint!.mintTo(
      userSourceTokenAccount!,
      owner,
      [],
      10000000000000 * 100,
    );

    console.log("here here");

    await program.methods
      .deposit(amount)
      .accounts({
        provider: owner.publicKey,
        userSourceTokenAccount,
        userDepeTokenAccount,
        poolSourceTokenAccount,
        sourceTokenMint: GlobalVars.baseTokenMint!.publicKey,
        depeTokenMint: GlobalVars.depeBaseTokenMint!.publicKey,
        poolTokenAuthority: GlobalVars.initializeDataInfo.poolTokenAuthority,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram,
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
