// SPDX-License-Identifier: MIT
// Author: Africarare

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Ticket is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  bool public isAllowListActive = false;
  address contractAddress;

  constructor() ERC721('NEDBankTicket', 'NED') {}

  function mintToken(address receiverAddress, string memory tokenURI) public onlyOwner {
    uint256 newItemId = _tokenIds.current();
    _tokenIds.increment();

    _safeMint(receiverAddress, newItemId);
    _setTokenURI(newItemId, tokenURI);
  }
}