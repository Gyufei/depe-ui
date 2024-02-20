"use client";

import Bundles from "@/components/pro/bundles";
import SwapDpVote from "@/components/pro/swap-dp-vote";

export default function Governance() {
  return (
    <div className="flex flex-col">
      <SwapDpVote />
      <Bundles />
    </div>
  );
}
