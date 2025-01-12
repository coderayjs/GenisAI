// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract GenisPass is ERC721, Ownable {
    using Strings for uint256;

    uint256 public constant TOTAL_SUPPLY = 100000;
    uint256 public currentTokenId;
    string public baseURI;
    bool public metadataFrozen;

    constructor() ERC721("Gensis AI Pass", "GENIS") {
        _transferOwnership(msg.sender);
    }

    function mint() external {
        require(currentTokenId < TOTAL_SUPPLY, "Max supply reached");
        uint256 tokenId = ++currentTokenId;
        _safeMint(msg.sender, tokenId);
    }

    function setBaseURI(string memory _newBaseURI) external onlyOwner {
        require(!metadataFrozen, "Metadata is frozen");
        baseURI = _newBaseURI;
    }

    function freezeMetadata() external onlyOwner {
        metadataFrozen = true;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        string memory base = _baseURI();
        return string(abi.encodePacked(base, Strings.toString(tokenId), ".json"));
    }
}
