import { AdvantageClient } from "./advantage-client";

export default function AdvantagePage() {
  return (
    <main>
      <p className="text-xs uppercase tracking-[0.2em] text-muted">TermiX · Agent Advantage Report</p>
      <h1 className="mt-2 text-3xl font-semibold">Does hiring beat doing it yourself?</h1>
      <p className="mt-3 max-w-2xl text-muted">
        TermiX scores this 30%. Three tasks, each run both ways. At least one is{" "}
        <span className="text-ink">security</span> (liquidation). Times below are only what you
        record — we do not invent 98% faster.
      </p>
      <AdvantageClient />
    </main>
  );
}
