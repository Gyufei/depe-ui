"use client";

import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Skeleton } from "../ui/skeleton";
import { useEffect, useMemo, useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { usePathname } from "next/navigation";
import SwapMobileMenu from "../simple/swap/swap-mobile-menu";
import PoolDetailMobileMenu from "../pro/pool-detail-mobile-menu";
import SettingDialog from "./setting-dialog";

export default function Footer() {
  const pathname = usePathname();

  const showMobileMenu = useMemo(() => {
    return pathname === "/";
  }, [pathname]);

  const showPoolDetailMenu = useMemo(() => {
    const regex = /\/pools\/\d+/;
    return pathname.match(regex);
  }, [pathname]);

  return (
    <div className="relative mt-8 flex flex-col items-center justify-center md:flex-row">
      <PoweredBy />
      <div className="static mt-2 flex items-center md:absolute md:right-0 md:mt-0">
        <Social />
        <BlockNumberTag />
      </div>
      {showMobileMenu && <SwapMobileMenu />}
      {showPoolDetailMenu && <PoolDetailMobileMenu />}
    </div>
  );
}

function PoweredBy() {
  return (
    <div className="mx-0 my-auto flex items-center space-x-1">
      <div className="font-title font-medium opacity-[0.12]">POWERED BY</div>
      <PowerSolanaLogo />
    </div>
  );
}

function Social() {
  const [showSetting, setShowSetting] = useState(false);
  const [hoverIcon, setHoverIcon] = useState<number | null>(null);

  return (
    <div className="mr-4 flex items-center space-x-4">
      <SettingDialog open={showSetting} onOpenChange={setShowSetting} />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Image
              onMouseEnter={() => setHoverIcon(1)}
              onMouseLeave={() => setHoverIcon(null)}
              width={28}
              height={28}
              src={
                hoverIcon === 1
                  ? "/icons/discord-fill.svg"
                  : "/icons/discord.svg"
              }
              alt="discord"
              className="cursor-pointer"
            />
          </TooltipTrigger>
          <TooltipContent
            className="border-0 bg-white"
            style={{
              boxShadow: "0px 4px 8px 0px rgba(14, 4, 62, 0.08);",
            }}
          >
            <p className="leading-6 text-black">discord</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Image
              onMouseEnter={() => setHoverIcon(2)}
              onMouseLeave={() => setHoverIcon(null)}
              src={
                hoverIcon === 2
                  ? "/icons/twitter-fill.svg"
                  : "/icons/twitter.svg"
              }
              width={28}
              height={28}
              alt="discord"
              className="cursor-pointer"
            />
          </TooltipTrigger>
          <TooltipContent
            className="border-0 bg-white"
            style={{
              boxShadow: "0px 4px 8px 0px rgba(14, 4, 62, 0.08);",
            }}
          >
            <p className="leading-6 text-black">twitter</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Image
              onMouseEnter={() => setHoverIcon(3)}
              onMouseLeave={() => setHoverIcon(null)}
              onClick={() => setShowSetting(true)}
              width={28}
              height={28}
              src={
                hoverIcon === 3
                  ? "/icons/footer-setting-fill.svg"
                  : "/icons/footer-setting.svg"
              }
              alt="setting"
              className="cursor-pointer"
            />
          </TooltipTrigger>
          <TooltipContent
            className="border-0 bg-white"
            style={{
              boxShadow: "0px 4px 8px 0px rgba(14, 4, 62, 0.08);",
            }}
          >
            <p className="leading-6 text-black">setting</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

function BlockNumberTag() {
  const { connection } = useConnection();
  const [data, setData] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<"success" | "error" | "loading">(
    "loading",
  );

  useEffect(() => {
    async function getBlockHeight() {
      try {
        const res = await connection.getBlockHeight();
        setData(res);
        setIsLoading(false);
        setStatus("success");
      } catch (e) {
        setIsLoading(false);
        setStatus("error");
      }
    }

    getBlockHeight();
    setInterval(() => {
      getBlockHeight();
    }, 20000);
  }, [connection]);

  return (
    <div
      data-status={status}
      className="hidden items-center self-end rounded-3xl border-2 px-4 py-[6px] data-[status='success']:border-green 
      data-[status='error']:border-red data-[status='loading']:border-tan
      data-[status='success']:text-green data-[status='error']:text-red
      data-[status='loading']:text-tan md:flex
      "
    >
      {isLoading ? (
        <>
          <Skeleton className="mr-2 h-2 w-2 rounded-full" />
          <Skeleton className="h-4 w-14" />
        </>
      ) : (
        <>
          <div
            data-status={status}
            className="mr-2 h-2 w-2 rounded-full data-[status='success']:bg-green data-[status='error']:bg-red data-[status='loading']:bg-tan"
          ></div>
          <span className="text-sm font-medium leading-5">
            {data?.toString()}
          </span>
        </>
      )}
    </div>
  );
}

function PowerSolanaLogo() {
  return (
    <a
      href="https://solana.com/"
      target="_blank"
      rel="noreferrer noopener"
      className="text-text-emphasis opacity-50 mix-blend-luminosity hover:opacity-100 hover:mix-blend-normal"
    >
      <svg
        width="97"
        height="10"
        viewBox="0 0 97 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0)">
          <path
            d="M2.81914 7.63241C2.89834 7.55541 3.00725 7.5105 3.12276 7.5105H13.5977C13.7891 7.5105 13.8848 7.73507 13.7495 7.86661L11.6802 9.87817C11.601 9.95516 11.4921 10.0001 11.3766 10.0001H0.901703C0.71029 10.0001 0.614584 9.7755 0.749893 9.64397L2.81914 7.63241Z"
            fill="url(#paint0_linear)"
          ></path>
          <path
            d="M2.81816 0.121912C2.90066 0.044915 3.00957 0 3.12178 0H13.5967C13.7881 0 13.8838 0.224575 13.7485 0.356112L11.6793 2.36766C11.6001 2.44466 11.4912 2.48957 11.3756 2.48957H0.900727C0.709314 2.48957 0.613607 2.265 0.748916 2.13346L2.81816 0.121912Z"
            fill="url(#paint1_linear)"
          ></path>
          <path
            d="M11.6802 3.85311C11.601 3.77612 11.4921 3.7312 11.3766 3.7312H0.901703C0.71029 3.7312 0.614584 3.95578 0.749893 4.08731L2.81914 6.09886C2.89834 6.17586 3.00725 6.22077 3.12276 6.22077H13.5977C13.7891 6.22077 13.8848 5.9962 13.7495 5.86466L11.6802 3.85311Z"
            fill="url(#paint2_linear)"
          ></path>
        </g>
        <path
          d="M23.2615 5.96822H27.5668C28.1722 5.96822 28.6627 6.43992 28.6627 7.01589C28.6627 7.59186 28.1722 8.06356 27.5668 8.06356H22.3743C22.2908 8.06356 22.2125 8.09335 22.1551 8.143L20.5896 9.429C20.3495 9.62761 20.4956 10 20.8088 10H27.3059C27.3059 10 27.3111 10 27.3111 9.99503C27.3111 9.99007 27.3163 9.99007 27.3163 9.99007C27.3998 9.99503 27.4781 10 27.5668 10C29.2889 10 30.6875 8.66435 30.6875 7.01589C30.6875 5.45184 29.4298 4.16584 27.8225 4.04171C27.8225 4.04171 27.8173 4.04171 27.8173 4.03674C27.8173 4.03178 27.8173 4.03178 27.8121 4.03178H23.178C22.5726 4.03178 22.0821 3.56008 22.0821 2.98411C22.0821 2.40318 22.5726 1.93644 23.178 1.93644H28.36C28.4435 1.93644 28.527 1.90665 28.5896 1.85203L30.0456 0.566039C30.2752 0.367429 30.1239 0 29.816 0H23.2667C23.2406 0 23.2093 0 23.1832 0C21.4611 0 20.0625 1.33565 20.0625 2.98411C20.0625 4.63257 21.4611 5.96822 23.1832 5.96822C23.2093 5.96822 23.2354 5.96822 23.2615 5.96822Z"
          fill="currentColor"
        ></path>
        <path
          d="M47.8955 0C47.7111 0 47.5625 0.143848 47.5625 0.32738V9.67262C47.5625 9.85119 47.7111 10 47.8955 10H55.6319C55.7241 10 55.8112 9.96032 55.8778 9.89583L56.8461 8.88889C57.046 8.68056 56.8974 8.34326 56.6002 8.34326H49.8475C49.6631 8.34326 49.5145 8.1994 49.5145 8.01587V0.32738C49.5145 0.148808 49.3659 0 49.1815 0H47.8955Z"
          fill="currentColor"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M35.6326 0C35.6326 0.00496771 35.6275 0.00496771 35.6326 0C34.6486 0.0447094 33.8584 0.814705 33.8125 1.77347V8.06756C33.8125 8.0924 33.8125 8.12221 33.8125 8.14704C33.8125 9.14555 34.618 9.96026 35.6326 10H42.6174C43.6269 9.95529 44.4375 9.14059 44.4375 8.14704C44.4375 8.12221 44.4375 8.0924 44.4375 8.06756V1.77844C44.3967 0.819672 43.6065 0.0447082 42.6225 0.0049665H35.6326V0ZM36.9327 1.77844C36.3158 1.80328 35.8213 2.29011 35.7958 2.89617V6.85544C35.7958 6.87034 35.7958 6.89021 35.7958 6.90512C35.7958 7.53105 36.3005 8.04769 36.9327 8.07253H41.3122C41.9444 8.04769 42.4491 7.53105 42.4491 6.90512C42.4491 6.89021 42.4491 6.87034 42.4491 6.85544V2.89617C42.4236 2.29011 41.9291 1.80825 41.3122 1.77844H36.9327Z"
          fill="currentColor"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M67.5573 9.66749C67.5573 9.84615 67.6986 9.99504 67.8739 9.99504H69.1209C69.2962 9.99504 69.4375 9.85112 69.4375 9.66749V1.93052C69.4375 1.90571 69.4375 1.87593 69.4375 1.85112C69.4375 0.853597 68.6728 0.0397022 67.7181 0H61.3128C61.2884 0 61.2592 0 61.2349 0C60.2412 0 59.4375 0.828782 59.4375 1.85608C59.4375 1.88089 59.4375 1.91067 59.4375 1.93548V9.67245C59.4375 9.85112 59.5788 10 59.7541 10H61.0011C61.1764 10 61.3177 9.85608 61.3177 9.67245V6.45161C61.3177 6.27295 61.4589 6.12407 61.6343 6.12407H67.2553C67.4307 6.12407 67.5719 6.26799 67.5719 6.45161V9.66749H67.5573ZM61.3031 4.34243V2.73449C61.3031 2.10918 61.795 1.60298 62.399 1.60298H66.4614C67.0654 1.60298 67.5573 2.10918 67.5573 2.73449V4.34243C67.5573 4.52109 67.4161 4.66997 67.2407 4.66997H61.6197C61.4443 4.66997 61.3031 4.52605 61.3031 4.34243Z"
          fill="currentColor"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M94.7422 10C94.5688 10 94.4291 9.85608 94.4291 9.67246V6.45161C94.4291 6.27295 94.2894 6.12407 94.116 6.12407H88.4946C88.3212 6.12407 88.1815 6.26799 88.1815 6.45161V9.67246C88.1815 9.85112 88.0418 10 87.8684 10H86.6256C86.4522 10 86.3125 9.85608 86.3125 9.67246V1.93548C86.3125 1.91067 86.3125 1.88089 86.3125 1.85608C86.3125 0.833748 87.1169 0 88.1092 0C88.1333 0 88.1622 0 88.1863 0H94.5928C95.5466 0.044665 96.3125 0.85856 96.3125 1.85112C96.3125 1.87593 96.3125 1.90571 96.3125 1.93052V9.66749C96.3125 9.84615 96.1728 9.99504 95.9994 9.99504H94.7422V10ZM88.1767 2.73945V4.3474C88.1767 4.52606 88.3164 4.67494 88.4898 4.67494H94.1112C94.2846 4.67494 94.4243 4.53102 94.4243 4.3474V2.73945C94.4243 2.11414 93.9329 1.60794 93.3308 1.60794H89.2701C88.668 1.60794 88.1767 2.11414 88.1767 2.73945Z"
          fill="currentColor"
        ></path>
        <path
          d="M74.4177 0C74.5159 0 74.609 0.0396623 74.671 0.11403L80.6036 6.90134C80.8051 7.1294 81.1927 6.99058 81.1927 6.68815V0.327217C81.1927 0.148735 81.3426 0 81.5286 0H82.8516C83.0376 0 83.1875 0.143777 83.1875 0.327217V9.66782C83.1875 9.84631 83.0376 9.99504 82.8516 9.99504H81.2082C81.2031 9.99504 81.1979 9.99008 81.1979 9.98512C81.1979 9.98017 81.1979 9.98017 81.1927 9.97521L75.1567 3.23748C74.9552 3.00942 74.5676 3.1532 74.5676 3.45067V9.67278C74.5676 9.85126 74.4177 10 74.2317 10H72.8984C72.7124 10 72.5625 9.85622 72.5625 9.67278V0.327217C72.5625 0.148735 72.7124 0 72.8984 0H74.4177Z"
          fill="currentColor"
        ></path>
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="12.597"
            y1="-1.20161"
            x2="5.66446"
            y2="12.4578"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#00FFA3"></stop>
            <stop offset="1" stopColor="#DC1FFF"></stop>
          </linearGradient>
          <linearGradient
            id="paint1_linear"
            x1="9.42617"
            y1="-2.81044"
            x2="2.49366"
            y2="10.8489"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#00FFA3"></stop>
            <stop offset="1" stopColor="#DC1FFF"></stop>
          </linearGradient>
          <linearGradient
            id="paint2_linear"
            x1="11.002"
            y1="-2.01112"
            x2="4.06948"
            y2="11.6483"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#00FFA3"></stop>
            <stop offset="1" stopColor="#DC1FFF"></stop>
          </linearGradient>
          <clipPath id="clip0">
            <rect
              width="13.125"
              height="10"
              fill="currentColor"
              transform="translate(0.6875)"
            ></rect>
          </clipPath>
        </defs>
      </svg>
    </a>
  );
}
