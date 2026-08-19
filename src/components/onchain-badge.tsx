"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function OnchainBadge() {
  const [ready, setReady] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/status")
      .then((r) => r.json())
      .then((d: { altanaConfigured?: boolean }) => setReady(Boolean(d.altanaConfigured)))
      .catch(() => setReady(false));
  }, []);

  if (ready === null) return null;

  return (
    <Link
      href="/setup"
      className={`rounded-full px-2.5 py-1 text-[11px] ${
        ready ? "bg-good/15 text-good" : "bg-white/8 text-muted"
      }`}
    >
      {ready ? "Altana key set" : "Demo mode · set up chain"}
    </Link>
  );
}
