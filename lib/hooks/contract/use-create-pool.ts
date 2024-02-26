import { BN } from "bn.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  Token,
  u64,
} from "@solana/spl-token";
import {
  PublicKey,
  SystemProgram,
  Connection,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

export function useCreatePool() {
  let margin_coin = baseTokenMint.publicKey;
  let max_leverage = new BN(500);
  let trading_fee = new BN(3000);
  let duration_days = new BN(7776000);

  const seedAccount = new anchor.web3.Keypair().publicKey;

  // await program.methods.
  pool = PublicKey.findProgramAddressSync(
    [Buffer.from("pool"), seedAccount.toBuffer()],
    program.programId,
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

  return {
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    write: writeAction,
  };
}
