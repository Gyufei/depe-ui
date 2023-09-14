import "./globals.css";
import { HaasGrotDisp, HaasGrotText } from "./fonts";

import { cn } from "@/lib/utils";
import Web3ConnectProvider from "@/components/provider/web3-connect-provider";
import JotaiProvider from "@/components/provider/jotai-provider";
import SWRConfigProvider from "@/components/provider/swr-config-provider";

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
      <body className={cn(HaasGrotDisp.variable, HaasGrotText.variable)}>
        <Web3ConnectProvider>
          <JotaiProvider>
            <SWRConfigProvider>{children}</SWRConfigProvider>
          </JotaiProvider>
        </Web3ConnectProvider>
      </body>
    </html>
  );
}
