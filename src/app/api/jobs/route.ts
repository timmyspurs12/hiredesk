import { NextResponse } from "next/server";
import { listingById } from "@/lib/listings";
import { saveSessionRow } from "@/lib/server/job-store";
import {
  adminWallet,
  callsFromAllowlist,
  isAltanaConfigured,
  newSessionSigner,
  tryFundTestnet,
  usdtSpend,
} from "@/lib/server/altana";
import type { Job, JobEvent } from "@/lib/types";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function event(title: string, detail: string, status: JobEvent["status"] = "info"): JobEvent {
  return { id: uid(), at: new Date().toISOString(), title, detail, protocol: "HIREDESK", status };
}

export async function POST(req: Request) {
  const body = (await req.json()) as {
    agentId: string;
    spendCapUsdt: string;
    expiryHours: number;
    allowlist: string[];
    hfMin?: string;
  };

  const agent = listingById(body.agentId);
  if (!agent || agent.dataTier !== "reference") {
    return NextResponse.json({ error: "Hire is only open on reference agents." }, { status: 400 });
  }

  const now = Date.now();
  const hours = body.expiryHours || 24;
  const job: Job = {
    id: uid(),
    agentId: agent.id,
    status: "active",
    spendCapUsdt: body.spendCapUsdt || "100",
    expiryHours: hours,
    createdAt: new Date(now).toISOString(),
    expiresAt: new Date(now + hours * 3600_000).toISOString(),
    allowlist: body.allowlist,
    chainEnforced: { spendCap: true, expiry: true, allowlist: true },
    agentPolicy: { hfMin: body.hfMin, preferRepay: true },
    demo: true,
    onchain: false,
    events: [],
  };

  if (!isAltanaConfigured()) {
    job.events.push(
      event(
        "Session granted (demo)",
        `Cap ${job.spendCapUsdt} USDT / ${hours}h. Add DEMO_ADMIN_PRIVATE_KEY to .env.local to write Keystore.`,
      ),
    );
    job.onchainNote = "not_configured";
    return NextResponse.json({ job });
  }

  let walletAddress: string | undefined;
  try {
    const { client, signer, wallet } = await adminWallet();
    walletAddress = wallet.address;
    job.walletAddress = wallet.address;
    const calls = callsFromAllowlist(agent.desk, body.allowlist);
    if (calls.length === 0) {
      return NextResponse.json({ error: "Allowlist cannot be empty." }, { status: 400 });
    }

    try {
      await tryFundTestnet(wallet.address);
    } catch {
      // best-effort testnet faucet
    }

    const sessionSigner = newSessionSigner();
    const expiry = Math.floor(now / 1000) + hours * 3600;
    const permissions = {
      calls,
      spend: [usdtSpend(job.spendCapUsdt)],
    };
    const session = await client.grantSession({
      wallet,
      signer,
      sessionSigner,
      permissions,
      expiry,
      register: true,
    });

    saveSessionRow({
      jobId: job.id,
      publicKey: session.publicKey,
      sessionKey: sessionSigner._privateKey,
      walletAddress: wallet.address,
      expiry,
      permissionsJson: JSON.stringify(permissions, (_k, v) =>
        typeof v === "bigint" ? v.toString() : v,
      ),
    });
    job.demo = false;
    job.onchain = true;
    job.grantTx = session.transactionHash;
    job.onchainNote = "keystore";
    job.events.push(
      event(
        "Session granted on BSC testnet",
        `Wallet ${wallet.address}. Keystore registered. Cap ${job.spendCapUsdt} USDT / ${hours}h.`,
        "ok",
      ),
    );
    if (session.transactionHash) {
      job.events[0].txHash = session.transactionHash;
    }
    return NextResponse.json({ job });
  } catch (err) {
    const message = err instanceof Error ? err.message : "grantSession failed";
    job.walletAddress = walletAddress;
    job.events.push(
      event(
        "On-chain grant failed — using demo",
        walletAddress
          ? `Wallet ${walletAddress} needs test BNB. Demo session is active.`
          : `${message}. Demo session is active.`,
      ),
    );
    job.onchainNote = "grant_failed";
    return NextResponse.json({
      job,
      warning: message,
      fundAddress: walletAddress ?? null,
      faucet: "https://testnet.bnbchain.org/faucet-smart",
    });
  }
}
