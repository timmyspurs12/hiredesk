# Padlock vs clipboard

## Padlock — the session (must be true on-chain)

When Altana is wired, these are `grantSession` fields:

- `permissions.calls` — contract + function. Never omit.
- `permissions.spend` — one USDT / day cap.
- `expiry`
- `revokeSession`

USDT `transfer` is **not** allowlisted.

## Clipboard — agent policy (not a padlock)

- Health-factor floor
- Prefer repay
- Slippage abort

The UI must say the chain will not enforce these.

## This week

The guided demo stores the session in the browser so a judge can finish without a wallet.
The session screen is labeled **demo (not on Keystore yet)**. Do not claim Altana until `grantSession` is live.
