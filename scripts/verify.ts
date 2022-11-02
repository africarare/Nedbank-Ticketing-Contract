import { run } from "hardhat";
import { TICKETING_CONTRACT_ADDRESS } from '../deployments/deploy';



async function main() {
  console.log('verifying contracts...');

  console.log("verifying token contract on etherscan..");
  await run('verify:verify', {
    address: `${TICKETING_CONTRACT_ADDRESS}`,
    contract: "contracts/Ticket.sol:Ticket",
    constructorArguments: [],
  })
  console.log('verified');

  console.log('done verifying contracts');

}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
