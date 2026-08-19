"use client";

import { useEffect, useState } from "react";
import { FundPanel } from "@/components/fund-panel";

export function SetupWallet() {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/status")
      .then((r) => r.json())
      .then((d: { walletAddress?: string | null }) => {
        if (d.walletAddress) setAddress(d.walletAddress);
      })
      .catch(() => undefined);
  }, []);

  if (!address) return null;
  return (
    <div className="mt-8">
      <FundPanel address={address} />
    </div>
  );
}
