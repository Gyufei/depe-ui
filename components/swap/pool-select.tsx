import { useState } from "react";
import Image from "next/image";

import PoolCircleIcon from "/public/icons/pool-circle.svg";
import Triangle from "/public/icons/triangle.svg";

export default function PoolSelect() {
  const [pool] = useState(100);

  return (
    <div className="flex cursor-pointer items-center rounded-full border border-black px-[10px] py-[1px]">
      <Image
        width={12.5}
        height={12.5}
        src={PoolCircleIcon}
        alt="pools"
      ></Image>
      <div className="ml-1 mr-[14px] leading-[22px]">#{pool}</div>
      <Image
        width={14}
        height={8}
        src={Triangle}
        alt="triangle"
        className="-rotate-90"
      ></Image>
    </div>
  );
}
