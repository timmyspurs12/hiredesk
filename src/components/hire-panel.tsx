"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { buildDryRun } from "@/lib/dry-run";
import { createDemoJob, upsertJob } from "@/lib/jobs";
import { PRESETS, defaultAllowlist } from "@/lib/presets";
import type { AgentListing, Job } from "@/lib/types";

export function HirePanel({ agent }: { agent: AgentListing }) {
  const router = useRouter();
  const presets = PRESETS[agent.desk];
  const [allow, setAllow] = useState<string[]>(defaultAllowlist(agent.desk));
  const [cap, setCap] = useState("100");
  const [hours, setHours] = useState(24);
  const [hfMin, setHfMin] = useState("1.40");
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const dry = useMemo(() => buildDryRun(agent.id, agent.desk), [agent]);
  const hireable = agent.dataTier === "reference" && dry.simulation === "success";

  function toggle(id: string, required: boolean) {
    if (required) return;
    setAllow((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  }

  async function hire() {
    setBusy(true);
    setErr(null);
    const payload = {
      agentId: agent.id,
      spendCapUsdt: cap,
      expiryHours: hours,
      allowlist: allow,
      hfMin: agent.desk === "health-factor" ? hfMin : undefined,
    };
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { job?: Job; error?: string; warning?: string };
      if (data.job) {
        upsertJob(data.job);
        router.push(`/session/${data.job.id}`);
        return;
      }
      throw new Error(data.error || "Hire failed");
    } catch {
      const job = createDemoJob(payload);
      router.push(`/session/${job.id}`);
    } finally {
      setBusy(false);
    }
  }

  if (!hireable) {
    return (
      <div className="mt-6 rounded-2xl border border-line bg-card p-5 text-sm text-muted">
        This listing has no HIREDESK job history. Hire is only enabled on featured reference
        agents so we do not pretend a random 8004 card can run.
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      <div className="rounded-2xl border border-line bg-card p-5">
        <div className="text-xs uppercase tracking-wider text-muted">Dry run · demo position</div>
        <p className="mt-3 text-[15px] leading-relaxed">{dry.english}</p>
        <button
          type="button"
          className="mt-3 text-xs text-accent"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Hide" : "Advanced"} details
        </button>
        {open && (
          <pre className="mt-3 overflow-x-auto rounded-xl bg-paper p-3 text-[11px] text-muted">
            {JSON.stringify(dry, null, 2)}
          </pre>
        )}
        {dry.policyWarnings.map((w) => (
          <p key={w} className="mt-2 text-xs text-muted">
            Clipboard · {w}
          </p>
        ))}
      </div>

      <div className="rounded-2xl border border-line bg-card p-5">
        <div className="text-xs uppercase tracking-wider text-muted">Padlock · session (chain)</div>
        <label className="mt-4 block text-sm">
          Spend cap (USDT / day)
          <input
            value={cap}
            onChange={(e) => setCap(e.target.value)}
            className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2"
          />
        </label>
        <label className="mt-3 block text-sm">
          Expiry
          <select
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2"
          >
            <option value={1}>1 hour</option>
            <option value={24}>24 hours</option>
            <option value={168}>7 days</option>
          </select>
        </label>
        <div className="mt-4 space-y-2 text-sm">
          {presets.map((p) => (
            <label key={p.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={allow.includes(p.id)}
                disabled={p.required}
                onChange={() => toggle(p.id, p.required)}
              />
              <span>
                {p.label}
                {p.required ? " · required" : ""}
              </span>
            </label>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted">
          USDT <span className="text-ink">transfer</span> is not on this list. The agent cannot
          send your coins to an arbitrary address.
        </p>

        {agent.desk === "health-factor" && (
          <label className="mt-4 block text-sm">
            Agent will try · HF floor
            <input
              value={hfMin}
              onChange={(e) => setHfMin(e.target.value)}
              className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2"
            />
            <span className="mt-1 block text-xs text-muted">
              Not enforced by the session. The chain cannot read Venus HF.
            </span>
          </label>
        )}

        <button type="button" onClick={hire} disabled={busy} className="btn-primary mt-5">
          {busy ? "Hiring…" : "Hire agent"}
        </button>
        {err ? <p className="mt-2 text-center text-xs text-bad">{err}</p> : null}
        <p className="mt-2 text-center text-[11px] text-muted">
          If a testnet key is set, this writes an Altana session. Otherwise it stays a labeled demo.
        </p>
      </div>
    </div>
  );
}
