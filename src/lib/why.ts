import type { Desk, DryRunIntent } from "./types";

export function explainWhy(intent: DryRunIntent): string {
  if (intent.reasonCode === "HF_BELOW_POLICY") {
    return `Health factor ${intent.reads.hf_before} is below your policy floor ${intent.reads.policy_min}. Your policy prefers repay over adding collateral. Repay 42 USDT stays inside the USDT spend cap. The session cannot read Venus HF — this check is agent policy.`;
  }
  if (intent.reasonCode === "LP_OUT_OF_RANGE") {
    return `The Pancake V3 position is out of range (${intent.reads.pair}). Fees are not accruing. Collect then decrease so a new range can be minted. Only NPM methods on the allowlist are used.`;
  }
  if (intent.reasonCode === "PRICE_BELOW_GRID_LO") {
    return `Spot ${intent.reads.spot} is below your grid floor ${intent.reads.lo}. One buy of 10 USDT of WBNB on Pancake. Size is under 10% of a 100 USDT cap.`;
  }
  return `Venus supply APR ${intent.reads.venus_apr}% beats Lista ${intent.reads.lista_apr}% on this demo read. Mint 50 USDT on Venus. Need a 0.5% net edge after gas — agent policy, not a session rule.`;
}

export function executeTitle(desk: Desk): string {
  if (desk === "health-factor") return "Repay 42.00 USDT → Venus";
  if (desk === "rebalancing") return "Collect + decrease Pancake LP";
  if (desk === "grid") return "Buy WBNB with 10 USDT";
  return "Mint 50 USDT on Venus";
}
