"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { LISTINGS } from "@/lib/listings";
import { DESKS } from "@/lib/desks";

export function CompareClient() {
  const [ids, setIds] = useState<string[]>(["hf-sentinel", "range-keeper"]);

  function toggle(id: string) {
    setIds((cur) => {
      if (cur.includes(id)) return cur.filter((x) => x !== id);
      if (cur.length >= 3) return cur;
      return [...cur, id];
    });
  }

  const selected = useMemo(
    () => ids.map((id) => LISTINGS.find((a) => a.id === id)).filter(Boolean),
    [ids],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {LISTINGS.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => toggle(a.id)}
            className={`rounded-full px-3 py-1 text-xs ${
              ids.includes(a.id) ? "bg-ink text-bg" : "bg-card text-muted"
            }`}
          >
            {a.name}
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-muted">Pick 2–3. Empty cells stay empty — never “0”.</p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-muted">
              <th className="pb-3 pr-4">Metric</th>
              {selected.map((a) => (
                <th key={a!.id} className="pb-3 pr-4">
                  <Link href={`/agent/${a!.id}`}>{a!.name}</Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="align-top">
            {[
              ["Desk", (id: string) => DESKS[LISTINGS.find((x) => x.id === id)!.desk].title],
              ["Status", (id: string) => LISTINGS.find((x) => x.id === id)!.status],
              ["Data", (id: string) => LISTINGS.find((x) => x.id === id)!.metricsNote ?? "n/a"],
              ["Protocols", (id: string) => LISTINGS.find((x) => x.id === id)!.protocols.join(", ") || "n/a"],
              ["Hire fee", (id: string) => `${LISTINGS.find((x) => x.id === id)!.hireFeeUsdt} USDT`],
              [
                "History",
                (id: string) =>
                  LISTINGS.find((x) => x.id === id)!.metricsNote === "insufficient_history"
                    ? "n/a — insufficient data"
                    : "demo / labeled",
              ],
            ].map(([label, fn]) => (
              <tr key={String(label)} className="border-t border-line">
                <td className="py-3 pr-4 text-muted">{label as string}</td>
                {selected.map((a) => (
                  <td key={a!.id} className="py-3 pr-4">
                    {(fn as (id: string) => string)(a!.id)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
