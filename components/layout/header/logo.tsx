import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex h-8 w-8 items-center justify-center md:h-16 md:w-16">
      <Image
        className="hidden md:block"
        width={57.23}
        height={44.11}
        src="/img/logo.svg"
        alt="logo"
      ></Image>
      <Image
        className="c-image-shadow md:hidden"
        width={32}
        height={32}
        src="/icons/solana.svg"
        alt="logo"
      ></Image>
    </div>
  );
}
