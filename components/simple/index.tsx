import Farming from "@/components/simple/farming";
import Portfolio from "@/components/simple/portfolio";
import Swap from "@/components/simple/swap";

export default function Simple() {
  return (
    <main className="flex min-h-[800px] justify-between pt-[72px]">
      <Portfolio />
      <Swap />
      <Farming />
    </main>
  );
}
