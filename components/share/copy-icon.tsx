import { GlobalMessageAtom } from "@/lib/states/global-message";
import { useSetAtom } from "jotai";
import { Copy } from "lucide-react";

export default function CopyIcon({ text }: { text: string }) {
  const handleCopy = () => {
    if (!text) return;

    navigator.clipboard.writeText(text);
    setGlobalMessage({
      type: "success",
      message: "Copied to clipboard",
    });
  };

  const setGlobalMessage = useSetAtom(GlobalMessageAtom);

  return (
    <Copy
      onClick={() => {
        handleCopy();
      }}
      className="hover:text-primary ml-1 h-4 w-4 cursor-pointer text-[#8c8c8c]"
    />
  );
}
