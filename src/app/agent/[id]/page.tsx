import Link from "next/link";
import { notFound } from "next/navigation";
import { HirePanel } from "@/components/hire-panel";
import { StatusChip } from "@/components/status-chip";
import { DESKS } from "@/lib/desks";
import { listingById } from "@/lib/listings";

export default async function AgentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const agent = listingById(id);
  if (!agent) notFound();
  const desk = DESKS[agent.desk];

  return (
    <main className="max-w-xl">
      <Link href={`/desk/${agent.desk}`} className="text-xs text-muted">
        ← {desk.title}
      </Link>
      <div className="mt-4 flex items-center gap-2">
        <h1 className="text-3xl font-semibold">{agent.name}</h1>
        <StatusChip status={agent.status} />
      </div>
      <p className="text-sm text-muted">{agent.handle}</p>
      <p className="mt-4 text-lg">{agent.oneLiner}</p>
      <p className="mt-3 text-sm text-muted">{agent.description}</p>

      <div className="mt-6 rounded-2xl border border-line bg-card p-5">
        <div className="text-xs uppercase tracking-wider text-muted">Sample policy</div>
        <p className="mt-2 text-sm">{agent.samplePolicy}</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {Object.keys(agent.metrics).length === 0 || agent.metricsNote === "insufficient_history" ? (
          <div className="col-span-2 rounded-2xl border border-line bg-card p-5 text-sm text-muted">
            Insufficient historical data. We will not invent liquidations prevented or PnL for a
            network listing.
          </div>
        ) : (
          Object.entries(agent.metrics).map(([k, v]) => (
            <div key={k} className="rounded-2xl border border-line bg-card p-4">
              <div className="text-[11px] uppercase tracking-wide text-muted">{k.replaceAll("_", " ")}</div>
              <div className="mt-1 text-sm">{String(v)}</div>
            </div>
          ))
        )}
      </div>
      <p className="mt-2 text-[11px] text-muted">
        Metrics note: {agent.metricsNote ?? "none"} · hire fee {agent.hireFeeUsdt} USDT · you also
        pay gas inside the cap
      </p>

      <HirePanel agent={agent} />

      <details className="mt-6 text-sm text-muted">
        <summary className="cursor-pointer text-ink">Advanced</summary>
        <ul className="mt-3 space-y-1 font-mono text-xs">
          <li>ERC-8004: {agent.erc8004TokenId ?? "not registered yet"}</li>
          <li>chain: {agent.chainId}</li>
          <li>owner: {agent.ownerAddress}</li>
          <li>agent wallet: {agent.agentWallet}</li>
          <li>tier: {agent.dataTier}</li>
        </ul>
      </details>
    </main>
  );
}
