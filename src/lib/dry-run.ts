import { ADDR } from "./presets";
import type { Desk, DryRunIntent } from "./types";

/** Demo-position reads. Labeled as the judge demo account, not a live oracle. */
export const DEMO_POSITION = {
  label: "HIREDESK demo wallet (BSC testnet)",
  usdt: "186.40",
  hf: "1.19",
  debtUsdt: "120.00",
  pair: "BNB/USDT",
  inRange: false,
  gridLo: "580",
  gridHi: "640",
  spot: "572",
  venusApr: "4.10",
  listaApr: "3.40",
};

export function buildDryRun(agentId: string, desk: Desk): DryRunIntent {
  if (desk === "health-factor") {
    return {
      agentId,
      desk,
      reasonCode: "HF_BELOW_POLICY",
      reads: {
        source: "demo position",
        hf_before: DEMO_POSITION.hf,
        policy_min: "1.40",
        debt_usdt: DEMO_POSITION.debtUsdt,
      },
      calls: [
        {
          to: ADDR.usdt,
          abiName: "approve",
          argsDecoded: { spender: ADDR.venusVusdt, amount: "42 USDT" },
          dataPreview: "0x095ea7b3…",
        },
        {
          to: ADDR.venusVusdt,
          abiName: "repayBorrow",
          argsDecoded: { amount: "42 USDT" },
          dataPreview: "0x0e752702…",
        },
      ],
      projections: {
        hf_after: "1.55",
        gas_bnb: "0.0003",
      },
      policyWarnings: [
        "HF floor 1.40 is agent policy. The session cannot read Venus HF.",
      ],
      english:
        "Repay 42 USDT of your Venus debt. Current health factor 1.19. Estimated health factor after action 1.55. Estimated gas 0.0003 BNB. Contracts: USDT approve, Venus vUSDT repayBorrow. Simulation only. No funds have moved.",
      simulation: "success",
    };
  }

  if (desk === "rebalancing") {
    return {
      agentId,
      desk,
      reasonCode: "LP_OUT_OF_RANGE",
      reads: {
        source: "demo position",
        in_range: "false",
        pair: "USDT/WBNB 0.25%",
      },
      calls: [
        {
          to: ADDR.pancakeNpm,
          abiName: "collect",
          argsDecoded: { note: "collect fees" },
          dataPreview: "0xfc6f7865…",
        },
        {
          to: ADDR.pancakeNpm,
          abiName: "decreaseLiquidity",
          argsDecoded: { note: "exit current ticks" },
          dataPreview: "0x0c49ccbe…",
        },
      ],
      projections: { gas_bnb: "0.0008", result: "fees collected, range reset queued" },
      policyWarnings: ["Full mint of a new range is the next step, still inside the NPM allowlist."],
      english:
        "Your Pancake V3 position is out of range. Collect fees, then decrease liquidity so a new range can be minted around spot. Simulation only. No funds have moved.",
      simulation: "success",
    };
  }

  if (desk === "grid") {
    return {
      agentId,
      desk,
      reasonCode: "PRICE_BELOW_GRID_LO",
      reads: {
        source: "demo position",
        spot: DEMO_POSITION.spot,
        lo: DEMO_POSITION.gridLo,
      },
      calls: [
        {
          to: ADDR.pancakeRouter,
          abiName: "exactInputSingle",
          argsDecoded: { sell: "USDT", buy: "WBNB", size: "10 USDT" },
          dataPreview: "0x414bf389…",
        },
      ],
      projections: { fill: "buy 10 USDT of WBNB", gas_bnb: "0.0004" },
      policyWarnings: ["Slippage abort is agent policy, not a session rule."],
      english:
        "Spot 572 is below your grid floor 580. Buy WBNB with 10 USDT on Pancake (one swap). Simulation only. No funds have moved.",
      simulation: "success",
    };
  }

  return {
    agentId,
    desk,
    reasonCode: "NET_APR_EDGE",
    reads: {
      source: "demo position",
      idle_usdt: "50",
      venus_apr: DEMO_POSITION.venusApr,
      lista_apr: DEMO_POSITION.listaApr,
    },
    calls: [
      {
        to: ADDR.usdt,
        abiName: "approve",
        argsDecoded: { spender: ADDR.venusVusdt, amount: "50 USDT" },
        dataPreview: "0x095ea7b3…",
      },
      {
        to: ADDR.venusVusdt,
        abiName: "mint",
        argsDecoded: { amount: "50 USDT" },
        dataPreview: "0xa0712d68…",
      },
    ],
    projections: { venue: "Venus vUSDT", net_note: "gross 4.10% vs Lista 3.40% before gas" },
    policyWarnings: ["APR figures are demo reads until a live oracle is wired."],
    english:
      "Idle 50 USDT. Venus supply APR 4.10% beats Lista 3.40% on this demo read. Approve and mint 50 USDT on Venus. Simulation only. No funds have moved.",
    simulation: "success",
  };
}
