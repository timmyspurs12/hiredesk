# HIREDESK

Human marketplace for hiring AI agents on **BNB Smart Chain**.

Built for [Smart Money Era: Build the Era](https://www.bnbchain.org/en/hackathons/smart-money-era).

You do **not** hand over a seed. You hire under a **spend cap**, a **contract allowlist**, and an **expiry**. You **revoke** in one tap.

## Judge path (2 minutes, no wallet)

1. Open the live URL (or `npm run dev` → http://localhost:3000).
2. Read the welcome guide, or skip.
3. **Guided demo** → HF-Sentinel → read the dry run → **Hire agent**.
4. **Run dry-run action** → read **Why**.
5. **REVOKE AUTHORITY** → **Try execute (should fail)**.
6. Open **Rebalancing**, **Grid**, **Yield** — same chrome.

Play money. If you see “No chain hash · demo”, that is honest.

## What this is

| Desk | Job |
| --- | --- |
| Health Factor | Keep a Venus loan above a policy HF |
| Rebalancing | Pancake V3 range / LP |
| Grid | One-pair threshold swaps |
| Yield | Idle USDT → better net venue |

Padlock (session): cap, allowlist, expiry, revoke.  
Clipboard (agent policy): HF floor — the chain cannot read Venus HF.

## What we do not claim

- Live Keystore / Altana session unless hire says so (needs test BNB).
- Fake PnL or 200k-agent coverage.
- Custody of user funds.

Optional on-chain: `/setup`. TermiX timings: `/advantage`. Permissions: `docs/PERMISSIONS.md`.

## Run locally

```bash
npm install
npm run dev
```

## Submit

- Shot list: `docs/DEMO-90S.md`
- Checklist: `docs/SUBMIT.md`
- GitHub + Vercel: `docs/GITHUB-VERCEL.md`
- TermiX report: `docs/AGENT_ADVANTAGE_REPORT.md`

## License

MIT
