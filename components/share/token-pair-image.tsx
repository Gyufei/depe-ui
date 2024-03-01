import { cn } from "@/lib/utils/common";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { useMediaQuery } from "@/lib/hooks/common/use-media-query";

export default function TokenPairImage({
  className,
  img1,
  img2,
}: {
  className?: string;
  img1: string;
  img2: string;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className={cn("relative h-8 w-8", className)}>
      {img1 ? (
        <Image
          width={isDesktop ? 32 : 24}
          height={isDesktop ? 32 : 24}
          src={img1}
          alt="token"
          className="c-image-shadow"
        ></Image>
      ) : (
        <Skeleton className="h-8 w-8 rounded-full" />
      )}
      {img2 ? (
        <Image
          width={isDesktop ? 16 : 12}
          height={isDesktop ? 16 : 12}
          src={img2}
          alt="token"
          className="c-image-shadow absolute md:right-0 md:bottom-0 right-1 bottom-1 z-10"
        ></Image>
      ) : (
        <Skeleton className="absolute right-0 bottom-0 z-10 h-4 w-4 rounded-full" />
      )}
    </div>
  );
}
