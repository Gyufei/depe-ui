import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "../../ui/checkbox";
import { useAtom } from "jotai";
import { SMintNftFlagAtom } from "@/lib/states/swap";
import { useTokens } from "@/lib/hooks/api/use-tokens";
import { Skeleton } from "@/components/ui/skeleton";

export default function NFTCheck() {
  const [nft, setNft] = useAtom(SMintNftFlagAtom);
  const { isLoading: isTokenLoading } = useTokens();

  return (
    <div className="flex items-center">
      {isTokenLoading && <Skeleton className="h-6 w-[72px]" />}
      {!isTokenLoading && (
        <>
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
          <Checkbox
            id="nft"
            checked={nft}
            onCheckedChange={(v) => setNft(!!v)}
            className="ml-[10px]"
          />
        </>
      )}
    </div>
  );
}
