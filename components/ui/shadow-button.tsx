import { cn } from "@/lib/utils";

export default function ShadowButton({
  onClick,
  className,
  children,
}: {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-xl border-2 border-black px-[30px] py-[14px] font-title font-bold leading-5 text-black shadow-black shadow-25 hover:-translate-x-[0.06rem] hover:-translate-y-[0.06rem] hover:shadow-30 active:translate-x-[0.06rem] active:translate-y-[0.06rem] active:shadow-20",
        className,
      )}
    >
      {children}
    </button>
  );
}
