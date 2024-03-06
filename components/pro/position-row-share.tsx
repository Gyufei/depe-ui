import Image from "next/image";
import { IPool } from "@/lib/types/pool";
import { IPosition } from "@/lib/types/position";
import { useState } from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ShareDialogContent from "../simple/portfolio/share-dialog-content";

export default function PositionRowShare({
  pool,
  position,
}: {
  pool: IPool;
  position: IPosition;
}) {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  const handleShareDialog = (val: boolean) => {
    setShareDialogOpen(val);
  };

  return (
    <Dialog
      open={shareDialogOpen}
      onOpenChange={(isOpen) => handleShareDialog(isOpen)}
    >
      <DialogTrigger asChild>
        <Image
          src="/icons/share.svg"
          width={16}
          height={16}
          alt="share"
          className="cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent
        showClose={false}
        className="w-[750px] scale-50 gap-0 rounded-none border-0 p-0 shadow-none"
      >
        <ShareDialogContent position={position} pool={pool} />
      </DialogContent>
    </Dialog>
  );
}
