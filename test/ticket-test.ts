import { expect } from "chai";
import { ethers } from "hardhat";

describe("Ticket", () => {
  let ticket, addr1: any, ticketContract: any, owner: any, toAddress: any;
  beforeEach(async () => {
    ticket = await ethers.getContractFactory("Ticket");
    [owner, addr1, toAddress] = await ethers.getSigners();
    ticketContract = await ticket.deploy();
  });

  describe("Deployment", () => {
    it("Should set the right owner", async () => {
      expect(await ticketContract.owner()).to.equals(owner.address);
    });
  });

  describe("Mint token", () => {
    it("Should mint token", async function () {
      const headurl = "https://gateway.pinata.cloud/ipfs/QmfS1tJoY1ZpHpa7RJvziV7MoRc6NXrHWARrWt7pdXAXwQ/NEDBankTicket_";
      const tailurl = ".json"
      await ticketContract.connect(owner).mintToken([toAddress.address, addr1.address]);

      expect(await ticketContract.tokenURI(1)).to.equal(headurl + "1" + tailurl);
      expect(await ticketContract.ownerOf(1)).to.equal(toAddress.address);
      expect(await ticketContract.tokenURI(2)).to.equal(headurl + "2" + tailurl);
      expect(await ticketContract.ownerOf(2)).to.equal(addr1.address);
    });
  });
});
