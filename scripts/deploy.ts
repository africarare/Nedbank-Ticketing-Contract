import { ethers } from "hardhat";

async function main() {
  const ticketContract = await ethers.getContractFactory("Ticket");
  const ticketContractDeploy = await ticketContract.deploy();
  await ticketContractDeploy.deployed();

  console.log("ticket contract deployed to:", ticketContractDeploy.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
