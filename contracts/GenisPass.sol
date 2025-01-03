// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GenisPass is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public constant MAX_SUPPLY = 1000000; // Total number of passes
    uint256 public constant MINT_PRICE = 0.005 ether; // Price per pass

    // Mapping for whitelist/discount addresses
    mapping(address => bool) public discountList;
    uint256 public constant DISCOUNT_PRICE = 0.005 ether; // Discounted price

    constructor() ERC721("GENISAI Pass", "GENIS") Ownable() {}

    // Regular mint function
    function mint() public payable returns (uint256) {
        require(_tokenIds.current() < MAX_SUPPLY, "Max supply reached");
        require(msg.value >= MINT_PRICE, "Insufficient payment");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(msg.sender, newTokenId);

        // Refund excess payment
        if (msg.value > MINT_PRICE) {
            payable(msg.sender).transfer(msg.value - MINT_PRICE);
        }

        return newTokenId;
    }

    // Discounted mint for whitelisted addresses
    function mintDiscounted() public payable returns (uint256) {
        require(discountList[msg.sender], "Not eligible for discount");
        require(_tokenIds.current() < MAX_SUPPLY, "Max supply reached");
        require(msg.value >= DISCOUNT_PRICE, "Insufficient payment");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(msg.sender, newTokenId);

        // Refund excess payment
        if (msg.value > DISCOUNT_PRICE) {
            payable(msg.sender).transfer(msg.value - DISCOUNT_PRICE);
        }

        return newTokenId;
    }

    // Add addresses to discount list (owner only)
    function addToDiscountList(address[] calldata addresses) public onlyOwner {
        for (uint i = 0; i < addresses.length; i++) {
            discountList[addresses[i]] = true;
        }
    }

    // Remove addresses from discount list (owner only)
    function removeFromDiscountList(address[] calldata addresses) public onlyOwner {
        for (uint i = 0; i < addresses.length; i++) {
            discountList[addresses[i]] = false;
        }
    }

    // Check if address is eligible for discount
    function isEligibleForDiscount(address wallet) public view returns (bool) {
        return discountList[wallet];
    }

    // Withdraw contract balance (owner only)
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }

    // Get total supply
    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    // Get remaining supply
    function remainingSupply() public view returns (uint256) {
        return MAX_SUPPLY - _tokenIds.current();
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return "https://raw.githubusercontent.com/coderayjs/GenisAI/master/genis-pass.json";
    }
} 