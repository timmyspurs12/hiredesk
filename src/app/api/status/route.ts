import { NextResponse } from "next/server";
import { adminWallet, isAltanaConfigured } from "@/lib/server/altana";

export async function GET() {
  const configured = isAltanaConfigured();
  let walletAddress: string | null = null;
  if (configured) {
    try {
      const { wallet } = await adminWallet();
      walletAddress = wallet.address;
    } catch {
      walletAddress = null;
    }
  }
  return NextResponse.json({
    altanaConfigured: configured,
    chain: "bsc-testnet",
    chainId: 97,
    faucet: "https://testnet.bnbchain.org/faucet-smart",
    walletAddress,
  });
}
