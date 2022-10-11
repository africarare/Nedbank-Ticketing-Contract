import { expect } from "chai";
import { BigNumber, Signer } from "ethers";
import { watchFile } from "fs";
import { ethers } from "hardhat";
import { before } from "mocha";

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

  describe("setIsAllowListActive", () => {
    it("Should be reverted if caller is not the owner", async () => {
      await expect(ticketContract)
        .connect(addr1)
        .setIsAllowListActive(true)
        .to.be.revertedWith("Caller is not the owner");
    });

    it("Should set isAllowListActive by owner", async () => {
      const expectedValue = true;

      await ticketContract.connect(owner).setIsAllowListActive(expectedValue);
      expect(await ticketContract.isAllowListActive()).to.equal(expectedValue);
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
