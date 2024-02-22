import Image from "next/image";
import ConnectBtn from "./connect-btn";
import ModeSwitch from "./mode-switch";
import NetworkSelect from "./network-select";
import Logo from "./logo";
import NetworkSelectMobile from "./network-select-mobile";
import MobileRouterMenu from "./mobile-router-menu";

export default function Header() {
  return (
    <>
      <MobileLogo />
      <div className="flex h-14 items-center justify-between md:h-20 md:px-[188px]">
        <div className="flex items-center space-x-2 md:space-x-6">
          <Logo />
          <ModeSwitch />
          <NetworkSelectMobile />
        </div>
        <div className="flex items-center justify-end space-x-4 md:space-x-6">
          <NetworkSelect />
          <ConnectBtn />
          <MobileRouterMenu />
        </div>
      </div>
    </>
  );
}

function MobileLogo() {
  return (
    <div className="flex items-center justify-center py-[10px] md:hidden">
      <div className="flex items-center justify-between space-x-1 rounded-xl bg-white px-[10px] py-[3px]">
        <div className="flex h-[14px] w-[14px] items-center justify-center rounded-full bg-black">
          <Image
            src="icons/logo-linear.svg"
            width={10}
            height={10}
            alt="logo"
          />
        </div>
        <div className="text-xs leading-[18px] text-black">depe.app</div>
      </div>
    </div>
  );
}
