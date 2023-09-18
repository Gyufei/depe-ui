import ProSideMenu from "@/components/pro/pro-side-menu";

export default function ProLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <ProSideMenu />
      {children}
    </div>
  );
}
