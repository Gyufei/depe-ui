import ConnectBtn from "./connect-btn";
import NetworkSelect from "./network-select";

export default function Header() {
  return (
    <div className="flex h-20 items-center justify-end space-x-6">
      <NetworkSelect />
      <ConnectBtn />
    </div>
  );
}
