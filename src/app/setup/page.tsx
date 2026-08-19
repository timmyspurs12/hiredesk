import { OnchainBadge } from "@/components/onchain-badge";
import { SetupWallet } from "@/components/setup-wallet";

export default function SetupPage() {
  return (
    <main className="max-w-xl text-sm leading-relaxed text-muted">
      <p className="text-xs uppercase tracking-[0.2em]">Next step · BSC testnet</p>
      <h1 className="mt-2 text-3xl font-semibold text-ink">Turn hire into a real session</h1>
      <p className="mt-3">
        The site already works as a demo. This page is only if you want Altana to
        write a session on BSC testnet. You do not need this to click through the product.
      </p>
      <div className="mt-4">
        <OnchainBadge />
      </div>
      <SetupWallet />

      <ol className="mt-8 list-decimal space-y-4 pl-5 text-ink">
        <li>
          In Git Bash, inside <code className="text-muted">hiredesk</code>:
          <pre className="mt-2 overflow-x-auto rounded-xl bg-card p-3 text-xs text-muted">
            {`npm install
node scripts/new-key.mjs`}
          </pre>
        </li>
        <li>
          Create a file named <code className="text-muted">.env.local</code> in the hiredesk
          folder. One line:
          <pre className="mt-2 overflow-x-auto rounded-xl bg-card p-3 text-xs text-muted">
            DEMO_ADMIN_PRIVATE_KEY=0xyourkeyfromthescript
          </pre>
          Never put this on GitHub.
        </li>
        <li>
          Stop the site (<code className="text-muted">Ctrl+C</code>) and start it again:
          <pre className="mt-2 overflow-x-auto rounded-xl bg-card p-3 text-xs text-muted">
            npm run dev
          </pre>
          The badge should say <span className="text-good">Altana key set</span>.
        </li>
        <li>
          Hire HF-Sentinel once. If grant fails, the error will ask for test BNB. Get some at{" "}
          <a className="text-accent" href="https://testnet.bnbchain.org/faucet-smart">
            the BSC testnet faucet
          </a>{" "}
          for the wallet address shown on the session screen, then hire again.
        </li>
        <li>Tap REVOKE AUTHORITY. If on-chain worked, the activity line will show a real tx hash.</li>
      </ol>
    </main>
  );
}
