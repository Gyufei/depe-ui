import "./globals.css";
import { HaasGrotDisp, HaasGrotText } from "./fonts";

import { cn } from "@/lib/utils";
import Web3ConnectProvider from "@/components/provider/web3-connect-provider";
import BgProvider from "@/components/provider/bg-provider";

export const metadata = {
  title: "Depe",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          HaasGrotDisp.variable,
          HaasGrotText.variable,
          "h-screen w-screen",
        )}
      >
        <Web3ConnectProvider>
          <BgProvider>{children}</BgProvider>
        </Web3ConnectProvider>
      </body>
    </html>
  );
}
