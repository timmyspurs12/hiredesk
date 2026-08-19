import Link from "next/link";

export default function DemoPage() {
  return (
    <main className="max-w-xl">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">Judge demo path</p>
      <h1 className="mt-2 text-3xl font-semibold">No wallet. No Venus position. Still finish.</h1>
      <p className="mt-4 text-muted">
        Official Functionality: someone with zero Agent Studio knowledge, no dead end. This path
        uses a shared demo account in your browser. It is labeled demo. Optional:{" "}
        <Link href="/setup" className="text-accent">
          turn on a real testnet session
        </Link>
        .
      </p>
      <ol className="mt-8 list-decimal space-y-3 pl-5 text-sm">
        <li>Open HF-Sentinel.</li>
        <li>Read the dry run in English.</li>
        <li>Set cap 100 USDT, 24 hours.</li>
        <li>Hire — you land on the session phone.</li>
        <li>Run the action, then tap REVOKE AUTHORITY.</li>
        <li>Try execute again. It must fail.</li>
        <li>Open the other three desks so diversity is obvious.</li>
      </ol>
      <Link
        href="/agent/hf-sentinel"
        className="btn-primary btn-primary-inline mt-8"
      >
        Start with HF-Sentinel
      </Link>
    </main>
  );
}
