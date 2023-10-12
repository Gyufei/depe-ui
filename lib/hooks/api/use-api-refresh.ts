import {
  GlobalMessageAtom,
  GlobalRefreshMapAtom,
} from "@/lib/states/global-message";
import { useAtomValue } from "jotai";
import { useEffect } from "react";

export function useApiRefresh() {
  const globalMessage = useAtomValue(GlobalMessageAtom);
  const globalRefreshMap = useAtomValue(GlobalRefreshMapAtom);

  useEffect(() => {
    const { actionName, type } = globalMessage || {};
    if (!actionName || type !== "success") return;

    for (const key in globalRefreshMap) {
      const { actionNames, cb } = globalRefreshMap[key];
      if (actionNames.includes(actionName)) {
        setTimeout(() => {
          cb?.();
        }, 3000);
      }
    }
  }, [globalMessage, globalRefreshMap]);

  return null;
}
