import { fetchScanAgents } from "@/lib/scan8004";

export async function NetworkStrip() {
  const agents = await fetchScanAgents(56, 6);
  if (agents.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-sm font-medium">Network sample (8004scan · BSC)</h2>
      <p className="mt-1 text-xs text-muted">
        Identity only. No strategy metrics — we will not invent liquidations or PnL.
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {agents.map((a) => (
          <div key={`${a.chain_id}-${a.token_id}`} className="rounded-2xl border border-line bg-card p-4">
            <div className="font-medium">{a.name || `Agent #${a.token_id}`}</div>
            <p className="mt-1 line-clamp-2 text-xs text-muted">{a.description || "No description"}</p>
            <div className="mt-2 text-[11px] text-muted">
              8004scan score {a.total_score ?? "n/a"} · Insufficient historical data
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
