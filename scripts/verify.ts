import { run } from "hardhat";
import { ethers } from "hardhat";

async function main() {
  console.log("verifying contracts...");

  console.log("verifying ticket factory contract on etherscan..");
  await run("verify:verify", {
    address: `0xD6dd8Bfb3F46916Eb7205FBAa7E46d666eE78E11`,
    contract: await ethers.getContractFactory("Ticket"),
    constructorArguments: [],
  });
  console.log("verified");

  console.log("contract verification is done");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
