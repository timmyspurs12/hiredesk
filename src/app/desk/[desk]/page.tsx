import Link from "next/link";
import { notFound } from "next/navigation";
import { DESK_ORDER, DESKS } from "@/lib/desks";
import { listingsByDesk } from "@/lib/listings";
import { StatusChip } from "@/components/status-chip";
import { NetworkStrip } from "@/components/network-strip";
import type { Desk } from "@/lib/types";

export default async function DeskPage({
  params,
}: {
  params: Promise<{ desk: string }>;
}) {
  const { desk: raw } = await params;
  if (!DESK_ORDER.includes(raw as Desk)) notFound();
  const desk = raw as Desk;
  const meta = DESKS[desk];
  const listings = listingsByDesk(desk);

  return (
    <main>
      <div className="mb-6 flex flex-wrap gap-2 text-xs">
        {DESK_ORDER.map((s) => (
          <Link
            key={s}
            href={`/desk/${s}`}
            className={`rounded-full px-3 py-1 ${s === desk ? "bg-white text-black" : "bg-card text-muted"}`}
          >
            {DESKS[s].title}
          </Link>
        ))}
      </div>
      <h1 className="text-3xl font-semibold">{meta.verb}</h1>
      <p className="mt-2 text-muted">{meta.blurb}</p>

      <div className="mt-8 space-y-3">
        {listings.map((a) => (
          <Link
            key={a.id}
            href={`/agent/${a.id}`}
            className="block rounded-2xl border border-line bg-card p-5 hover:border-ink/20"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{a.name}</span>
                  {a.featured && (
                    <span className="text-[11px] uppercase tracking-wide text-accent">Featured</span>
                  )}
                </div>
                <div className="text-xs text-muted">{a.handle}</div>
              </div>
              <StatusChip status={a.status} />
            </div>
            <p className="mt-3 text-sm">{a.oneLiner}</p>
            <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted">
              <span>{a.protocols.join(" · ") || "no protocol tag"}</span>
              <span>hire {a.hireFeeUsdt} USDT</span>
              <span>
                {a.metricsNote === "insufficient_history"
                  ? "Insufficient historical data"
                  : "Demo metrics · labeled"}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
