import NP from "number-precision";

import BgLayout from "@/components/share/bg-layout";
import BlockNumberTag from "@/components/share/block-number";
import Header from "@/components/layout/header";
import GlobalActionTip from "@/components/share/global-action-tip";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  NP.enableBoundaryChecking(false);

  return (
    <BgLayout>
      <div className="flex min-h-full min-w-[1600px] flex-col justify-between px-6 pb-6">
        <div className="mx-auto w-[1556px]">
          <Header />
          {children}
        </div>
        <GlobalActionTip />
        <BlockNumberTag />
      </div>
    </BgLayout>
  );
}
