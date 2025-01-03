import React from 'react';

const MintSuccess = ({ tokenId, transactionHash }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Minting Successful! 🎉</h2>
        
        {/* Pass Image */}
        <div className="mb-4">
          <img 
            src="https://raw.githubusercontent.com/coderayjs/GenisAI/master/metadata/genis-pass.png"
            alt="GENIS Pass" 
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Details */}
        <div className="space-y-2 text-gray-600">
          <p><span className="font-semibold">Token ID:</span> #{tokenId}</p>
          <p className="break-all">
            <span className="font-semibold">Transaction:</span>
            <a 
              href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 ml-1"
            >
              View on Etherscan
            </a>
          </p>
        </div>

        {/* View on OpenSea Button */}
        <a 
          href={`https://testnets.opensea.io/assets/sepolia/0x5650b08a9d0cc02b2b8075240bc65bc66e732fa4b4192f006de49275beb0e2b0/${tokenId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700"
        >
          View on OpenSea
        </a>
      </div>
    </div>
  );
};

export default MintSuccess; 