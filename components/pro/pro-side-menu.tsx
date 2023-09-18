import PoolsIcon from "../share/icons/pools";

export default function ProSideMenu() {
  const isActiveRoute = "pools";

  return (
    <div className="flex flex-col">
      <PoolsIcon
        active={isActiveRoute === "pools"}
        data-state={isActiveRoute === "pools" ? "active" : "inactive"}
        className="h-10 w-10 data-[state=inactive]:fill-gray data-[state=active]:fill-black"
      />
    </div>
  );
}
