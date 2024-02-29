import * as anchor from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { DepeAbi } from "@/lib/abi/depe";
import useProvider from "./use-provider";

export default function useDepeProgram() {
  const { provider } = useProvider();

  const programId = new PublicKey(DepeAbi.metadata.address);
  const program = new anchor.Program(DepeAbi as any, programId, provider);
  const systemProgram = anchor.web3.SystemProgram.programId;

  return {
    program,
    programId,
    systemProgram,
  };
}
