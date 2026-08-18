import { CompareClient } from "./compare-client";

export default function ComparePage() {
  return (
    <main>
      <h1 className="text-3xl font-semibold">Compare</h1>
      <p className="mt-2 text-muted">Same fields as the cards. No composite score.</p>
      <div className="mt-6">
        <CompareClient />
      </div>
    </main>
  );
}
