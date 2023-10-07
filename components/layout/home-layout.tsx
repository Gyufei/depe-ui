import BgLayout from "@/components/share/bg-layout";
import BlockNumberTag from "@/components/share/block-number";
import Header from "@/components/layout/header";
import GlobalActionTip from "@/components/share/global-action-tip";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BgLayout>
      <div className="flex h-screen w-full flex-col justify-between px-6 pb-6">
        <div className="relative h-full mx-auto w-full max-w-[1566px]">
          <Header />
          {children}
        </div>
        <GlobalActionTip />
        <BlockNumberTag />
      </div>
    </BgLayout>
  );
}
