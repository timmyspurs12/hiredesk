# HIREDESK — Final Build Specification

**Status:** Source of truth. Supersedes `BNB-Hack-Winning-Strategy.md` and all prior HIREDESK chat analysis.  
**Contest:** [Smart Money Era: Build the Era](https://www.bnbchain.org/en/hackathons/smart-money-era)  
**Verified against official pages:** 18 Aug 2026  
**Build window remaining:** now → **9 Sep 2026 23:59 UTC**  
**Do not start coding from the old strategy doc. Start from this file.**

---

# Part 0 — Verdict first

The thesis is correct. Most of the proposed feature list is **too big** and some of it is **fake security**. The winning version is smaller, stricter, and more honest.

**Keep:** marketplace-as-product, four equal desks, trust-limited labor, Dry Run, on-chain session hire, Agent Authority panel, one-click revoke, curated inventory, four reference agents, TermiX report from day one, honest metrics.

**Cut or demote:** Smart Money Score, AI chatbot matching, Pause, slippage/HF-as-chain-security, x402-as-blocker, ERC-8183-as-MVP, 200k-agent dump, custom identity/payment/escrow contracts, dual Online Edition as a critical path.

**Add (you did not list this; it will decide Functionality):** a **Judge Demo Path**. A stranger with a fresh wallet and no Venus position must complete hire → action → revoke without a dead end.

---

# Part 1 — Reconfirmed official requirements

Re-fetched 18 Aug 2026 from:

- https://www.bnbchain.org/en/hackathons/smart-money-era
- https://www.bnbchain.org/en/blog/build-the-era-build-the-official-bnb-agent-studio-marketplace
- https://docs.altana.network/ (sessions, grantSession, Keystore, ERC-8183)
- https://8004scan.io/developers and OpenAPI

Legend used below:

- **CONFIRMED** = written on the official page / docs
- **STRATEGIC** = our choice to win
- **OPTIONAL** = only if the MUST list is done

## 1.1 Main track — CONFIRMED

| Item | Official text / implication |
| --- | --- |
| What to build | **The marketplace**, not a portfolio of agents. Front door: find, understand, **activate/hire**. |
| Categories | **Rebalancing** (LP ranges), **Grid Trading**, **Yield Optimisation**, **Health Factor Monitoring**. All first-class. |
| Diversity bar | “Single-category submissions score poorly. All four, equally deep, is the bar.” |
| Functionality | End-to-end: land → find by category → understand → activate. Zero Agent Studio knowledge. No dead ends. |
| Data Quality | Real-time, accurate, **beyond basic counts**. User can make an informed hire decision. |
| Agent Diversity | All four surfaced with equal depth. |
| Weights | **Not published as percentages.** Three judges score independently, then compare. |
| Phase 2 | Exists. Criteria **[REDACTED]**. Assume they will poke the live site, not the deck. |
| Eligibility | Global, solo or team. **One entry per team.** Must be **functional and publicly accessible** during judging. |
| Live agents | “Agents surfaced on your marketplace must be **live on BSC**.” Treat as **BSC mainnet (56) and/or BSC testnet (97) with real contracts**. Safer: testnet for the full loop + at least some mainnet session txs for Altana. |
| Adoption prize | Winner considered for **official BNB Agent Studio marketplace**. $30,000 equivalent. |
| Timeline | Build **now → 9 Sep**. Shortlist top 3. Phase 2 redacted. Winner **5 Nov**. |
| Submit | https://forms.gle/9g9XPNFwnYaHAz9L8 — tick partner tracks on the same form. |
| Tooling hint | Agent Studio CLI / Cursor scaffold. Studio runs on AWS. Not a separate track. |
| Payments mentioned | Blog: **Binance x402** is the payment facilitator in Agent Studio. Not a scored main-track criterion. |
| Blog vs page mismatch | Blog still lists “Monitoring agents” as a guidance category. **Official Tracks tab wins: Rebalancing, not generic monitoring.** |

**Not required (do not invent them as requirements):**

- A token, DAO, NFT, or custom identity standard
- Indexing all 200k ERC-8004 agents
- ERC-8183
- x402
- A numerical Functionality/Data/Diversity rubric
- Dual submission to BNB Hack: Online Edition
- On-chain marketplace registry
- Equities/stocks agents (that is TermiX weighting, not main track)

## 1.2 Altana — CONFIRMED

To be **considered** (not just mentioned):

1. Agents on **their own Altana wallets**
2. Sessions with **real limits**: call allowlist, spend cap, expiry
3. Sessions **registered in Keystore**
4. **Real on-chain txs through a session key** (testnet counts; **mainnet is stronger**)
5. **User-facing control**: see what the agent may do, **revoke inside the product**
6. Include **wallet address(es)** in the submission
7. Proof via **Altana explorer**

**On-chain enforceable today** (`@altananetwork/sdk` 0.7.1):

```
permissions.calls[]  → { to?: address, signature?: "fn(type,type)" }
permissions.spend[]  → { token, limit, period: "hour" | "day" }
expiry               → unix seconds, auto, no tx
grantSession         → registers Keystore by default
execute(session, calls)
revokeSession        → one tx, immediate, monotonic (cannot un-revoke)
isValidKey / getKeys → free eth_call
```

**Critical SDK footgun (CONFIRMED):** if `permissions.calls` is omitted, the session can call **any contract** within the spend cap. We must always set both `calls` and `spend`.

**Bonus, not required:** ERC-8183 hire (`hireErc8183Agent`), sell over x402 (`@altananetwork/x402-server`).

**New as of 18 Aug 2026:** Altana is a wallet option inside **BNB Agent Studio v2**. Using it is aligned, not exotic.

## 1.3 TermiX — CONFIRMED

They **do not require a TermiX integration**. They will **hire from our marketplace themselves**.

| Criterion | Weight |
| --- | --- |
| Value of the services | 30% |
| Proven agent advantage (the report) | 30% |
| High-stakes categories & track record (trading / equities / security) | 20% |
| Marketplace quality (find, compare, hire, no instructions) | 20% |

**Agent Advantage Report is mandatory for eligibility:**

1. ≥ **3 real tasks**, each run **with agent hired through HIREDESK** vs **without**
2. For each: **time, cost, output quality**, actual outputs attached
3. ≥ **1 task** in trading, stock/equities, **or security**

We will **not** build an equities agent. Security (liquidation protection) + trading (grid or LP rebalance) satisfies the letter. Equities would be scope suicide.

## 1.4 PancakeSwap — CONFIRMED

One of these is enough:

- Smarter **liquidity management**
- Better **yields**
- Research that spots demand for **new pools**
- **Safe automated swaps** on Pancake products
- **Never put user funds at risk**

LP management is strongest. Safe swaps are an officially accepted fallback. Pool-gap research is a blog-post, not a product — **do not build it**.

## 1.5 8004scan — CONFIRMED capability, STRATEGIC use

Public API fields for an agent are thin:

`token_id, chain_id, name, description, image_url, owner_address, supported_protocols (MCP|A2A|OASF|Web|Email), total_score, star_count, total_feedbacks, created_at`

There is **no** last-tx, no Venus HF, no IL, no PnL. Semantic search exists (`GET /agents/search?q=`).

Hackathon Pro tier: 500 rpm / 100k per day via [upgrade form](https://forms.gle/jQevEPCAacBXaKG79).

**Implication:** 8004scan can power **identity + reputation + search**. It **cannot** power category performance cards. Anyone who slaps “liquidations prevented” on a random 8004 agent is fabricating data.

## 1.6 Changes since the previous HIREDESK write-up

| Previous assumption | Now |
| --- | --- |
| Online Edition is the primary contest | **Wrong for this spec.** Primary = Build the Era. Online Edition is a later optional submit. |
| Functionality / Data / Diversity have published % | **They do not.** |
| “Monitoring” is a required desk | **No.** Official desk is **Rebalancing**. |
| Unibase / APRO / Solidus still matter | **No** for this contest. |
| x402 is required to look official | **Mentioned, not scored.** Altana bonus only. |
| Altana is a side bet | **Now first-party Studio wallet.** Higher expected judge familiarity. |
| 8004scan can feed strategy metrics | **It cannot.** |

---

# Part 2 — Challenges (what we reject, and why)

## 2.1 Trust-limited labor — ACCEPT as the product principle

It maps 1:1 onto Altana sessions and onto Pancake’s “never put user funds at risk.” It is the only positioning that is not “another trading bot marketplace.”

Final sentence:

> **HIREDESK sells trust-limited autonomous labor: a person hires a specialist agent under a spend cap, a contract allowlist, and an expiry they can revoke.**

## 2.2 Dry Run — ACCEPT as a core architecture component

**Why it wins Functionality:** the official journey is land → understand → activate. “Understand” is where every clone dies. Dry Run is understand, made concrete.

**Why it is feasible:** the agent does not stream chain-of-thought. It returns a structured `Intent` (`calls[]` + rationale codes + reads). HIREDESK runs `viem` simulation / `eth_call` against BSC and decodes known ABIs. Numbers come from the node, not the LLM.

**Why it is not an Altana requirement:** Altana scores grant/execute/revoke. Dry Run is off-chain. It still *helps* Altana because the user sees the exact calls that the session must allow.

**Risk:** LLM-written dry runs with invented HF numbers. That is a disqualifier. **Banned.**

## 2.3 Permission policies — ACCEPT only what the chain enforces

| Control | Enforceable? | Product treatment |
| --- | --- | --- |
| Spend cap (per token, per hour/day) | **Yes** — `permissions.spend` | Security-critical. Always set. |
| Expiry | **Yes** | Security-critical. |
| Call allowlist (contract + optional selector) | **Yes** — `permissions.calls` | Security-critical. Never omit. |
| “Cannot transfer externally” | **Only if** USDT `transfer` / `transferFrom` are **not** allowlisted. Allow `approve` + Venus/Pancake methods only. | Show as CANNOT only when the session literally cannot call `transfer`. |
| Daily limit **and** per-tx cap as two controls | Spend is a **rolling period**, not per-tx. | **One** spend permission. Do not draw two sliders that do the same thing. |
| Slippage limit | **No** (unless we write a wrapper router — out of scope) | Agent **policy**. Label: “Agent will abort if estimated slip > X.” Not a padlock. |
| “Never let HF < 1.40” | **No** | Agent **policy**. The session cannot read Venus HF. |
| Max 2 txs/day | **No** | Agent policy or our worker. Not chain. |
| Pause | **No** | **Do not ship Pause.** A backend `paused` flag is not security. It teaches judges a lie. Revoke only. |

Hire is **not** “Connect → Hire.” Hire is **Configure session → Dry Run → Grant session on-chain → Agent may execute**.

## 2.4 Agent Authority panel — ACCEPT as signature UX

Must **read Keystore** (`isValidKey` / `getKeys`) plus the persisted session permissions. If the panel is a React state mirror of the form, it is marketing.

This is the feature judges will screenshot.

## 2.5 Category metrics — ACCEPT with a two-tier data rule

**Tier A — Network agents (8004scan):** name, description, owner, protocols, `total_score`, stars, feedbacks, created_at, our capability tag, last-seen **only if we indexed it**. Strategy columns = **“Insufficient historical data.”**

**Tier B — HIREDESK reference agents + completed jobs we executed:** category metrics computed from **our** event log and tx receipts.

Never mix tiers without a label.

## 2.6 Smart Money Score — REJECT as a product surface

A composite “AI score” is exactly the vanity metric Data Quality is trying to escape. 8004scan already has `total_score`. Inventing another score:

- cannot be sourced for 200k agents
- hides the raw numbers judges need
- invites “fake reputation”

**Replacement:** no default composite. Optional **Reliability badge** on *our* agents only: `Live` / `New` / `Inactive`, click-to-explain, derived from last successful job + last Keystore-valid session. Not a 0–100 number.

## 2.7 Hotel-page profile + progressive disclosure — ACCEPT

Primary copy is human. ERC-8004 / tokenId / registry live under **Advanced**. This is how a zero-knowledge judge survives.

## 2.8 “Why this agent?” AI matching — DEMOTE

8004scan already offers semantic search. A custom LLM ranker will hallucinate “strong recent performance” for agents with no data.

**MVP:** deterministic filters (desk, status, last-seen, hire fee) + optional 8004scan `q=` search.

**Should-build if time:** a **Match** box that parses 4 structured fields (budget, risk, max txs/day, protocol) with regex/rules — **no free-chat**. Explanation is a bullet list of matched facts.

**Do not build:** a chatbot.

## 2.9 Compare 2–3 agents — ACCEPT

Cheap, judgeable, directly serves Data Quality. Category-specific columns. Empty cells say “n/a — insufficient data,” never “0.”

## 2.10 Curate before indexing 200k — ACCEPT, strengthen

Promoting 200k cards is an anti-feature. Default each desk to:

- 1 featured **reference** agent (ours, fully metric’d)
- 4–8 **curated** network agents (manual allowlist + 8004scan hydrate)
- A “Browse more via 8004scan” search that labels almost everything **Unsupported** or **New**

Quality of discovery > headcount. Do not put `200,000 agents` as a hero number. That is the “basic count” they told us not to do.

## 2.11 Four reference agents — ACCEPT, one runtime

Four giant systems will miss 9 Sep. One `AgentRuntime`, four `Strategy` modules, one execute path.

They exist to prove the marketplace. They are not the company.

## 2.12 Health Factor as demo hero — ACCEPT, with a hard diversity gate

The 90s video **must** end by opening Rebalancing / Grid / Yield with the **same chrome** and a **live last-action** on each. If only HF executes on-chain, we are a single-category submission with extra tabs.

## 2.13 Pancake LP for the bounty — ACCEPT as target, with an official fallback

Full V3 market-making (tick math, multi-position, gas-optimal) is a product by itself.

**MVP Rebalancing agent:**

1. Read position NFT / range / in-range boolean
2. If out of range: Dry Run “collect fees → decrease → mint new range around spot”
3. Execute via **Altana PancakeSwap Liquidity skill** if it covers this; otherwise a **minimal** NPM (`NonfungiblePositionManager`) script we own
4. If that slips: **fallback** still valid for the bounty — collect fees + one **safe Pancake swap** under session cap, labeled honestly as “swap assistant,” plus a written LP path in the README

Never custody. Never unlimited approve. Approve the NPM/router only, at or below the spend cap if we can; otherwise approve-then-session still better than `MaxUint256` on a random spender.

## 2.14 Honest grid — ACCEPT

No on-chain native grid on Pancake. Ours is **threshold-triggered market swaps** on one pair, with fills, PnL, drawdown, window. Label **Live** vs **Backtest**. Never mix. Never 100% win rate.

## 2.15 Net yield — ACCEPT, two or three venues only

Venus supply APR + Lista staking (+ optional Pancake farm). Show **net = APR − gas − a risk tag**. No 40-venue optimizer. Conservative and explainable.

## 2.16 TermiX from day one — ACCEPT

The report is 30% of that prize and **eligibility**. Tasks are designed in this spec. We log time/cost/outputs as we build, not on 8 Sep.

## 2.17 In-product Agent Advantage page — SHOULD, not MUST

Useful. Dangerous if numbers are decorative. Ship it **only** bound to the same measurements as the PDF report. If we cannot measure, the page does not exist.

## 2.18 Traceable activity — ACCEPT

Every job event: timestamp, agent, action, protocol, amount, status, tx hash, BscScan/testnet link, rationale code.

## 2.19 “Why did the agent do this?” — ACCEPT as templates, not LLM

```
reason_code: HF_BELOW_POLICY
reads: { hf_before: 1.19, policy_min: 1.40 }
action: REPAY
amount: 42 USDT
constraint: spend_remaining_ok
```

Render a paragraph from that. No hidden chain-of-thought.

## 2.20 Revoke first-class — ACCEPT. Pause — REJECT

Revoke on profile, live job, dashboard, Authority panel. Calls `revokeSession`. Then `isValidKey === false`. Show the revoke tx.

## 2.21 Payment / x402 — DEMOTE

A fake x402 spinner is worse than a boring USDT transfer.

**MVP hire fee:** user pays a small **USDT or $U** transfer to the HIREDESK treasury (or the agent wallet) as a normal call in the hire userOp. Split is a config constant (e.g. 20% protocol / 80% builder) recorded in our DB. Not a new tokenomic contract.

**Should:** if the main loop is done, put `@altananetwork/x402-server` on `POST /api/hire` as an Altana bonus. Do not block anything on Binance Pay merchant setup.

## 2.22 ERC-8183 — DEMOTE exactly as you suggested

It is agent-to-agent job escrow in $U. Official Altana **bonus**. It is **not** the human hire journey. Implementing it first would optimize the wrong user.

Phase 2 only. One `hireErc8183Agent` demo from the user’s session is enough if we get there.

## 2.23 Product hierarchy — ACCEPT, with one insert

```
0. Judge Demo Path          ← added, or Functionality dies
1. Marketplace
2. Discovery (4 desks)
3. Comparison
4. Dry Run
5. Scoped hiring (Altana session)
6. Autonomous / one-shot execution
7. Monitoring
8. Revoke
```

Everything else is secondary.

## 2.24 Architecture diagram — ACCEPT with corrections

```
                         HIREDESK APP
                              │
           ┌──────────────────┼──────────────────┐
           │                  │                  │
     DESK DISCOVERY     COMPARE 2–3        MATCH (rules)
     + 8004scan hydrate                        optional
           │                  │                  │
           └──────────────────┼──────────────────┘
                              │
                         PROFILE
                              │
                           DRY RUN
                     (Intent + eth_call)
                              │
                      SESSION POLICY FORM
                              │
                    grantSession + Keystore
                              │
                      AGENT RUNTIME
                              │
              ┌───────────────┼───────────────┐
              │               │               │
           VENUS         PANCAKE NPM        LISTA
              │               │               │
              └───────────────┼───────────────┘
                              │
                    JOB EVENTS + RECEIPTS
                              │
                         revokeSession
```

AI Matching is not a peer of Discovery. Keystore is the permission source of truth.

## 2.25 Missing requirement you did not list — Judge Demo Path

Official Functionality: *someone with zero Agent Studio knowledge, no dead end.*

A judge will not have a Venus borrow, a V3 NFT, or $U. If Connect Wallet is the only path, we fail.

**MUST:**

1. Browse all four desks **logged out**
2. Button: **“Run the guided demo (BSC testnet)”**
3. Demo uses a **pre-funded HIREDESK demo wallet** we control, with:
   - a small Venus borrow (HF deliberately ~1.2)
   - a small out-of-range or in-range Pancake position **or** a documented swap fallback
   - idle USDT for yield
   - a grid pair with a last fill
4. Judge clicks through Dry Run → Hire (we grant a session from the demo admin) → Execute → Authority panel → Revoke
5. Copy says this is a shared demo account; they can repeat with their own wallet after

Without this, the rest of the spec is academic.

---

# Part 3 — Score after the cuts

Assuming we ship the MUST list and not the rejected list.

| Criterion | Score / 10 | Why |
| --- | --- | --- |
| Main-track fit | **9** | We are building the thing the page describes. Risk is execution, not thesis. |
| Functionality | **8** | 8 only if Judge Demo Path + hire + revoke work logged-in *and* logged-out browse. 3 without the demo path. |
| Data Quality | **7** | Honest two-tier metrics + compare. Loses a point because 8004scan is thin and we will not invent coverage. |
| Agent Diversity | **8** | Four desks, four live reference actions, same UX. 4 if HF is the only real execute. |
| Innovation | **7** | Dry Run + Authority panel + honest session model. Not a new protocol. Good — judges asked for a front end. |
| UX | **8** | Booking.com pattern, progressive disclosure. Dies if we leak hex everywhere. |
| BNB integration | **8** | 8004scan + Studio-shaped agents + BSC execution. Agent Studio CLI is nice-to-have, not identity. |
| Altana potential | **9** | Their checklist is our hire path. Mainnet session txs would make this a 10. |
| TermiX potential | **7** | Report + they can hire. We skip equities. Agents must actually complete the three tasks. |
| PancakeSwap potential | **6** | LP done well is an 8. Honest swap fallback is a 5–6 and still eligible. Do not claim LP if we only swap. |
| Technical feasibility | **7** | 22 days, known SDKs, no custom protocol. Tight because four strategies + simulation + Keystore UI. |
| Time-to-build | **6** | Feasible only with the cuts in this spec. The original 30-item wishlist is a 3. |
| Winner potential | **7** | Highest among options we have seen **if** the live site is clickable. Not a lock: every serious team will ship a marketplace. Differentiation is Dry Run + real sessions + demo path + honesty. |

---

# Part 4 — Scope buckets

## MUST BUILD

1. Public 4-desk marketplace, equal depth, logged-out browse
2. Curated listings + 8004scan hydrate (identity/reputation only)
3. Agent profile (human first, Advanced for chain IDs)
4. Compare 2–3, category columns
5. Dry Run = structured Intent + node simulation + English + Advanced calldata
6. Hire form: spend cap, expiry, call allowlist (from a **preset per desk**, editable)
7. Real Altana: agent wallets + user/demo wallet + `grantSession` (calls+spend+expiry, Keystore on) + `execute` + `revokeSession`
8. Agent Authority panel bound to Keystore
9. Four reference agents, one runtime, **one real on-chain action each**
10. Judge Demo Path on BSC testnet
11. Job activity feed with explorer links + rationale templates
12. Status model: Verified / New / Inactive / Unsupported
13. TermiX Advantage Report drafted as we go (3 tasks)
14. Public URL, README, demo video script, wallet addresses for Altana form
15. No fabricated performance

## SHOULD BUILD

1. Reliability badge (not a 0–100 score) on our agents
2. Rules-based Match box (not a chat)
3. In-product Advantage page bound to real measurements
4. Mainnet Altana session txs (even tiny) for a stronger Altana score
5. Pancake **LP** path via official skill / NPM
6. x402 paid hire endpoint
7. Seed 8–12 curated network agents so desks do not look empty
8. Mobile-usable layout (judges will use laptops; still do not break 390px)

## NICE TO HAVE

1. ERC-8183 one-shot hire
2. Agent Studio CLI deploy of the four agents (manual ERC-8004 register is enough)
3. Dual submit to Online Edition after 9 Sep
4. Fee collect + IL estimate polish
5. Backtests clearly labeled, never mixed into Live columns

## DO NOT BUILD

- Token, DAO, NFT, social feed, chat, inbox
- Custom identity, custom escrow, custom session contracts
- Generic portfolio tracker / trading terminal
- Smart Money Score / fake stars
- Pause
- Slippage or HF as padlock security
- 200k-agent infinite scroll
- Equities/stocks agent
- Cross-chain (Ethereum/Base Keystore cache)
- Pool-gap research tool
- Generic LLM chatbot
- Wrapper router just to enforce slippage
- Dual-write “security” in the frontend only

---

# Part 5 — Final product specification

## 5.1 Thesis

HIREDESK is the human-facing BNB Agent Studio marketplace.

Agents already exist. HIREDESK is where a person:

**discover → understand → compare → dry-run → hire under a session → monitor → revoke**

The marketplace is the product. The four reference agents are inventory.

## 5.2 Users

| User | Job to be done | What we optimize |
| --- | --- | --- |
| Judge / first-time visitor | Finish the journey with zero context | Demo path, copy, no dead ends |
| DeFi user | Hire labor without handing over a seed | Authority panel, caps, revoke |
| Agent builder (us, then others) | Get listed and earn a hire fee | Listing record + fee split in DB |

Ignore agent-to-agent as a v1 buyer.

## 5.3 Exact user journey

### A. Browse (no wallet)

1. Land on `/` — four desks, one sentence each, no manifesto
2. Open `/desk/health-factor` (or rebalancing / grid / yield)
3. See featured reference agent + curated list
4. Open compare (max 3)
5. Open profile

### B. Understand

6. Read one-sentence job + sample policy
7. Click **Dry Run** (against demo position or connected wallet reads)
8. Read English intent + projected state. Open Advanced for calldata.

### C. Hire

9. Preset allowlist for that desk. User sets **spend cap** + **expiry**
10. Optional agent policy fields (HF min, slip abort, prefer repay) — labeled **Agent will try**
11. Confirm. Wallet/admin signs **`grantSession`** (demo path: we sign)
12. Hire fee transfer in the same flow
13. Job `ACTIVE`

### D. Work

14. Runtime executes the simulated intent (demo: immediately; production: loop)
15. Activity row appears with tx hash + “Why”
16. Authority panel shows CAN / CANNOT / countdown, Keystore-valid

### E. Fire

17. **Revoke access** → `revokeSession` → panel flips to REVOKED → next execute fails
18. Show the failed execute (or a deliberate “try again” that reverts) once, so Altana “exceeds policy” is visible

### F. Diversity proof

19. Header still has the other three desks. Each has its own last live tx.

## 5.4 Four category definitions

| Desk | slug | Job | Live action we must show | Card metrics (Tier B only) |
| --- | --- | --- | --- | --- |
| Health Factor | `health-factor` | Keep a Venus account above a policy HF | `repayBorrow` (prefer) or `mint` collateral | hf_before, hf_after, interventions, last_active, success_rate, protocols |
| Rebalancing | `rebalancing` | Keep a Pancake V3 position earning | collect + decrease + mint **or** documented swap fallback | in_range_pct, rebalances, fees_7d, last_il_est, last_cost, last_active |
| Grid Trading | `grid` | Buy/sell one pair inside bounds | one threshold swap that books a fill | pair, lo, hi, fills, pnl, max_dd, window, last_active |
| Yield | `yield` | Move idle USDT to better **net** venue | one supply/stake on Venus or Lista | venue, gross_apr, gas_est, net_apr, risk_tag, last_active |

Equal chrome: same card skeleton, same profile sections, same hire drawer, different metric components.

## 5.5 Marketplace architecture

- Next.js App Router, TypeScript, server components for lists, client for hire/revoke
- Read path can be server-side (8004scan + DB)
- Write path: API routes that hold the **agent session signer** (never in the browser)
- User admin signer: browser (wagmi / Altana passkey) except on demo path
- Persistence: SQLite is enough for hackathon; Postgres if we deploy to a box that already has it
- No custom Solidity for MVP

## 5.6 Agent data model

```ts
type ListingStatus = "verified" | "new" | "inactive" | "unsupported";
type Desk = "health-factor" | "rebalancing" | "grid" | "yield";
type DataTier = "network" | "reference" | "job";

interface AgentListing {
  id: string;
  desk: Desk;
  status: ListingStatus;
  dataTier: DataTier;
  // identity
  chainId: 56 | 97;
  erc8004TokenId?: string;
  name: string;
  oneLiner: string;          // human
  description: string;
  imageUrl?: string;
  ownerAddress: string;
  agentWallet: `0x${string}`; // Altana wallet
  // 8004scan hydrate
  totalScore?: number;
  starCount?: number;
  totalFeedbacks?: number;
  supportedProtocols?: string[];
  createdAt?: string;
  // our classification
  protocols: Array<"venus" | "pancake" | "lista">;
  hireFeeU: string;          // decimal string
  // metrics (null unless tier allows)
  metrics: Record<string, number | string | null>;
  metricsNote?: "insufficient_history" | "backtest" | "live";
}
```

## 5.7 Profile model (sections, in order)

1. One-liner + desk chip + status
2. What it will do for *you* (sample policy)
3. Category metrics or insufficient-history callout
4. Price (hire fee + “you also pay gas inside the cap”)
5. **Dry Run** CTA
6. Recent activity (ours or “none yet”)
7. Reputation (8004scan feedback list if any)
8. Advanced: ERC-8004 id, owner, agent wallet, registry, allowlist presets, 8004scan link

## 5.8 Dry-run architecture

```ts
interface Intent {
  agentId: string;
  desk: Desk;
  reasonCode: string;
  reads: Record<string, string>;      // hf, tick, apr...
  calls: Array<{
    to: `0x${string}`;
    data: `0x${string}`;
    value: bigint;
    abiName: string;                  // "repayBorrow"
    argsDecoded: Record<string, string>;
  }>;
  projections: Record<string, string>; // hf_after, gas_bnb
  policyWarnings: string[];           // not chain-enforced
}

interface DryRunResult {
  intent: Intent;
  simulation: "success" | "revert";
  revertReason?: string;
  gasUsed?: bigint;
  english: string;                    // built from template, not LLM
}
```

Flow:

1. Worker or API reads on-chain state (Venus `getAccountLiquidity`, etc.)
2. Strategy proposes `Intent`
3. Simulate each call (viem `simulateContract` / `call`)
4. Template → English
5. Persist `dry_runs` row so hire can execute **the same intent** (no second guess)

If simulation reverts, Hire is disabled. That is a feature.

## 5.9 Permission architecture

**Session (chain) — padlock icon**

Per desk, a **preset** `calls[]` the user can see as checkboxes. Unchecking rebuilds `permissions.calls`. Defaults:

**Health factor**

- Venus vToken(s) used in demo: `repayBorrow`, `mint`, `redeem`
- USDT: **`approve` only** — never `transfer`
- Comptroller: read-only off-chain; do not allowlist unused proxies

**Rebalancing**

- Pancake `NonfungiblePositionManager`: `increaseLiquidity`, `decreaseLiquidity`, `collect`, `mint`, `multicall`
- Token0/token1: `approve` only
- Optional router if we take the swap fallback: `exactInputSingle` only

**Grid**

- Pancake Smart Router / V3 router: the **one** swap function we use
- Both tokens: `approve` only

**Yield**

- Venus vUSDT: `mint`, `redeem`
- Lista stake contract: the two functions we actually call
- USDT: `approve` only

**Spend:** one entry, USDT (18 decimals on BSC), `period: "day"`, `limit` from the form. Optional second entry for native BNB gas if the account abstraction requires it — verify against Altana execute, do not guess in UI.

**Expiry:** 1h / 24h / 7d presets.

**Agent policy (clipboard icon, not padlock)**

- `hfMin`
- `preferRepay: true`
- `slippageBpsAbort`
- `maxActionsPerDay`

Rendered separately. Copy: **“The agent will try to follow this. The chain will not enforce it.”**

## 5.10 Altana integration

| Step | SDK | Who signs |
| --- | --- | --- |
| Create 4 agent wallets | `createWallet` | our backend admin (env key) |
| Create demo user wallet | `createWallet` or passkey | our demo admin |
| User’s own wallet | `createPasskeyWallet` or connect existing Altana | user |
| Hire | `grantSession({ permissions, expiry, register: true })` | user admin / demo admin |
| Persist | full `Session` object verbatim (bigint-safe JSON) | DB, server-only |
| Work | `execute(session, calls)` | session signer, server |
| Authority UI | `isValidKey`, decode stored permissions | public RPC |
| Fire | `revokeSession` | user admin / demo admin |

Submit **all** agent wallet addresses + demo wallet + any mainnet wallets.

Demonstrate a **policy refusal**: after revoke, or with a deliberately tiny cap, show the revert in the UI.

## 5.11 8004scan integration

- `GET /agents?chainId=56` and `97` for hydration of curated tokenIds
- `GET /agents/{chainId}/{tokenId}` on profile
- `GET /feedbacks?chainId&tokenId` on profile
- `GET /agents/search?q=&chainId=` for the optional search box
- Apply for Pro on day 1
- Cache 60s. Do not hammer anonymous limits.
- Map `supported_protocols` as-is. Do **not** infer “Venus expert” from a description with an LLM unless we also show the raw description.

Curation table in our DB is the allowlist. 8004scan is the mirror, not the store.

## 5.12 Agent Studio integration

**STRATEGIC, not required.**

MVP: our runtime is a Node worker that looks like a Studio agent (ERC-8004 identity + endpoint URL in tokenURI).

Should: register identities via official ERC-8004 registry on testnet; put HIREDESK profile URL in `tokenURI`.

Nice: scaffold with Agent Studio CLI so the README says “Studio-native.”

Do not spend more than half a day on CLI if wallets + 8004 + execute already work.

## 5.13 BSC execution

- Default demo + judging loop: **BSC testnet 97** (Venus/Pancake/Lista test deployments — pin addresses in `protocols.testnet.ts`)
- Altana: `BNB_TESTNET` for the loop; attempt **one mainnet grant+execute+revoke** with dust USDT for the explorer screenshot
- All addresses in a single config file. No scattered hex.

If a testnet protocol is dead, shrink that desk’s live action (e.g. yield = Venus only) rather than invent a fake venue.

## 5.14 Payment architecture

```
hireFee = listing.hireFeeU   // e.g. 0.50 USDT
protocolBps = 2000           // 20% to HIREDESK
builderBps = 8000            // 80% to agent wallet
```

MVP settlement: two transfers, or one transfer to treasury and an off-chain “owed” row. Prefer **one USDT transfer to agent wallet** and a DB note that protocol share is waived for the hackathon if splits cost time. **Honesty > micro-split.**

Do not claim x402 unless `POST /api/hire` actually returns `402` and settles.

## 5.15 Four reference agents

Shared:

```
AgentRuntime
  loadSession(jobId)
  dryRun(ctx) -> Intent
  execute(intent)
  record(event)
```

| Agent | Strategy module | Policy defaults |
| --- | --- | --- |
| HF-Sentinel | `strategies/healthFactor.ts` | hfMin 1.40, preferRepay |
| Range-Keeper | `strategies/rebalance.ts` | abort if estimated gas > X% of fees |
| Grid-Runner | `strategies/grid.ts` | bounds, size per fill ≤ 10% of cap |
| Yield-Mover | `strategies/yield.ts` | only Venus/Lista, min net edge 0.5% after gas |

Each has: ERC-8004 (or placeholder listing if registry tx is late), Altana wallet, strategy, policy, activity.

## 5.16 Data-quality strategy

1. Never fabricate
2. Two tiers, labeled
3. Compare table uses the same fields as cards
4. Timestamps + sources on metric tooltips (“Venus view, block 123”)
5. New agents: **Insufficient historical data**
6. Backtest files, if any, live under `/docs/backtests` and never in the Live column
7. 8004scan `total_score` shown as “8004scan score,” not “HIREDESK score”

## 5.17 Ranking methodology

Default sort per desk:

1. Featured reference agent pinned
2. `verified` then `new` then `inactive`
3. Then `last_active` desc for tier B
4. Then 8004scan `total_score` for tier A

No learned ranker. Document this in `/how-ranking-works`.

## 5.18 AI recommendation methodology

**Not in MVP.**

If built: parse four fields → filter listings → explain with bullets of **facts already on the card**. If a fact is null, the bullet cannot exist.

## 5.19 Performance tracking

Table `job_events`:

`id, job_id, agent_id, type, reason_code, protocol, amount, token, tx_hash, status, reads_json, created_at`

Aggregate to `agent_metrics_daily` for cards. Rebuild from events; do not hand-edit.

## 5.20 TermiX benchmark strategy (designed now)

All three run **through the HIREDESK hire path** vs a human using the same UIs/explorers.

| # | Task | Category | Without | With | What we attach |
| --- | --- | --- | --- | --- | --- |
| 1 | Raise a Venus HF from ~1.20 to ≥ 1.50 with smallest repay | **Security** | Human reads Venus UI, calc, repay | Hire HF-Sentinel, dry-run, execute | Screen recording + txs + HF reads |
| 2 | Restore an out-of-range PCake LP **or** execute the documented swap fallback on a 2% move | **Trading** | Human does NPM steps | Hire Range-Keeper | txs + time + gas |
| 3 | Move 50 USDT idle to the higher **net** of Venus supply vs Lista | **Yield** (supporting) | Human compares two sites | Hire Yield-Mover | APR snapshot + tx |

Log wall-clock, gas+hire fee, and a 1–5 output-quality note.  
File: `docs/AGENT_ADVANTAGE_REPORT.md` + PDF export.  
Start the “without” timings as soon as each strategy works.

## 5.21 PancakeSwap strategy

1. Try Liquidity skill / NPM rebalance (preferred)
2. Else safe swap under session + collect fees if we have an NFT
3. README states which of the official bullets we hit
4. Never custody, never MaxUint256 on a router unless we immediately shrink (prefer exact)

## 5.22 MVP scope (ship this)

Public 4-desk site, curated listings, profiles, compare, dry-run, session hire, four one-shot live actions, authority panel, revoke, demo path, activity+why, TermiX draft, public URL.

## 5.23 Post-MVP / post-submit

x402 hire, ERC-8183, mainnet dust loop, Studio CLI, Online Edition submit, more curated agents, labeled backtests, passkey onboarding for real users.

## 5.24 Technical architecture

```
apps/web          Next.js UI
apps/worker       AgentRuntime loop (poll ACTIVE jobs)
packages/protocol desk presets, ABIs, addresses
packages/altana   thin wrappers around SDK
packages/sim      dry-run templates + viem sim
data/             sqlite
docs/             report, ranking, demo script
```

Env: `ALTANA_AGENT_*_KEY`, `DEMO_ADMIN_KEY`, `8004SCAN_KEY`, RPC 56/97.

Session objects and agent keys **never** shipped to the client.

## 5.25 Database / schema

```
listings(id, desk, status, data_tier, chain_id, token_id, name, one_liner,
         owner, agent_wallet, hire_fee, protocols_json, metrics_json, ...)
curation(token_id, chain_id, desk, status)
wallets(role, address, encrypted_keystore_ref)
jobs(id, listing_id, user_wallet, status, session_json, policy_json,
     spend_limit, expiry, created_at)
dry_runs(id, job_id, intent_json, sim_json, english)
job_events(...)
advantage_runs(task_no, mode, seconds, cost, quality, artifacts)
```

## 5.26 API requirements

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/desks/:desk/listings` | curated + hydrate |
| GET | `/api/agents/:id` | profile |
| POST | `/api/agents/:id/dry-run` | build+sim intent |
| GET | `/api/agents/compare?ids=` | 2–3 |
| POST | `/api/jobs` | create job + return session grant payload |
| POST | `/api/jobs/:id/session` | persist granted session |
| POST | `/api/jobs/:id/execute` | worker kick (demo also calls this) |
| POST | `/api/jobs/:id/revoke` | revokeSession |
| GET | `/api/jobs/:id` | authority + events |
| GET | `/api/search?q=` | optional 8004scan |

No generic “chat” route.

## 5.27 Smart-contract requirements

**Write none for MVP.**

Use: Altana account + Keystore, USDT, Venus, Pancake NPM/router, Lista, ERC-8004 registry (existing).

If we are forced to approve `transfer` for some adapter, document the hole; do not hide it in CANNOT.

## 5.28 Security considerations

- Session `calls` always set
- USDT `transfer` not allowlisted
- Keys in env/secret store, not git
- Persist sessions bigint-safe
- Demo wallet is shared — cap demo spend; rotate if drained
- Label demo vs user funds
- No unlimited approvals
- Revoke is monotonic — UI must create a **new** session to re-hire
- Do not log session signers
- RPC rate limits; fallback RPC
- Honest copy on every policy that is not chain-enforced

## 5.29 Testing requirements

- Unit: allowlist presets never include `transfer`
- Unit: English templates include amounts from `Intent`, not placeholders
- Integration (testnet): grant → execute → Keystore valid → revoke → execute reverts
- Integration: dry-run revert disables hire
- Manual: logged-out browse of all 4 desks
- Manual: 90s demo script timing
- Fixture: advantage_runs has 3 with + 3 without before submit

## 5.30 Deployment

- Public HTTPS URL (Vercel or similar)
- Testnet RPC via key, not a public overloaded endpoint if we can avoid it
- Worker as a long-lived process **or** demo-only execute-on-request if we cannot host a daemon (execute-on-request is acceptable for judging if the button is obvious)
- Health check page with contract addresses + explorer links
- Uptime during 9–23 Sep. Phase 2 is redacted; assume they click production.

## 5.31 GitHub / open source

- Public repo, MIT
- Real commit history (daily)
- README: what it is, demo path, addresses, how to run, what is / is not enforced
- `docs/AGENT_ADVANTAGE_REPORT.md`
- `docs/RANKING.md`
- `docs/PERMISSIONS.md` (padlock vs clipboard)
- No `.env`

## 5.32 Demo flow (judging)

See §5.3 A–F. Operator checklist:

1. Demo wallet funded 24h before submit
2. Venus HF parked at ~1.20
3. At least one tx already in each desk’s activity so empty states are not the first impression
4. Revoke last so Keystore explorer shows a revoked key

## 5.33 90-second narrative

> BNB has the agents. Nobody can hire them without handing over keys.  
> This is HIREDESK. Four desks — protect a loan, manage an LP, run a grid, move yield.  
> Health factor 1.19. Dry run: repay 42 USDT, projected 1.55, these contracts only.  
> Cap 100 USDT, 24 hours, Venus + approve. Hire. Session is on Keystore.  
> It executes. Here’s the tx. Here’s why.  
> Revoke. The key is dead.  
> Same hire path on Rebalancing, Grid, Yield.  
> That’s trust-limited labor.

No architecture slide in the video.

## 5.34 Submission checklist

- [ ] Public URL works logged out
- [ ] All 4 desks have a reference agent + at least one other card
- [ ] Dry run, hire, execute, revoke on demo path
- [ ] Keystore-visible session + revoke tx
- [ ] Wallet addresses listed in the form
- [ ] Agents reachable as “live on BSC” (testnet ok if documented; mainnet dust if possible)
- [ ] `docs/AGENT_ADVANTAGE_REPORT.md` with 3×2 runs and attachments
- [ ] TermiX / Altana / PancakeSwap boxes ticked only if that loop is real
- [ ] 90s video
- [ ] README + PERMISSIONS.md
- [ ] 8004scan Pro form submitted
- [ ] One entry only

## 5.35 Build order (do not reorder)

| Days | Outcome | Kill criterion |
| --- | --- | --- |
| 1 | Repo, desk routes, listing types, 8004scan key, Altana hello-wallet on testnet | Cannot create wallet → stop and fix |
| 2 | Curated cards + profile + compare shells | |
| 3 | Intent type + Venus read + HF dry-run English | |
| 4 | `grantSession` + Authority panel + `revokeSession` | If this fails, nothing else matters |
| 5 | HF execute via session + event + Why + explorer | |
| 6 | Judge Demo Path wired to HF loop | |
| 7 | Yield execute (Venus or Lista) | |
| 8 | Grid execute (one swap) | |
| 9 | Rebalance execute (LP or honest swap fallback) | |
| 10 | Equal-depth UI pass (same chrome, metrics) | |
| 11 | Policy refusal demo + USDT transfer-not-allowlisted proof | |
| 12–13 | TermiX with/without timings, write report | |
| 14 | Data labels, insufficient-history, ranking page | |
| 15 | Mainnet dust session if keys/funds ready | |
| 16 | SHOULD items only if MUST is filmed | |
| 17–18 | Polish, mobile, empty states, video | |
| 19–20 | Submit form, wallets, video, README freeze | |
| 21 | Buffer, keep demo wallet alive | |

---

# Part 6 — Decisions locked

1. Primary contest = **Build the Era**, not Online Edition.
2. Principle = **trust-limited labor**, with padlock vs clipboard.
3. Dry Run is **core**, simulation-backed.
4. Altana is **real or we do not claim it**.
5. No Pause, no Smart Money Score, no chatbot, no custom contracts, no 200k dump.
6. Four desks, one runtime, one live action each, HF is the video not the product.
7. Judge Demo Path is mandatory.
8. TermiX report starts when the first strategy works.
9. x402 and ERC-8183 are bonuses.
10. This file is the spec. If a later idea is not in MUST/SHOULD, it does not get built.

When you say go, the next prompt should implement **Day 1–4 only**: marketplace shell, data model, Altana session grant/revoke, Authority panel — not four strategies at once.
