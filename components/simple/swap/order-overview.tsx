import { SOrderOverViewAtom } from "@/lib/states/swap";
import { cn } from "@/lib/utils/utils";
import { useAtomValue } from "jotai";

function DescRow({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b border-[#C0E5DB] pt-[20px] pb-[19px] leading-[17px] last:border-0">
      <div className="text-sm text-black">{title}</div>
      <div className="c-font-title-65 text-black">{children}</div>
    </div>
  );
}

export default function OrderOverview({ className }: { className?: string }) {
  const orderOverview = useAtomValue(SOrderOverViewAtom);
  if (!orderOverview) return null;

  return (
    <div className={cn("rounded-3xl bg-black/2 px-6 pt-6 pb-2", className)}>
      <div className="c-font-title-65 mb-3 text-xl text-black">
        Order Overview
      </div>
      <div>
        <DescRow title="Leverage">{orderOverview.leverage}</DescRow>
        <DescRow title="Expiration">{orderOverview.expiration}</DescRow>
        <DescRow title="Order Size">{orderOverview.orderSize}</DescRow>
        <DescRow title="Expected Entry Price">
          {orderOverview.entryPrice}
        </DescRow>
        <DescRow title="Est. Margin">{orderOverview.marginAmount}</DescRow>
      </div>
    </div>
  );
}
