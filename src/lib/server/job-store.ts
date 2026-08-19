import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

export type StoredSession = {
  jobId: string;
  publicKey: `0x${string}`;
  sessionKey?: `0x${string}`;
  walletAddress?: `0x${string}`;
  expiry?: number;
  permissionsJson?: string;
};

const dir = join(process.cwd(), "data");
const file = join(dir, "sessions.json");

function readAll(): Record<string, StoredSession> {
  try {
    return JSON.parse(readFileSync(file, "utf8")) as Record<string, StoredSession>;
  } catch {
    return {};
  }
}

function writeAll(data: Record<string, StoredSession>) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(file, JSON.stringify(data, null, 2));
}

export function saveSessionRow(row: StoredSession) {
  const all = readAll();
  all[row.jobId] = row;
  writeAll(all);
}

export function loadSessionRow(jobId: string) {
  return readAll()[jobId];
}

export function loadPublicKey(jobId: string) {
  return readAll()[jobId]?.publicKey;
}

export function deleteSession(jobId: string) {
  const all = readAll();
  delete all[jobId];
  writeAll(all);
}
