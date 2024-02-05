import "./globals.css";
import { HaasGrotDisp, HaasGrotText } from "./fonts";

import { cn } from "@/lib/utils/common";
import JotaiProvider from "@/components/provider/jotai-provider";
import SWRConfigProvider from "@/components/provider/swr-config-provider";
import HomeLayout from "@/components/layout/home-layout";
import GlobalProvider from "@/components/provider/global-provider";
import { SolanaWalletProviders } from "@/components/provider/solana-wallets";
import Web3ConnectProvider from "@/components/provider/~web3-connect-provider";

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
            <SolanaWalletProviders>
              <JotaiProvider>
                <SWRConfigProvider>
                  <HomeLayout>{children}</HomeLayout>
                </SWRConfigProvider>
              </JotaiProvider>
            </SolanaWalletProviders>
          </Web3ConnectProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
