import Image from "next/image";

export default function Logo() {
  return (
    <div className="w-16 h-16 flex justify-center items-center">
      <Image
        className=""
        width={57.23}
        height={44.11}
        src="/img/logo.svg"
        alt="logo"
      ></Image>
    </div>
  );
}
