import { NextResponse } from "next/server";
import { deleteSession, loadPublicKey } from "@/lib/server/job-store";
import { adminWallet, isAltanaConfigured } from "@/lib/server/altana";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!isAltanaConfigured()) {
    return NextResponse.json({ ok: true, onchain: false, note: "demo revoke only" });
  }

  const publicKey = loadPublicKey(id);
  if (!publicKey) {
    return NextResponse.json({ ok: true, onchain: false, note: "no stored session" });
  }

  try {
    const { client, signer, wallet } = await adminWallet();
    const result = await client.revokeSession({
      wallet,
      signer,
      session: publicKey,
    });
    deleteSession(id);
    return NextResponse.json({
      ok: true,
      onchain: true,
      transactionHash: result.transactionHash ?? null,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "revokeSession failed";
    return NextResponse.json({ ok: false, onchain: false, error: message }, { status: 500 });
  }
}
