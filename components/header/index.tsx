import ConnectBtn from "./connect-btn";
import ModeSwitch from "./mode-switch";
import NetworkSelect from "./network-select";

export default function Header() {
  return (
    <div className="flex h-20 items-center justify-end space-x-6 pr-[188px]">
      <ModeSwitch />
      <NetworkSelect />
      <ConnectBtn />
    </div>
  );
}
