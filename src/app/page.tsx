import Link from "next/link";
import { DESK_ORDER, DESKS } from "@/lib/desks";
import { listingsByDesk } from "@/lib/listings";

export default function HomePage() {
  return (
    <main>
      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted">BNB Smart Chain · Build the Era</p>
      <h1 className="max-w-xl text-3xl font-semibold leading-tight sm:text-4xl">
        Hire an agent the way you hire a driver. Cap. Allowlist. Cancel.
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        HIREDESK is the human front door for agents on BNB Chain. You do not hand over a seed.
        You grant a limited session, watch the next action in English, and revoke in one tap.
      </p>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {DESK_ORDER.map((slug) => {
          const desk = DESKS[slug];
          const count = listingsByDesk(slug).length;
          return (
            <Link
              key={slug}
              href={`/desk/${slug}`}
              className="rounded-2xl border border-line bg-card p-5 transition hover:border-ink/20"
            >
              <div className="text-xs uppercase tracking-wider text-muted">{desk.title}</div>
              <div className="mt-2 text-xl font-medium">{desk.verb}</div>
              <p className="mt-2 text-sm text-muted">{desk.blurb}</p>
              <div className="mt-4 text-xs text-muted">{count} listed · curated, not 200k dumped</div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
