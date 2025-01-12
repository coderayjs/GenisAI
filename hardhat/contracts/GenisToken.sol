// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;  // Updated to match hardhat.config.ts version
//Test contract for GENIS Token

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract GenisToken is ERC20, Ownable, Pausable {
    // Events
    event TokensMinted(address indexed to, uint256 amount);
    event TokensBurned(address indexed from, uint256 amount);

    constructor() ERC20("GENIS Devnet Token", "GENIS") Ownable() {  // Removed msg.sender parameter
        // Mint 10 million tokens to the deployer
        _mint(msg.sender, 10000000 * 10 ** decimals());
    }

    // Transfer tokens with pause functionality
    function transfer(address to, uint256 amount) public override whenNotPaused returns (bool) {
        require(to != address(0), "Cannot transfer to zero address");
        require(amount > 0, "Amount must be greater than zero");
        return super.transfer(to, amount);
    }

    // Transfer tokens from one address to another with pause functionality
    function transferFrom(address from, address to, uint256 amount) public override whenNotPaused returns (bool) {
        require(to != address(0), "Cannot transfer to zero address");
        require(amount > 0, "Amount must be greater than zero");
        return super.transferFrom(from, to, amount);
    }

    // Mint new tokens (only owner)
    function mint(address to, uint256 amount) public onlyOwner {
        require(to != address(0), "Cannot mint to zero address");
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    // Burn tokens
    function burn(uint256 amount) public {
        require(amount > 0, "Amount must be greater than zero");
        _burn(msg.sender, amount);
        emit TokensBurned(msg.sender, amount);
    }

    // Pause token transfers (only owner)
    function pause() public onlyOwner {
        _pause();
    }

    // Unpause token transfers (only owner)
    function unpause() public onlyOwner {
        _unpause();
    }

    // Get token balance of an address
    function balanceOf(address account) public view override returns (uint256) {
        return super.balanceOf(account);
    }

    // Get total supply
    function totalSupply() public view override returns (uint256) {
        return super.totalSupply();
    }
} 