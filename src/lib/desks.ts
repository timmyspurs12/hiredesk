import type { Desk } from "./types";

export const DESKS: Record<
  Desk,
  { slug: Desk; title: string; verb: string; blurb: string }
> = {
  "health-factor": {
    slug: "health-factor",
    title: "Health Factor",
    verb: "Protect my loan",
    blurb: "Keep a Venus borrow above the number you set.",
  },
  rebalancing: {
    slug: "rebalancing",
    title: "Rebalancing",
    verb: "Manage my LP",
    blurb: "Reset a PancakeSwap V3 range when it stops earning.",
  },
  grid: {
    slug: "grid",
    title: "Grid Trading",
    verb: "Run a grid",
    blurb: "Buy and sell one BSC pair inside bounds you choose.",
  },
  yield: {
    slug: "yield",
    title: "Yield",
    verb: "Move idle cash",
    blurb: "Park USDT where net APR is better after gas.",
  },
};

export const DESK_ORDER: Desk[] = [
  "health-factor",
  "rebalancing",
  "grid",
  "yield",
];
