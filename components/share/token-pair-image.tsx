import { cn } from "@/lib/utils/utils";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

export default function TokenPairImage({
  className,
  img1,
  img2,
}: {
  className?: string;
  img1: string;
  img2: string;
}) {
  return (
    <div className={cn("relative h-8 w-8", className)}>
      {img1 ? (
        <Image
          width={32}
          height={32}
          src={img1}
          alt="token"
          className="c-image-shadow"
        ></Image>
      ) : (
        <Skeleton className="h-8 w-8 rounded-full" />
      )}
      {img2 ? (
        <Image
          width={16}
          height={16}
          src={img2}
          alt="token"
          className="c-image-shadow absolute right-0 bottom-0 z-10"
        ></Image>
      ) : (
        <Skeleton className="absolute right-0 bottom-0 z-10 h-4 w-4 rounded-full" />
      )}
    </div>
  );
}
