import { useState } from "react";
import InputPanel from "@/components/share/input-panel";

import { TitleText, ContentCon } from "./common";
import { useAtomValue } from "jotai";
import { FPoolAtom } from "@/lib/states/farming";
import { usePoolFormat } from "@/lib/hooks/use-pool-format";
import { TokenDisplay } from "@/components/share/input-panel-token-display";

export function Deposit({ isActive }: { isActive: boolean }) {
  const [value1, setValue1] = useState("");

  const pool = useAtomValue(FPoolAtom);
  const { baseToken } = usePoolFormat(pool);

  return (
    <div>
      <TitleText>Deposit</TitleText>
      <ContentCon>
        <InputPanel
          tokenDisplay={<TokenDisplay token={baseToken!} />}
          className="flex-1"
          isActive={isActive}
          value={value1}
          setValue={setValue1}
        />
      </ContentCon>
    </div>
  );
}
