export type RunMode = "with" | "without";

export type AdvantageTask = {
  id: "hf" | "lp" | "yield";
  category: "Security" | "Trading" | "Yield";
  title: string;
  goal: string;
  withoutSteps: string[];
  withSteps: string[];
  startHref: string;
};

export type AdvantageRun = {
  taskId: AdvantageTask["id"];
  mode: RunMode;
  seconds: number;
  costNote: string;
  quality: string;
  at: string;
};

export const TASKS: AdvantageTask[] = [
  {
    id: "hf",
    category: "Security",
    title: "Stop a liquidation",
    goal: "Raise a Venus health factor from ~1.19 to ≥ 1.50 with the smallest repay.",
    withoutSteps: [
      "Open Venus, find the account, read HF and debt.",
      "Compute repay so HF clears 1.40–1.50.",
      "Approve USDT, repayBorrow, check HF again.",
    ],
    withSteps: [
      "Open HF-Sentinel on HIREDESK.",
      "Read the dry run in English.",
      "Hire with a 100 USDT cap, run the action, read Why.",
    ],
    startHref: "/agent/hf-sentinel",
  },
  {
    id: "lp",
    category: "Trading",
    title: "Restore an LP",
    goal: "Get a Pancake V3 position earning again after it goes out of range.",
    withoutSteps: [
      "Open Pancake, find the NFT, see in-range = false.",
      "Collect fees, decrease liquidity, pick new ticks, mint.",
    ],
    withSteps: [
      "Open Range-Keeper.",
      "Dry run: collect + decrease.",
      "Hire under cap, run the action.",
    ],
    startHref: "/agent/range-keeper",
  },
  {
    id: "yield",
    category: "Yield",
    title: "Park idle USDT",
    goal: "Move 50 USDT to the better net of Venus supply vs Lista.",
    withoutSteps: [
      "Look up Venus supply APR and Lista APR.",
      "Subtract gas, pick a venue, approve, mint or stake.",
    ],
    withSteps: [
      "Open Yield-Mover.",
      "Dry run shows the venue and why.",
      "Hire, run the action.",
    ],
    startHref: "/agent/yield-mover",
  },
];

const KEY = "hiredesk.advantage.v1";

export function loadRuns(): AdvantageRun[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") as AdvantageRun[];
  } catch {
    return [];
  }
}

export function saveRun(run: AdvantageRun) {
  const next = [run, ...loadRuns().filter((r) => !(r.taskId === run.taskId && r.mode === run.mode))];
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function latestRun(runs: AdvantageRun[], taskId: AdvantageTask["id"], mode: RunMode) {
  return runs.find((r) => r.taskId === taskId && r.mode === mode);
}
