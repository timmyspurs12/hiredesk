import type { CallPreset, Desk } from "./types";

/** Testnet placeholders — replace with pinned Venus / Pancake / Lista addresses. */
export const ADDR = {
  usdt: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd" as const,
  venusVusdt: "0x337610d27c682E347C9cD60BD4b3b107C9d34d01" as const,
  pancakeNpm: "0x427bF5b37357632377eCbEC9de3626C71A5396c1" as const,
  pancakeRouter: "0x1b81D678ffb9C0263b24A97847620C99d213eB14" as const,
  listaStake: "0x0000000000000000000000000000000000001157" as const,
};

export const PRESETS: Record<Desk, CallPreset[]> = {
  "health-factor": [
    { id: "repay", label: "Venus repayBorrow", to: ADDR.venusVusdt, signature: "repayBorrow(uint256)", required: true },
    { id: "mint", label: "Venus mint (add collateral)", to: ADDR.venusVusdt, signature: "mint(uint256)", required: false },
    { id: "approve", label: "USDT approve (not transfer)", to: ADDR.usdt, signature: "approve(address,uint256)", required: true },
  ],
  rebalancing: [
    { id: "collect", label: "Pancake collect", to: ADDR.pancakeNpm, signature: "collect((uint256,address,uint128,uint128))", required: true },
    { id: "decrease", label: "Pancake decreaseLiquidity", to: ADDR.pancakeNpm, signature: "decreaseLiquidity((uint256,uint128,uint256,uint256,uint256))", required: true },
    { id: "mint", label: "Pancake mint", to: ADDR.pancakeNpm, signature: "mint((address,address,uint24,int24,int24,uint256,uint256,uint256,uint256,address,uint256))", required: false },
    { id: "approve", label: "USDT approve (not transfer)", to: ADDR.usdt, signature: "approve(address,uint256)", required: true },
  ],
  grid: [
    { id: "swap", label: "Pancake exactInputSingle", to: ADDR.pancakeRouter, signature: "exactInputSingle((address,address,uint24,address,uint256,uint256,uint256,uint160))", required: true },
    { id: "approve", label: "USDT approve (not transfer)", to: ADDR.usdt, signature: "approve(address,uint256)", required: true },
  ],
  yield: [
    { id: "vmint", label: "Venus vUSDT mint", to: ADDR.venusVusdt, signature: "mint(uint256)", required: true },
    { id: "lista", label: "Lista stake", to: ADDR.listaStake, signature: "deposit(uint256)", required: false },
    { id: "approve", label: "USDT approve (not transfer)", to: ADDR.usdt, signature: "approve(address,uint256)", required: true },
  ],
};

export function defaultAllowlist(desk: Desk) {
  return PRESETS[desk].filter((p) => p.required).map((p) => p.id);
}
