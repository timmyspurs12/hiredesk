import type { Job, JobEvent } from "./types";

const KEY = "hiredesk.jobs.v1";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function loadJobs(): Job[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") as Job[];
  } catch {
    return [];
  }
}

export function saveJobs(jobs: Job[]) {
  localStorage.setItem(KEY, JSON.stringify(jobs));
}

export function getJob(id: string) {
  return loadJobs().find((j) => j.id === id);
}

export function upsertJob(job: Job) {
  const jobs = loadJobs().filter((j) => j.id !== job.id);
  jobs.unshift(job);
  saveJobs(jobs);
  return job;
}

export function createDemoJob(input: {
  agentId: string;
  spendCapUsdt: string;
  expiryHours: number;
  allowlist: string[];
  hfMin?: string;
}): Job {
  const now = Date.now();
  const job: Job = {
    id: uid(),
    agentId: input.agentId,
    status: "active",
    spendCapUsdt: input.spendCapUsdt,
    expiryHours: input.expiryHours,
    createdAt: new Date(now).toISOString(),
    expiresAt: new Date(now + input.expiryHours * 3600_000).toISOString(),
    allowlist: input.allowlist,
    chainEnforced: { spendCap: true, expiry: true, allowlist: true },
    agentPolicy: { hfMin: input.hfMin, preferRepay: true },
    demo: true,
    onchain: false,
    events: [
      {
        id: uid(),
        at: new Date(now).toISOString(),
        title: "Session granted (demo)",
        detail: `Cap ${input.spendCapUsdt} USDT / ${input.expiryHours}h. Not yet written to Altana Keystore.`,
        protocol: "HIREDESK",
        status: "info",
      },
    ],
  };
  return upsertJob(job);
}

export function appendEvent(jobId: string, event: Omit<JobEvent, "id" | "at">) {
  const job = getJob(jobId);
  if (!job) return;
  job.events.unshift({
    ...event,
    id: uid(),
    at: new Date().toISOString(),
  });
  upsertJob(job);
  return job;
}

export function recordExecute(
  jobId: string,
  input: {
    title: string;
    detail: string;
    protocol: string;
    reason?: string;
    txHash?: string;
    onchain?: boolean;
  },
) {
  const job = getJob(jobId);
  if (!job) return;
  job.events = job.events.filter((e) => e.title !== input.title || e.status === "reverted");
  job.events.unshift({
    id: uid(),
    at: new Date().toISOString(),
    title: input.title,
    detail: input.detail,
    protocol: input.protocol,
    reason: input.reason,
    txHash: input.txHash,
    status: "ok",
  });
  return upsertJob(job);
}

export function revokeJob(jobId: string) {
  const job = getJob(jobId);
  if (!job) return;
  job.status = "revoked";
  job.revokedAt = new Date().toISOString();
  job.events.unshift({
    id: uid(),
    at: job.revokedAt,
    title: "Authority revoked",
    detail: "Session is dead. A new hire is required. Demo path — wire revokeSession next.",
    protocol: "HIREDESK",
    status: "info",
  });
  return upsertJob(job);
}

export function attemptAfterRevoke(jobId: string) {
  const job = getJob(jobId);
  if (!job || job.status !== "revoked") return job;
  return appendEvent(jobId, {
    title: "Execute refused",
    detail: "Session revoked. The next call cannot be signed.",
    protocol: "HIREDESK",
    status: "reverted",
  });
}
