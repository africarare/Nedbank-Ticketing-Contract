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

    constructor() ERC721("NEDBankTicket", "NED") {}

    //Tracks num minted
    uint256 public numMinted = 0;

    //Sets the URI base and head for where metadata is located on IPFS
    string public _baseURIextended =
        "https://gateway.pinata.cloud/ipfs/QmfS1tJoY1ZpHpa7RJvziV7MoRc6NXrHWARrWt7pdXAXwQ/NEDBankTicket_";
    string public _headURIextended = ".json";

    // Mapping for token URIs
    mapping(uint256 => string) private _tokenURIs;

    /**
     * @dev returns base URI
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIextended;
    }

    /**
     * @dev sets base URI
     */
    function _setBaseURI(string memory baseURI) external onlyOwner {
        _baseURIextended = baseURI;
    }

    /**
     * @dev returns head URI
     */
    function _headURI() internal view virtual returns (string memory) {
        return _headURIextended;
    }

    /**
     * @dev sets head URI
     */
    function _setHeadURI(string memory headURI) external onlyOwner {
        _headURIextended = headURI;
    }

    /**
     * @dev sets token URI
     */
    function _setTokenURI(uint256 tokenId) internal virtual {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI set of nonexistent token"
        );
        _tokenURIs[tokenId] = Strings.toString(tokenId);
    }

    /**
     * @dev gets token URI
     */
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return
            string(
                abi.encodePacked(
                    _baseURI(),
                    Strings.toString(tokenId),
                    _headURI()
                )
            );
    }

    function mintToken(address[] calldata receiverAddress) public onlyOwner {
        for (uint256 i = 0; i < receiverAddress.length; i++) {
            _tokenIds.increment();
            _safeMint(receiverAddress[i], _tokenIds.current());
        }
        _setTokenURI(_tokenIds.current(), "");
    }
}
