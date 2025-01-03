import { Network, Alchemy } from 'alchemy-sdk';
import { ethers } from 'ethers';

// NFT Contract details
const NFT_CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS";
const NFT_ABI = [
  "function mint(address to) public",
  "function balanceOf(address owner) view returns (uint256)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)"
];

// Sepolia network configuration
const SEPOLIA_RPC = "https://eth-sepolia.g.alchemy.com/v2/rLKuFcZ7fSvflknt123WR-y4CSqnPB83";
const CHAIN_ID = 11155111; // Sepolia chain ID

export const mintNFT = async () => {
  try {
    if (!window.ethereum) {
      throw new Error('Please install MetaMask');
    }

    // Request network switch to Sepolia
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${CHAIN_ID.toString(16)}` }],
      });
    } catch (switchError) {
      // Handle chain switch error
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: `0x${CHAIN_ID.toString(16)}`,
            chainName: 'Sepolia Testnet',
            nativeCurrency: {
              name: 'Sepolia ETH',
              symbol: 'SEP',
              decimals: 18
            },
            rpcUrls: [SEPOLIA_RPC],
            blockExplorerUrls: ['https://sepolia.etherscan.io']
          }]
        });
      } else {
        throw switchError;
      }
    }

    // Create provider and signer
    const provider = new ethers.providers.JsonRpcProvider(SEPOLIA_RPC);
    const signer = provider.getSigner();

    // Create contract instance
    const nftContract = new ethers.Contract(
      NFT_CONTRACT_ADDRESS,
      NFT_ABI,
      signer
    );

    // Get accounts
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
    const userAddress = accounts[0];

    // Mint NFT
    const tx = await nftContract.mint(userAddress);
    const receipt = await tx.wait();

    return {
      success: true,
      transaction: receipt.transactionHash,
      userAddress: userAddress
    };

  } catch (error) {
    console.error('Minting error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Helper function to get Sepolia ETH from a faucet
export const getSepoliaEth = () => {
  window.open('https://sepoliafaucet.com', '_blank');
};

// Add discount check function
export const checkDiscountEligibility = async (address) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      NFT_CONTRACT_ADDRESS,
      NFT_ABI,
      provider
    );
    
    return await contract.isEligibleForDiscount(address);
  } catch (error) {
    console.error('Discount check error:', error);
    return false;
  }
}; 