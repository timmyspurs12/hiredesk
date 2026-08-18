import type { ListingStatus } from "@/lib/types";

const MAP: Record<ListingStatus, string> = {
  verified: "bg-good/15 text-good",
  new: "bg-white/8 text-ink/80",
  inactive: "bg-white/5 text-muted",
  unsupported: "bg-bad/10 text-bad",
};

export function StatusChip({ status }: { status: ListingStatus }) {
  return (
    <span className={`rounded-full px-2 py-0.5 text-[11px] uppercase tracking-wide ${MAP[status]}`}>
      {status}
    </span>
  );
}
