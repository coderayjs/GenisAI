import React from 'react';
import genisPass from '../assets/genis-pass.png';

const MintSuccess = ({ tokenId, TxID }) => {
  console.log(tokenId, TxID);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-[#0A0A0A] p-8 rounded-lg shadow-xl max-w-sm w-full border border-[#1E1E1E]">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">
          Congratulations! You minted a Free Genis Pass Nft on monad devnet! 🎉
        </h2>
        <p className="text-lg mb-4 text-center text-white">
          You can now view your NFT on the Monad Devnet Explorer
        </p>
        {/* Pass Image - Smaller Size */}
        <div className="flex justify-center mb-4">
          <img
            src={genisPass}
            alt="GENIS Pass"
            className="w-32 h-32 object-contain rounded-lg shadow-md"
          />
        </div>

        {/* Details */}
        <div className="space-y-2 text-gray-300">
          <p>
            <span className="font-semibold">Token ID:</span> #{tokenId}
          </p>
          <p className="break-all">
            <span className="font-semibold">Transaction:</span>
            <a
              href={`https://explorer.monad.xyz/devnet/tx/${TxID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 ml-1">
              View on Explorer
            </a>
          </p>
        </div>

        {/* View on OpenSea Button */}
        <a
          href={`https://explorer.monad-devnet.devnet101.com/address/0xc6F66A7154139C28604d61B5eCae05B38B391b0D`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Check Collection
        </a>
      </div>
    </div>
  );
};

export default MintSuccess; 