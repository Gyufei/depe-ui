import ProSideMenu from "@/components/pro/pro-side-menu";

export default function ProLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative mx-auto w-[1200px] pt-[72px]">
      <ProSideMenu className="absolute -left-[95px]" />
      <div>{children}</div>
    </main>
  );
}
