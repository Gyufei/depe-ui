import Image from "next/image";

export default function DexSelect() {
  return (
    <div className="flex rounded-xl border-2 border-black px-4 py-2 justify-between items-center">
      <div className="flex flex-col">
        <div className="leading-6 text-black">Uniswap</div>
        <div className="text-xs leading-[18px] text-gray">Dex</div>
      </div>

      <div className="flex items-end justify-center ml-3">
        <Image
          width={32}
          height={32}
          src={`/icons/uniswap.svg`}
          alt="token"
        ></Image>
      </div>
    </div>
  );
}
