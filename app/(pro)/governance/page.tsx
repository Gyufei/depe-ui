"use client";

import Bundles from "@/components/pro/bundles";
import SwapDpVote from "@/components/pro/swap-dp-vote";

export default function Governance() {
  return (
    <div className="mt-4 flex flex-col md:mt-0">
      <SwapDpVote />
      <Bundles />
    </div>
  );
}
