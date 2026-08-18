"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mark } from "@/components/brand";
import { DESKS } from "@/lib/desks";
import { attemptAfterRevoke, executeDemo, getJob, revokeJob } from "@/lib/jobs";
import { listingById } from "@/lib/listings";
import { PRESETS } from "@/lib/presets";
import type { AgentListing, Job } from "@/lib/types";

function timeLeft(iso: string) {
  const ms = new Date(iso).getTime() - Date.now();
  if (ms <= 0) return "expired";
  const h = Math.floor(ms / 3600_000);
  const m = Math.floor((ms % 3600_000) / 60_000);
  return `${h}h ${m}m`;
}

export function SessionScreen({ id }: { id: string }) {
  const [job, setJob] = useState<Job | null>(null);
  const [, setTick] = useState(0);

  useEffect(() => {
    setJob(getJob(id) ?? null);
    const t = setInterval(() => setTick((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, [id]);

  const agent = job ? listingById(job.agentId) : undefined;

  if (!job || !agent) {
    return (
      <p className="text-muted">
        Session not found in this browser. Start the{" "}
        <Link href="/demo" className="text-accent">
          guided demo
        </Link>
        .
      </p>
    );
  }

  return <LiveSession job={job} agent={agent} onChange={() => setJob(getJob(id) ?? null)} />;
}

function LiveSession({
  job,
  agent,
  onChange,
}: {
  job: Job;
  agent: AgentListing;
  onChange: () => void;
}) {
  const desk = DESKS[agent.desk];
  const active = job.status === "active";
  const can = PRESETS[agent.desk]
    .filter((p) => job.allowlist.includes(p.id))
    .map((p) => p.label);

  function onExecute() {
    const title =
      agent.desk === "health-factor"
        ? "Repay 42.00 USDT → Venus"
        : agent.desk === "rebalancing"
          ? "Collect + decrease Pancake LP"
          : agent.desk === "grid"
            ? "Buy WBNB with 10 USDT"
            : "Mint 50 USDT on Venus";
    executeDemo(job.id, title, "Dry-run intent executed on the demo path.", desk.title);
    onChange();
  }

  return (
    <div className="flex flex-col items-center">
      <div className="phone-glow w-full max-w-[390px] overflow-hidden rounded-[36px] border border-[#2a2a2e] bg-[#0c0c0e]">
        <div className="px-5 pb-8 pt-4">
          <div className="mb-5 flex items-center justify-between text-[11px] text-muted">
            <span>10:09</span>
            <span>BNB testnet</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-[12px] font-semibold tracking-[0.2em]">
            <Mark size={18} />
            HIREDESK
          </div>

          <h1 className="mt-6 text-center text-[22px] font-semibold">Active DeFi Session</h1>
          <p className="mt-1 text-center text-[12px] text-muted">
            {agent.handle} · {desk.title}
          </p>

          <div className="mt-6 text-center">
            <div className="text-[11px] uppercase tracking-wider text-muted">Spend remaining</div>
            <div className="mt-1 text-[34px] font-semibold tracking-tight">
              {job.spendCapUsdt} <span className="text-[18px] font-medium text-muted">USDT</span>
            </div>
            <div className="mt-2 text-[11px] font-medium uppercase tracking-wide text-good">
              {active ? "Running · limited session" : "Revoked · no authority"}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-[11px] text-muted">
              <span>Authority</span>
              <span className="text-ink">{active ? "Limited" : "None"}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className={`h-full rounded-full ${active ? "w-[28%] bg-accent" : "w-0 bg-bad"}`} />
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-muted">
              <span>Limited</span>
              <span>Managed</span>
              <span className="opacity-40">Full — never granted</span>
            </div>
            <p className="mt-2 text-[11px] leading-snug text-muted">
              This is not a slider. Full wallet authority is not a product state.
            </p>
          </div>

          <div className="mt-6 rounded-2xl bg-[#161618] p-4">
            <div className="text-[11px] font-medium uppercase tracking-wider text-muted">
              Agent authority
            </div>
            <p className="mt-2 text-xs text-muted">
              {active ? `Expires in ${timeLeft(job.expiresAt)}` : "Revoked. Hire again to continue."}
              {job.onchain ? " · Keystore" : " · demo (not on Keystore yet)"}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-3 text-[12px]">
              <div>
                <div className="text-good">Can</div>
                <ul className="mt-1 space-y-1 text-ink/90">
                  {can.map((c) => (
                    <li key={c}>✓ {c}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-bad">Cannot</div>
                <ul className="mt-1 space-y-1 text-ink/90">
                  <li>✕ Transfer USDT out</li>
                  <li>✕ Arbitrary contracts</li>
                  <li>✕ Exceed {job.spendCapUsdt} USDT/day</li>
                  <li>✕ Continue after expiry</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-[11px] font-medium uppercase tracking-wider text-muted">
              Recent activity
            </div>
            <ul className="mt-3 space-y-3">
              {job.events.map((e) => (
                <li key={e.id} className="text-[13px]">
                  <div className={e.status === "reverted" ? "text-bad" : ""}>{e.title}</div>
                  <div className="text-[11px] text-muted">{e.detail}</div>
                  {e.txHash && (
                    <div className="font-mono text-[10px] text-muted">
                      Hash {e.txHash.slice(0, 6)}…{e.txHash.slice(-4)} · demo
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {active ? (
            <div className="mt-6 space-y-2">
              <button
                type="button"
                onClick={onExecute}
                className="w-full rounded-2xl bg-ink py-3 text-sm font-semibold text-bg"
              >
                Run dry-run action
              </button>
              <button
                type="button"
                onClick={() => {
                  revokeJob(job.id);
                  onChange();
                }}
                className="w-full rounded-2xl bg-bad py-3.5 text-sm font-semibold tracking-wide text-white"
              >
                REVOKE AUTHORITY
              </button>
            </div>
          ) : (
            <div className="mt-6 space-y-2">
              <button
                type="button"
                onClick={() => {
                  attemptAfterRevoke(job.id);
                  onChange();
                }}
                className="w-full rounded-2xl border border-line py-3 text-sm"
              >
                Try execute (should fail)
              </button>
              <Link
                href={`/agent/${agent.id}`}
                className="block w-full rounded-2xl bg-ink py-3 text-center text-sm font-semibold text-bg"
              >
                Hire a new session
              </Link>
            </div>
          )}
        </div>
      </div>
      <p className="mt-6 max-w-sm text-center text-xs text-muted">
        Same chrome on every desk. After this screen, open{" "}
        <Link href="/desk/rebalancing" className="text-accent">
          Rebalancing
        </Link>
        ,{" "}
        <Link href="/desk/grid" className="text-accent">
          Grid
        </Link>{" "}
        and{" "}
        <Link href="/desk/yield" className="text-accent">
          Yield
        </Link>
        .
      </p>
    </div>
  );
}
