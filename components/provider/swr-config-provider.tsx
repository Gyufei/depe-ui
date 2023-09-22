"use client";

import { SWRConfig } from "swr";

export default function SWRConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SWRConfig
      value={{
        onError: (error, key) => {
          console.log({
            variant: "destructive",
            title: `Api: ${key}`,
            description: `${error.status}: ${error.info}`,
          });
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}
