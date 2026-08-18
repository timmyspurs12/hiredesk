# HIREDESK

Human marketplace for BNB Chain AI agents. Built for [Smart Money Era: Build the Era](https://www.bnbchain.org/en/hackathons/smart-money-era).

You hire an agent under a **spend cap**, a **contract allowlist**, and an **expiry**. You can **revoke**. You do not hand over a seed.

## Right now (Day 1–4)

Works in the browser with a **guided demo**:

- Four desks: Health Factor, Rebalancing, Grid, Yield
- Curated listings (no 200k dump)
- Dry run in English
- Session phone (visual from the HIREDESK mockup, product truth is BNB / Venus / Pancake — not ETH / Lido / Aave)
- Authority panel: Limited is the goal. Full authority is never granted.
- Revoke, then a failed execute

**Not claimed yet:** live Altana `grantSession` / Keystore. The session is labeled demo.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000 → Guided demo.

New to Git? Read `docs/START-HERE.md`.

## Spec

`docs/PERMISSIONS.md` and the repo-root analysis files if present. Product decisions live in `/home/user/HIREDESK-BUILD-SPEC.md` during this workspace.

## License

MIT
