export default function RankingPage() {
  return (
    <main className="max-w-xl text-sm leading-relaxed text-muted">
      <h1 className="text-3xl font-semibold text-ink">How ranking works</h1>
      <ol className="mt-6 list-decimal space-y-2 pl-5">
        <li>Featured reference agent is pinned.</li>
        <li>Then verified, then new, then inactive, then unsupported.</li>
        <li>No Smart Money Score. No learned ranker.</li>
        <li>8004scan total_score is shown as “8004scan score” when we hydrate. Not yet wired.</li>
        <li>Missing history is labeled. We do not fill with zero.</li>
      </ol>
    </main>
  );
}
