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
      const baseurl = "africarare.io";
      ticketContract.connect(owner).setBaseURI(baseurl);

      await ticketContract.connect(owner).setIsAllowListActive(true);
      await ticketContract.connect(owner).mintToken(toAddress, baseurl);

      expect(await ticketContract.tokenURI(0)).to.equal(baseurl + "0");
      expect(await ticketContract.ownerOf(0)).to.equal(addr1.address);
    });
  });
});
