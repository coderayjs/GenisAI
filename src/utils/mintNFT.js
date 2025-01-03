import { ethers } from 'ethers';

// NFT Contract ABI - minimal version for minting
const NFT_ABI = [
  "function mint(address to) public",
  "function balanceOf(address owner) view returns (uint256)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)"
];

// Sepolia testnet contract address - replace with your deployed contract address
const NFT_CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS";

export const mintNFT = async () => {
  try {
    // Check if MetaMask is installed
    if (!window.ethereum) {
      throw new Error('Please install MetaMask');
    }

    // Request account access
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Create provider and signer
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    
    // Check if we're on Sepolia
    const network = await provider.getNetwork();
    if (network.chainId !== 11155111) { // Sepolia chainId
      try {
        // Switch to Sepolia
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa36a7' }], // Sepolia chainId in hex
        });
      } catch (switchError) {
        // If Sepolia is not added to MetaMask, add it
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0xaa36a7',
              chainName: 'Sepolia Testnet',
              nativeCurrency: {
                name: 'Sepolia ETH',
                symbol: 'SEP',
                decimals: 18
              },
              rpcUrls: ['https://rpc.sepolia.org'],
              blockExplorerUrls: ['https://sepolia.etherscan.io']
            }]
          });
        } else {
          throw switchError;
        }
      }
    }

    // Create contract instance
    const nftContract = new ethers.Contract(
      NFT_CONTRACT_ADDRESS,
      NFT_ABI,
      signer
    );

    console.log('Minting NFT...');
    const tx = await nftContract.mint(await signer.getAddress());
    console.log('Transaction sent:', tx.hash);

    // Wait for transaction confirmation
    const receipt = await tx.wait();
    console.log('Transaction confirmed:', receipt);

    // Get the newly minted token ID
    const balance = await nftContract.balanceOf(await signer.getAddress());
    const tokenId = await nftContract.tokenOfOwnerByIndex(
      await signer.getAddress(),
      balance.sub(1)
    );

    return {
      success: true,
      transactionHash: receipt.transactionHash,
      tokenId: tokenId.toString()
    };

  } catch (error) {
    console.error('Minting error:', error);
    return {
      success: false,
      error: error.message || 'Failed to mint NFT'
    };
  }
};

// Helper function to get Sepolia ETH from a faucet
export const getSepoliaEth = () => {
  window.open('https://sepoliafaucet.com', '_blank');
}; 