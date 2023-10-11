import { useEffect, useState } from "react";
import Image from "next/image";

import WithWalletBtn from "../../share/with-wallet-btn";
import { Textarea } from "../../ui/textarea";
import { IPosition } from "@/lib/types/position";
import { useMintPositionNft } from "@/lib/hooks/contract/use-mint-position-nft";
import { useTransferNFT } from "@/lib/hooks/contract/use-transfer-nft";
import { isAddress } from "viem";

function EmptyNFT() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-[200px] w-[200px] items-center justify-center">
        <Image
          width={146}
          height={141}
          src={`/icons/empty-forbidden.svg`}
          alt="no nft"
        ></Image>
      </div>
      <div className="w-[300px] text-center text-sm leading-4 text-gray">
        The position isn&apos;t eligibile for transfer. <br /> The related NFT
        should be minted in advance.
      </div>
    </div>
  );
}

export default function TransferDialogContent({
  position,
  onSuccess,
}: {
  position: IPosition;
  onSuccess: () => void;
}) {
  const [isNFT, setIsNFT] = useState<boolean>(false);

  const [sendAddress, setSendAddress] = useState<string>("");
  const isAddr = isAddress(sendAddress);

  const {
    write: mintAction,
    isLoading: mintLoading,
    isSuccess: mintSuccess,
  } = useMintPositionNft(position);

  const {
    write: transferAction,
    isLoading: transferLoading,
    isSuccess: transferSuccess,
  } = useTransferNFT(position);

  useEffect(() => {
    if ((position as any)?.isNFT) {
      setIsNFT(true);
    }

    if (mintSuccess) {
      setIsNFT(true);
    }
  }, [position, mintSuccess]);

  useEffect(() => {
    if (transferSuccess) {
      onSuccess();
    }
  }, [transferSuccess, onSuccess]);

  const handleMint = () => {
    if (!position?.positionAddr || isNFT) return;
    mintAction();
  };

  const handleTransfer = () => {
    if (!sendAddress || !isAddr) return;

    transferAction(sendAddress);
  };

  return (
    <div className="flex flex-col items-stretch gap-y-6">
      {isNFT ? (
        <div className="flex flex-col gap-y-3">
          <div className="text-sm leading-4 text-gray">Recipient Address</div>
          <Textarea
            placeholder="0x"
            value={sendAddress}
            onChange={(e) => setSendAddress(e.target.value)}
          />
        </div>
      ) : (
        <EmptyNFT />
      )}
      {isNFT ? (
        <WithWalletBtn
          disabled={!sendAddress || !isAddr}
          isLoading={transferLoading}
          onClick={() => handleTransfer()}
          className="flex-1"
        >
          {sendAddress && !isAddr ? "Invalid address" : "Transfer Position NFT"}
        </WithWalletBtn>
      ) : (
        <WithWalletBtn
          isLoading={mintLoading}
          onClick={() => handleMint()}
          className="flex-1"
        >
          Mint Position NFT
        </WithWalletBtn>
      )}
    </div>
  );
}
