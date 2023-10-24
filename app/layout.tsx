import "./globals.css";
import { HaasGrotDisp, HaasGrotText } from "./fonts";

import { cn } from "@/lib/utils/common";
import Web3ConnectProvider from "@/components/provider/web3-connect-provider";
import JotaiProvider from "@/components/provider/jotai-provider";
import SWRConfigProvider from "@/components/provider/swr-config-provider";
import HomeLayout from "@/components/layout/home-layout";
import GlobalProvider from "@/components/provider/global-provider";

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
        <GlobalProvider>
          <Web3ConnectProvider>
            <JotaiProvider>
              <SWRConfigProvider>
                <HomeLayout>{children}</HomeLayout>
              </SWRConfigProvider>
            </JotaiProvider>
          </Web3ConnectProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
