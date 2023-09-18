import { cn } from "@/lib/utils";

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
  return (
    <div className={cn("rounded-3xl bg-[#cff7e8] px-6 pt-6 pb-2", className)}>
      <div className="c-font-title-65 mb-3 text-xl text-black">
        Order Overview
      </div>
      <div>
        <DescRow title="Leverage">20×</DescRow>
        <DescRow title="Expiration">3 Days 10 Hours</DescRow>
        <DescRow title="Order Size">12.4K DOGE</DescRow>
        <DescRow title="Excepted Entry Price">$2,250 per DOGE</DescRow>
        <DescRow title="Est. Margin">10.0000 USDT</DescRow>
      </div>
    </div>
  );
}
