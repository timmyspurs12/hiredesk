# HIREDESK — Agent Advantage Report (TermiX)

**Product:** HIREDESK, human marketplace for BNB Chain agents  
**Rule:** ≥ 3 tasks × with agent hired through the marketplace vs without. Time, cost, output quality, attachments. ≥ 1 trading / equities / **security**.

Numbers in the live app (`/advantage`) are **recorded**, not invented. Paste them here before submit.

## Task 1 — Security: stop a liquidation

**Goal:** Raise Venus HF from ~1.19 to ≥ 1.50 with the smallest repay.

| | Without agent | With HIREDESK |
| --- | --- | --- |
| Time | _record_ | _record_ |
| Cost | Venus UI + gas | Hire fee 0.50 USDT (waived on demo) + gas if on-chain |
| Output | Manual repay, HF re-read | Dry run English + Why + repay intent |
| Attachment | Screenshot / tx | Session URL + Why text |

**Without:** open Venus → read HF/debt → compute repay → approve → repayBorrow → check HF.  
**With:** `/agent/hf-sentinel` → dry run → hire cap 100 USDT / 24h → run action → Why.

## Task 2 — Trading: restore an LP

**Goal:** Pancake V3 position out of range → earning again.

Same table. Agent: Range-Keeper. Fallback if LP calldata is not live: labeled collect/decrease dry run, not a fake fill.

## Task 3 — Yield: park idle USDT

**Goal:** 50 USDT to better **net** of Venus supply vs Lista.

Same table. Agent: Yield-Mover. APR figures on demo are labeled demo reads.

## Notes for TermiX

- You can hire from the marketplace yourselves (demo path needs no wallet).
- On-chain Keystore grant needs test BNB; demo still completes Functionality.
- We did not build an equities agent. Security + trading cover the letter of the rule.
