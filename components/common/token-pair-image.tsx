import { cn } from "@/lib/utils";
import Image from "next/image";

export default function TokenPairImage({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-8 w-8", className)}>
      <Image
        width={32}
        height={32}
        src="/icons/dev/DOGE.svg"
        alt="token"
        className="c-image-shadow"
      ></Image>
      <Image
        width={16}
        height={16}
        src="/icons/dev/USDT.svg"
        alt="token"
        className="c-image-shadow absolute right-0 bottom-0 z-10"
      ></Image>
    </div>
  );
}
