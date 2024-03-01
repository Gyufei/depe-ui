import * as anchor from "@coral-xyz/anchor";
import { TOKEN_PROGRAM_ID, Token } from "@solana/spl-token";
import useProvider from "../use-provider";
import { PublicKey } from "@solana/web3.js";
import useDepeProgram from "../use-depe-program";

const payer = anchor.web3.Keypair.fromSecretKey(
  new Uint8Array([
    138, 146, 108, 133, 166, 90, 62, 22, 179, 7, 43, 203, 139, 57, 163, 139,
    104, 91, 34, 245, 245, 255, 125, 83, 203, 52, 142, 185, 208, 12, 188, 152,
    210, 141, 199, 206, 59, 163, 186, 2, 37, 68, 214, 64, 41, 74, 110, 92, 104,
    72, 56, 117, 36, 178, 72, 195, 243, 146, 172, 63, 121, 26, 237, 252,
  ]),
);

const owner = anchor.web3.Keypair.fromSecretKey(
  new Uint8Array([
    184, 181, 218, 215, 168, 215, 91, 89, 41, 121, 215, 82, 220, 59, 82, 231,
    206, 47, 65, 87, 216, 79, 4, 41, 228, 74, 163, 80, 222, 138, 205, 70, 107,
    0, 59, 249, 234, 197, 90, 3, 74, 236, 0, 4, 155, 87, 20, 204, 110, 75, 226,
    90, 104, 159, 49, 28, 125, 166, 179, 91, 178, 63, 134, 191,
  ]),
);

interface Vars {
  baseTokenMint: Token | null;
  // FWe32j9zMJk6azFiEZpN7XrwCceksZUXaEZtjLZ9tqrV
  quoteTokenMint: Token | null;
  // BVuxiGHYcarxYc98fq2RSYGdzdJq64jFuWErTXQqoGJV
  depeBaseTokenMint: Token | null;

  initializeData: PublicKey | null;

  initializeDataInfo: any | null;
  userSourceTokenAccount: PublicKey | null;
  poolSourceTokenAccount: PublicKey | null;
  userDepeTokenAccount: PublicKey | null;

  pool: PublicKey | null;
  position: PublicKey | null;
}

export const GlobalVars: Vars = {
  baseTokenMint: null,

  // FWe32j9zMJk6azFiEZpN7XrwCceksZUXaEZtjLZ9tqrV
  quoteTokenMint: null,
  // BVuxiGHYcarxYc98fq2RSYGdzdJq64jFuWErTXQqoGJV
  depeBaseTokenMint: null,
  initializeData: null,
  initializeDataInfo: null,
  userSourceTokenAccount: null,
  poolSourceTokenAccount: null,
  userDepeTokenAccount: null,
  pool: null,
  position: null,
};

export function useTempMock() {
  const { provider } = useProvider();
  const { program } = useDepeProgram();
  const systemProgram = anchor.web3.SystemProgram.programId;

  async function init() {
    GlobalVars.initializeData = PublicKey.findProgramAddressSync(
      [Buffer.from("initialize_data")],
      program.programId,
    )[0];

    await program.methods
      .initialize()
      .accounts({
        signer: owner.publicKey,
        initializeData: GlobalVars.initializeData,
        systemProgram,
      })
      .signers([owner])
      .rpc();

    GlobalVars.initializeDataInfo = await program.account.initializeData.fetch(
      GlobalVars.initializeData,
    );
    console.log("InitializeDataInfo: ", GlobalVars.initializeDataInfo);

    GlobalVars.baseTokenMint = await Token.createMint(
      provider.connection,
      payer,
      owner.publicKey,
      null,
      2,
      TOKEN_PROGRAM_ID,
    );

    GlobalVars.depeBaseTokenMint = await Token.createMint(
      provider.connection,
      payer,
      GlobalVars.initializeDataInfo.poolTokenAuthority,
      null,
      2,
      TOKEN_PROGRAM_ID,
    );

    GlobalVars.quoteTokenMint = await Token.createMint(
      provider.connection,
      payer,
      owner.publicKey,
      null,
      2,
      TOKEN_PROGRAM_ID,
    );
    console.log("quoteTokenMint: ", GlobalVars.quoteTokenMint);
  }

  return {
    init,
    payer,
    owner,
    GlobalVars,
  };
}
