import BgLayout from "@/components/share/bg-layout";
import BlockNumberTag from "@/components/share/block-number";
import Header from "@/components/layout/header";
import ActionTip from "@/components/share/action-tip";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BgLayout>
      <div className="flex min-h-full min-w-[1600px] flex-col justify-between px-6 pb-6">
        <div className="mx-auto w-[1556px]">
          <Header />
          {children}
        </div>
        <ActionTip />
        <BlockNumberTag />
      </div>
    </BgLayout>
  );
}
