import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "../ui/checkbox";

export default function NFTCheck() {
  return (
    <div className="flex items-center">
      <label
        htmlFor="nft"
        className="mr-[6px] mt-[2px] leading-[22px] text-black"
      >
        NFT
      </label>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <HelpCircle className="h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent>
            <p>NFT generation would cost you more gas.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Checkbox id="nft" className="ml-[10px]" />
    </div>
  );
}
