import Farming from "@/components/simple/farming";
import Portfolio from "@/components/simple/portfolio";
import Swap from "@/components/simple/swap";

export default function Simple() {
  return (
    <main className="grid grid-cols-3 space-x-12 pt-[72px]">
      <Portfolio />
      <Swap />
      <Farming />
    </main>
  );
}
