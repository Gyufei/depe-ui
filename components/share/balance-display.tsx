import { formatNum } from "@/lib/utils/number";
import { Skeleton } from "../ui/skeleton";

export default function BalanceDisplay({
  isLoading,
  balance = "",
  prefixText,
  setMax,
}: {
  isLoading: boolean;
  balance: string | null;
  setMax: () => void;
  prefixText?: string;
}) {
  const handleMax = () => {
    if (isLoading || !balance) return;
    setMax();
  };

  return (
    <div className="flex items-center justify-end">
      <div className="balance-text mr-4 flex items-center text-sm leading-5 text-lightgray">
        {prefixText && <div>{prefixText}:</div>}
        {isLoading || !balance ? (
          <Skeleton className="ml-1 h-4 w-10" />
        ) : (
          <div className="ml-1">
            {balance!.length > 5 ? formatNum(balance!) : balance}
          </div>
        )}
      </div>
      <button
        onClick={handleMax}
        className="border-0 leading-5 text-accentblue"
      >
        Max
      </button>
    </div>
  );
}
