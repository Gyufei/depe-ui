"use client";

import { GlobalMessageAtom } from "@/lib/states/global-message";
import { useSetAtom } from "jotai";
import { SWRConfig } from "swr";

export default function SWRConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setGlobalMessage = useSetAtom(GlobalMessageAtom);

  return (
    <SWRConfig
      value={{
        onError: (error, key) => {
          setGlobalMessage({
            type: "error",
            message: `${error.status}: ${error.info}`,
          });

          console.info({
            variant: "destructive",
            title: `Api: ${key}`,
            description: `${error.status || "error"}: ${
              error.info || "Some Error Occurred"
            }`,
          });
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}
