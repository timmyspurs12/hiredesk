import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

const key = generatePrivateKey();
const account = privateKeyToAccount(key);

console.log("");
console.log("Throwaway BSC TESTNET admin key (not for real money)");
console.log("Private key:", key);
console.log("EOA address:", account.address);
console.log("");
console.log("1. Create hiredesk/.env.local with this line:");
console.log(`DEMO_ADMIN_PRIVATE_KEY=${key}`);
console.log("");
console.log("2. After Altana createWallet, fund THAT smart-account address");
console.log("   (shown in the app), not only this EOA, from:");
console.log("   https://testnet.bnbchain.org/faucet-smart");
console.log("");
console.log("Never commit .env.local. Never use this key on mainnet.");
