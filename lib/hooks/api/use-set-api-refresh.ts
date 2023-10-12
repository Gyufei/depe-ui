import { GlobalRefreshMapAtom, IActionName } from "@/lib/states/global-message";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

export function useSetApiRefresh(
  key: string,
  refreshActions: Array<IActionName>,
  callback: () => void,
) {
  const setGlMap = useSetAtom(GlobalRefreshMapAtom);

  useEffect(() => {
    setGlMap((prev) => {
      return {
        ...prev,
        [key]: {
          actionNames: refreshActions,
          cb: callback,
        },
      };
    });
  }, [key, refreshActions, callback, setGlMap]);

  return null;
}
