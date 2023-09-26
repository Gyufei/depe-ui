import { cn } from "@/lib/utils/utils";

export default function LoopProgress({ className }: { className?: string }) {
  return (
    <div className={cn("h-1 rounded-sm bg-blue", className)}>
      <div className="h-full w-0 animate-[extend_5s_infinite_linear] rounded-sm bg-black" />
    </div>
  );
}
