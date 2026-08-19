import { encodeFunctionData, parseUnits } from "viem";
import { ADDR } from "@/lib/presets";
import type { Desk } from "@/lib/types";

const erc20 = [
  {
    name: "approve",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ type: "boolean" }],
  },
] as const;

const vToken = [
  {
    name: "repayBorrow",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "repayAmount", type: "uint256" }],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "mint",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "mintAmount", type: "uint256" }],
    outputs: [{ type: "uint256" }],
  },
] as const;

export function encodeDeskAction(desk: Desk) {
  const amount42 = parseUnits("42", 18);
  const amount50 = parseUnits("50", 18);

  if (desk === "health-factor") {
    return [
      {
        to: ADDR.usdt,
        data: encodeFunctionData({
          abi: erc20,
          functionName: "approve",
          args: [ADDR.venusVusdt, amount42],
        }),
      },
      {
        to: ADDR.venusVusdt,
        data: encodeFunctionData({
          abi: vToken,
          functionName: "repayBorrow",
          args: [amount42],
        }),
      },
    ];
  }

  if (desk === "yield") {
    return [
      {
        to: ADDR.usdt,
        data: encodeFunctionData({
          abi: erc20,
          functionName: "approve",
          args: [ADDR.venusVusdt, amount50],
        }),
      },
      {
        to: ADDR.venusVusdt,
        data: encodeFunctionData({
          abi: vToken,
          functionName: "mint",
          args: [amount50],
        }),
      },
    ];
  }

  // Grid / rebalance need extra calldata we will not fake as success on-chain.
  return null;
}
