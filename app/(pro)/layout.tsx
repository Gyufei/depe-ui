import ProSideMenu from "@/components/pro/pro-side-menu";

export default function ProLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative mx-auto w-full pt-6 md:w-[1200px] md:pt-[72px]">
      <ProSideMenu className="-left-[95px] hidden md:absolute" />
      {children}
    </main>
  );
}
