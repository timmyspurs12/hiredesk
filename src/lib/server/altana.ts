import "server-only";
import { createClient as createViemClient, http, parseEther } from "viem";
import {
  createClient,
  BNB_TESTNET,
  signerFromPrivateKey,
  createPrivateKeySigner,
  fundNative,
} from "@altananetwork/sdk";
import { PRESETS } from "@/lib/presets";
import type { Desk } from "@/lib/types";

export function isAltanaConfigured() {
  return Boolean(process.env.DEMO_ADMIN_PRIVATE_KEY?.startsWith("0x"));
}

function adminKey() {
  const key = process.env.DEMO_ADMIN_PRIVATE_KEY;
  if (!key?.startsWith("0x") || key.length < 66) {
    throw new Error("DEMO_ADMIN_PRIVATE_KEY is missing. Add it to .env.local");
  }
  return key as `0x${string}`;
}

export function altanaClient() {
  return createClient({ chains: [BNB_TESTNET] });
}

export function adminSigner() {
  return signerFromPrivateKey(adminKey());
}

export async function adminWallet() {
  const client = altanaClient();
  const signer = adminSigner();
  const wallet = await client.createWallet({ signer });
  return { client, signer, wallet };
}

export function callsFromAllowlist(desk: Desk, allowlist: string[]) {
  return PRESETS[desk]
    .filter((p) => allowlist.includes(p.id))
    .map((p) => ({ to: p.to, signature: p.signature }));
}

export function newSessionSigner() {
  return createPrivateKeySigner();
}

export async function tryFundTestnet(address: `0x${string}`) {
  if (!BNB_TESTNET.relayUrl) return { ok: false as const };
  const relay = createViemClient({
    chain: BNB_TESTNET.chain,
    transport: http(BNB_TESTNET.relayUrl, { timeout: 60_000 }),
  });
  await fundNative(relay as never, address, parseEther("0.02"));
  return { ok: true as const };
}

export function usdtSpend(limitUsdt: string) {
  const n = Number(limitUsdt);
  const safe = Number.isFinite(n) && n > 0 ? n : 100;
  return {
    token: (process.env.USDT_TESTNET as `0x${string}` | undefined) ??
      ("0x337610d27c682E347C9cD60BD4b3b107C9d34dDd" as const),
    limit: BigInt(Math.round(safe)) * BigInt("1000000000000000000"),
    period: "day" as const,
  };
}


