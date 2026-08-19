"use client";

import { useState } from "react";

const FAUCET = "https://testnet.bnbchain.org/faucet-smart";

export function FundPanel({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="rounded-2xl border border-line bg-card p-4 text-sm">
      <div className="text-xs uppercase tracking-wider text-muted">Needs test BNB</div>
      <p className="mt-2 text-muted">
        On-chain hire failed because this wallet has no test gas. The demo session still works.
        To write a real Keystore session, fund this address, then hire again.
      </p>
      <div className="mt-3 break-all rounded-xl bg-paper px-3 py-2 font-mono text-[11px]">{address}</div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={copy} className="btn-primary btn-primary-inline !w-auto">
          {copied ? "Copied" : "Copy address"}
        </button>
        <a
          href={FAUCET}
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-line px-4 py-2 text-sm"
        >
          Open BSC testnet faucet
        </a>
      </div>
    </div>
  );
}
