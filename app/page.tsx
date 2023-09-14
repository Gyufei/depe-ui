import BgLayout from "@/components/share/bg-layout";
import BlockNumberTag from "@/components/share/block-number";
import Farming from "@/components/farming";
import Header from "@/components/header";
import Portfolio from "@/components/portfolio";
import Swap from "@/components/swap";

export default async function Home() {
  return (
    <BgLayout>
      <div className="flex min-h-full min-w-[1600px] flex-col justify-between px-6 pb-6">
        <div className="mx-auto w-[1556px]">
          <Header></Header>
          <main className="grid grid-cols-3 space-x-12 pt-[72px]">
            <Portfolio />
            <Swap />
            <Farming />
          </main>
        </div>
        <BlockNumberTag />
      </div>
    </BgLayout>
  );
}
