import { useState } from "react";
import Image from "next/image";

import WithWalletBtn from "../../share/with-wallet-btn";
import { Textarea } from "../../ui/textarea";
import { IPosition } from "@/lib/types/position";

function EmptyNFT() {
  return (
    <div className="flex flex-col items-center">
      <Image
        width={200}
        height={200}
        src={`/icons/no-nft.svg`}
        alt="no nft"
      ></Image>
      <div className="w-[300px] text-center text-sm leading-4 text-gray">
        The position isn&apos;t eligibile for transfer. <br /> The related NFT
        should be minted in advance.
      </div>
    </div>
  );
}

export default function TransferDialogContent({
  position,
}: {
  position: IPosition;
}) {
  console.log(position);
  const [hasNFT] = useState(false);

  return (
    <div className="flex flex-col items-stretch gap-y-6">
      {hasNFT ? (
        <div className="flex flex-col gap-y-3">
          <div className="text-sm leading-4 text-gray">Recipient Address</div>
          <Textarea placeholder="0x" />
        </div>
      ) : (
        <EmptyNFT />
      )}
      <WithWalletBtn onClick={() => {}} className="flex-1">
        {hasNFT ? "Transfer Position NFT" : "Mint Position NFT"}
      </WithWalletBtn>
    </div>
  );
}
