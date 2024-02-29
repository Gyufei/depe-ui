import * as anchor from "@coral-xyz/anchor";
import { BN } from "bn.js";
import { PublicKey } from "@solana/web3.js";
import useTxStatus from "./use-tx-status";
import useDepeProgram from "../use-depe-program";
import { useTempMock } from "./temp-mock";
import { usePoolAsset } from "../api/use-pool-asset";
import { useEffect } from "react";

export function useCreatePool() {
  const { owner, GlobalVars } = useTempMock();
  const { programId, program } = useDepeProgram();

  async function writeAction() {
    const margin_coin = GlobalVars.baseTokenMint?.publicKey;
    const max_leverage = new BN(500);
    const trading_fee = new BN(3000);
    const duration_days = new BN(7776000);

    const seedAccount = new anchor.web3.Keypair().publicKey;
    const systemProgram = anchor.web3.SystemProgram.programId;

    const pool = PublicKey.findProgramAddressSync(
      [Buffer.from("pool"), seedAccount.toBuffer()],
      programId,
    )[0];

    await program.methods
      .createPool(
        margin_coin,
        {
          high: {},
        },
        max_leverage,
        {
          orca: {},
        },
        trading_fee,
        duration_days,
      )
      .accounts({
        creator: owner.publicKey,
        seedAccount,
        pool: pool,
        systemProgram,
      })
      .signers([owner])
      .rpc();
  }

  const { mutate: refetchPoolAsset } = usePoolAsset();

  const wrapRes = useTxStatus(writeAction);

  useEffect(() => {
    if (wrapRes.isSuccess) {
      refetchPoolAsset();
    }
  }, [wrapRes.isSuccess, refetchPoolAsset]);

  return wrapRes;
}
