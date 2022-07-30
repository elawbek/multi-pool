import { ethers } from "hardhat";
import { constants } from "ethers";

import { Pool__factory } from "../../typechain-types";

const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

export const ENTRY_ASSET = ""; // WETH if entryAsset will be native token
export const FEE_ADDRESS = "";
export const INVEST_FEE = 0; // can't be gt 50
export const SUCCESS_FEE = 0; // can't be gt 50
export const SWAP_ROUTER = ""; // Router address from 0_deployExchange.ts
export const MIN_INVEST = 1; // can't be eq 0
export const POOL_NAME = "";

/**
 * fee 100 = 0.01%
 * fee 500 = 0.05%
 * fee 3000 = 0.3%
 * fee 10000 = 1%
 *
 * entryAsset - fees[0] - tokens[0]
 * entryAsset - fees[1] - tokens[1]
 * entryAsset - fees[2] - tokens[2] etc.
 */
export const FEES = [100, 100, 100];

// If entry asset is WETH then WRAP_OF_NATIVE_TOKEN must be WETH
export const WRAP_OF_NATIVE_TOKEN = constants.AddressZero; // or WETH
export const TOKENS = ["", "", ""];
export const DISTRIBUTIONS = [33, 33, 34]; // sum must be eq 100

async function main() {
  const [signer] = await ethers.getSigners();

  const ethereumPool = await new Pool__factory(signer).deploy(
    ENTRY_ASSET,
    FEE_ADDRESS,
    INVEST_FEE,
    SUCCESS_FEE,
    SWAP_ROUTER,
    WRAP_OF_NATIVE_TOKEN,
    MIN_INVEST,
    POOL_NAME,
    FEES,
    TOKENS,
    DISTRIBUTIONS
  );
  await ethereumPool.deployed();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
