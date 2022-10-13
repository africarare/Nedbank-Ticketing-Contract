import * as fs from "fs";
import { ethers } from "hardhat";

async function main() {
  const ticketContract = await ethers.getContractFactory("Ticket");
  const ticketContractDeploy = await ticketContract.deploy();
  await ticketContractDeploy.deployed();

  console.log("ticket contract deployed to:", ticketContractDeploy.address);

  console.log("saving deployment details to deployments/deploy.ts");
  let deployment = ` export const TICKETING_CONTRACT_ADDRESS = "${ticketContractDeploy.address}"`;

  let data = JSON.stringify(deployment);
  fs.writeFileSync("deployments/deploy.ts", JSON.parse(data));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
