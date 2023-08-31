"use client";

import ShadowButton from "./ui/shadow-button";

export default function ConnectBtn() {
  const handleConnect = () => {};

  return (
    <>
      <ShadowButton className="rounded-xl bg-yellow" onClick={handleConnect}>
        Connect
      </ShadowButton>
    </>
  );
}
