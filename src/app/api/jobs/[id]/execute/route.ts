import { NextResponse } from "next/server";
import { listingById } from "@/lib/listings";
import { buildDryRun } from "@/lib/dry-run";
import { executeTitle, explainWhy } from "@/lib/why";
import { loadSessionRow } from "@/lib/server/job-store";
import { adminWallet, isAltanaConfigured } from "@/lib/server/altana";
import { encodeDeskAction } from "@/lib/server/encode-action";
import { signerFromPrivateKey } from "@altananetwork/sdk";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as {
    agentId?: string;
    onchain?: boolean;
  };
  const agent = body.agentId ? listingById(body.agentId) : undefined;
  if (!agent) {
    return NextResponse.json({ error: "Unknown agent" }, { status: 400 });
  }

  const intent = buildDryRun(agent.id, agent.desk);
  const why = explainWhy(intent);
  const title = executeTitle(agent.desk);

  const row = loadSessionRow(id);
  const canChain =
    Boolean(body.onchain) &&
    isAltanaConfigured() &&
    Boolean(row?.sessionKey) &&
    Boolean(row?.walletAddress);

  if (!canChain) {
    return NextResponse.json({
      ok: true,
      onchain: false,
      title,
      why,
      detail: "Demo execute. Same intent as the dry run. No funds moved.",
    });
  }

  const calls = encodeDeskAction(agent.desk);
  if (!calls) {
    return NextResponse.json({
      ok: true,
      onchain: false,
      title,
      why,
      detail: "This desk is not encoded for live execute yet. Demo only.",
    });
  }

  try {
    const { client } = await adminWallet();
    const permissions = row!.permissionsJson
      ? (JSON.parse(row!.permissionsJson) as {
          calls: { to: `0x${string}`; signature: string }[];
          spend: { token?: `0x${string}`; limit: string; period: "day" }[];
        })
      : { calls: [], spend: [] };
    const session = {
      walletAddress: row!.walletAddress!,
      signer: signerFromPrivateKey(row!.sessionKey!),
      publicKey: row!.publicKey,
      permissions: {
        calls: permissions.calls,
        spend: permissions.spend.map((s) => ({
          ...s,
          limit: BigInt(s.limit),
        })),
      },
      expiry: row!.expiry ?? Math.floor(Date.now() / 1000) + 3600,
    };
    const result = await client.execute({ session, calls });
    return NextResponse.json({
      ok: true,
      onchain: true,
      title,
      why,
      detail: "Executed through the Altana session on BSC testnet.",
      transactionHash: result.transactionHash ?? null,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "execute failed";
    return NextResponse.json({
      ok: false,
      onchain: false,
      title,
      why,
      detail: `On-chain execute reverted. ${message} Demo intent still shown.`,
      error: message,
    });
  }
}
