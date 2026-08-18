export type Desk = "health-factor" | "rebalancing" | "grid" | "yield";
export type ListingStatus = "verified" | "new" | "inactive" | "unsupported";
export type DataTier = "network" | "reference" | "job";
export type Protocol = "venus" | "pancake" | "lista";
export type JobStatus = "draft" | "active" | "revoked";

export interface AgentListing {
  id: string;
  desk: Desk;
  status: ListingStatus;
  dataTier: DataTier;
  featured?: boolean;
  chainId: 56 | 97;
  erc8004TokenId?: string;
  name: string;
  handle: string;
  oneLiner: string;
  description: string;
  ownerAddress: string;
  agentWallet: `0x${string}`;
  protocols: Protocol[];
  hireFeeUsdt: string;
  metrics: Record<string, string | number | null>;
  metricsNote?: "insufficient_history" | "backtest" | "live";
  samplePolicy: string;
}

export interface CallPreset {
  id: string;
  label: string;
  to: `0x${string}`;
  signature: string;
  required: boolean;
}

export interface IntentCall {
  to: `0x${string}`;
  abiName: string;
  argsDecoded: Record<string, string>;
  dataPreview: string;
}

export interface DryRunIntent {
  agentId: string;
  desk: Desk;
  reasonCode: string;
  reads: Record<string, string>;
  calls: IntentCall[];
  projections: Record<string, string>;
  policyWarnings: string[];
  english: string;
  simulation: "success" | "revert";
}

export interface JobEvent {
  id: string;
  at: string;
  title: string;
  detail: string;
  protocol: string;
  txHash?: string;
  reason?: string;
  status: "ok" | "reverted" | "info";
}

export interface Job {
  id: string;
  agentId: string;
  status: JobStatus;
  spendCapUsdt: string;
  expiryHours: number;
  createdAt: string;
  expiresAt: string;
  revokedAt?: string;
  allowlist: string[];
  chainEnforced: {
    spendCap: boolean;
    expiry: boolean;
    allowlist: boolean;
  };
  agentPolicy: {
    hfMin?: string;
    preferRepay?: boolean;
  };
  demo: boolean;
  onchain: boolean;
  events: JobEvent[];
}
