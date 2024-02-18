import Image from "next/image";
import { useAtomValue } from "jotai";
import { ClusterAtom, ClusterType } from "@/lib/states/cluster";

export default function CurrChainLogo() {
  const cluster = useAtomValue(ClusterAtom);

  const isDev = cluster === ClusterType.Devnet;

  return (
    <div className="relative">
      <Image
        width={40}
        height={40}
        src="/icons/solana.svg"
        alt="current chain logo"
        className="c-image-shadow z-10 bg-white"
      ></Image>

      {isDev && (
        <Image
          width={20}
          height={20}
          src="/icons/dev-flag.svg"
          alt="dev flag"
          className="bg absolute bottom-0 -right-1 z-[11] rounded-full bg-white"
        ></Image>
      )}
    </div>
  );
}
