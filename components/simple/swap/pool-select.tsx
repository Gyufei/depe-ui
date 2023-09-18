import { useState } from "react";
import Image from "next/image";

import PoolCircleIcon from "/public/icons/pool-circle.svg";
import Triangle from "/public/icons/triangle.svg";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DialogGimp from "../../share/dialog-gimp";
import SelectPoolDialogContent from "../../share/select-pool-dialog-content";

export default function PoolSelect() {
  const [selectedPool] = useState(100);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={(isOpen) => setDialogOpen(isOpen)}>
      <DialogTrigger asChild>
        <div className="flex cursor-pointer items-center rounded-full border border-black px-[10px] py-[1px] text-black">
          <Image
            width={12.5}
            height={12.5}
            src={PoolCircleIcon}
            alt="pools"
          ></Image>
          <div className="ml-1 mr-[14px] leading-[22px]">#{selectedPool}</div>
          <Image
            width={14}
            height={8}
            src={Triangle}
            alt="triangle"
            className="-rotate-90"
          ></Image>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[400px] p-0 pb-6 md:w-[400px]">
        <DialogGimp />
        <DialogTitle className="px-6 pt-6">Select Pool</DialogTitle>
        <SelectPoolDialogContent />
      </DialogContent>
    </Dialog>
  );
}
