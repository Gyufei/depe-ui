import Image from "next/image";
import { usePublicClient } from "wagmi";

import { Skeleton } from "@/components/ui/skeleton";
import { getChainLogo } from "@/lib/chain-configs";

export default function CurrChainLogo() {
  const { chain } = usePublicClient();

  if (!chain) return <Skeleton className="h-10 w-10 rounded-full" />;

  return (
    <Image
      width={40}
      height={40}
      src={getChainLogo(chain.name) || ""}
      alt="current chain logo"
      className="c-image-shadow z-10"
    ></Image>
  );
}
