import { Network, Alchemy } from 'alchemy-sdk';

// Configure Alchemy SDK
const settings = {
  apiKey: "YOUR_ALCHEMY_API_KEY", // Replace with your Alchemy API key
  network: Network.ETH_SEPOLIA, // Using Sepolia testnet
};

const alchemy = new Alchemy(settings);

export const mintNFT = async () => {
  try {
    if (!window.ethereum) {
      throw new Error('Please install MetaMask');
    }

    // Get the wallet address
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
    const userAddress = accounts[0];

    // NFT Metadata
    const nftMetadata = {
      name: "GENIS Pass",
      description: "GENIS Community Access Pass",
      image: "YOUR_NFT_IMAGE_URL", // Replace with your NFT image URL
      attributes: [
        {
          trait_type: "Type",
          value: "Community Pass"
        }
      ]
    };

    // Mint NFT using Alchemy
    const transaction = await alchemy.nft.mintNft({
      contract: "YOUR_CONTRACT_ADDRESS", // Replace with your NFT contract address
      to: userAddress,
      tokenUri: nftMetadata
    });

    return {
      success: true,
      transaction: transaction.hash,
      tokenId: transaction.tokenId
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