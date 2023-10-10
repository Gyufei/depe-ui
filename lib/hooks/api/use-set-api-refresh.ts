import { GlobalRefreshMapAtom, IActionName } from "@/lib/states/global-message";
import { useSetAtom } from "jotai";

export function useSetApiRefresh(
  key: string,
  refreshActions: Array<IActionName>,
  callback: () => void,
) {
  const setGlMap = useSetAtom(GlobalRefreshMapAtom);

  setGlMap((prev) => {
    return {
      ...prev,
      [key]: {
        actionNames: refreshActions,
        cb: callback,
      },
    };
  });

  return null;
}
