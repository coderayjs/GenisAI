// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract GenisPass is ERC721, Ownable {
    using Strings for uint256;

    uint256 public constant TOTAL_SUPPLY = 10000;  // Changed to 10,000 NFTs
    uint256 public currentTokenId;
    string public baseURI;

    constructor() ERC721("GENIS Collection", "GENSIS") {
        _transferOwnership(msg.sender);
    }

    function mint() external {
        require(currentTokenId < TOTAL_SUPPLY, "Max supply reached");
        uint256 tokenId = ++currentTokenId;
        _safeMint(msg.sender, tokenId);
    }

    function setBaseURI(string memory _newBaseURI) external onlyOwner {
        baseURI = _newBaseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }
}
