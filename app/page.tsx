import Farming from "@/components/faming";
import Header from "@/components/header";
import Portfolio from "@/components/portfolio";
import Swap from "@/components/swap";

export default async function Home() {
  return (
    <div className="mx-auto h-full w-[1556px]">
      <Header></Header>
      <main className="grid grid-cols-3 space-x-12 pt-[72px]">
        <Portfolio />
        <Swap />
        <Farming />
      </main>
    </div>
  );
}
