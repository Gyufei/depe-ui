import "./globals.css";
import { HaasGrotDisp, HaasGrotText } from "./fonts";

import { cn } from "@/lib/utils";

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
          "bg-sky h-full w-full",
        )}
      >
        {children}
      </body>
    </html>
  );
}
