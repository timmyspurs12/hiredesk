export type ScanAgent = {
  token_id: number;
  chain_id: number;
  name: string;
  description: string;
  owner_address: string;
  total_score?: number;
  star_count?: number;
};

export async function fetchScanAgents(chainId: number, limit = 6): Promise<ScanAgent[]> {
  try {
    const url = `https://8004scan.io/api/v1/public/agents?chainId=${chainId}&limit=${limit}&sortBy=created_at&sortOrder=desc`;
    const res = await fetch(url, { next: { revalidate: 120 } });
    if (!res.ok) return [];
    const json = (await res.json()) as { data?: ScanAgent[] };
    return Array.isArray(json.data) ? json.data : [];
  } catch {
    return [];
  }
}
