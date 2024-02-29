import * as anchor from "@coral-xyz/anchor";
import { useEffect } from "react";
import { useAtomValue } from "jotai";

import {
  SAmountInMaxAtom,
  SBaseTokenAmountAtom,
  SBaseTokenAtom,
  SLeverageAtom,
  // SMintNftFlagAtom,
  SPoolAtom,
  SQuoteTokenAmountAtom,
  SQuoteTokenAtom,
} from "@/lib/states/swap";
import { usePositions } from "../api/use-positions";
import useTxStatus from "./use-tx-status";
import { useTempMock } from "./temp-mock";
import useDepeProgram from "../use-depe-program";
import { PublicKey } from "@solana/web3.js";
import { BN } from "bn.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

export function useOpenPosition() {
  const pool = useAtomValue(SPoolAtom);
  const baseToken = useAtomValue(SBaseTokenAtom);
  const baseTokenAmount = useAtomValue(SBaseTokenAmountAtom);
  const quoteToken = useAtomValue(SQuoteTokenAtom);
  const amountInMax = useAtomValue(SAmountInMaxAtom);
  const quoteTokenAmount = useAtomValue(SQuoteTokenAmountAtom);
  const leverage = useAtomValue(SLeverageAtom);
  // const mintNFTFlag = useAtomValue(SMintNftFlagAtom);

  const { owner, GlobalVars } = useTempMock();
  const { program, systemProgram } = useDepeProgram();

  const writeAction = async () => {
    if (
      !pool ||
      !amountInMax ||
      !baseToken ||
      !baseTokenAmount ||
      !quoteToken ||
      !quoteTokenAmount ||
      !leverage
    )
      return;

    const seedAccount = new anchor.web3.Keypair().publicKey;

    const position = PublicKey.findProgramAddressSync(
      [Buffer.from("position"), seedAccount.toBuffer()],
      program.programId,
    )[0];

    GlobalVars.position = position || null;

    await program.methods
      .openPosition(new BN(500), new BN(5 * 100), new BN(5 * 100), [])
      .accounts({
        trader: owner.publicKey,
        seedAccount,
        position,
        pool: GlobalVars.pool,
        userSourceTokenAccount: GlobalVars.userSourceTokenAccount,
        poolSourceTokenAccount: GlobalVars.poolSourceTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram,
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
