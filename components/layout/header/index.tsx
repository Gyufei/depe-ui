import ConnectBtn from "./connect-btn";
import ModeSwitch from "./mode-switch";
import NetworkSelect from "./network-select";
import Logo from "./logo";

export default function Header() {
  return (
    <div className="flex h-20 items-center justify-between px-[188px]">
      <div className="flex items-center space-x-6">
        <Logo />
        <ModeSwitch />
      </div>
      <div className="flex items-center justify-end space-x-6">
        <NetworkSelect />
        <ConnectBtn />
      </div>
    </div>
  );
}
