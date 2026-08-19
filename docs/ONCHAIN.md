# Hire → Altana session (step 2)

Without a key, hire stays a **labeled browser demo**.

With `DEMO_ADMIN_PRIVATE_KEY` in `.env.local`:

1. `POST /api/jobs` calls `grantSession` on **BSC testnet** (chain 97).
2. Allowlist + daily USDT cap + expiry are set. `calls` is never omitted.
3. Session public key is stored in `data/sessions.json` (gitignored).
4. `POST /api/jobs/:id/revoke` calls `revokeSession`.

Generate a throwaway key:

```bash
node scripts/new-key.mjs
```

Fund the **smart account address** shown after the first hire, not only the EOA:

https://testnet.bnbchain.org/faucet-smart
