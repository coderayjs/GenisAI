import React from 'react';
import styled from 'styled-components';

const HowToMint = () => {
  return (
    <MintContainer>
      <AsciiHeader>
{`
╔════════════════════╗
║  HOW TO MINT NFT   ║
╚════════════════════╝
`}
      </AsciiHeader>

      <RequirementItem>
{`
┌─ STEP 1
└─➤ Complete Mental Health Check`}
      </RequirementItem>

      <RequirementItem>
{`
┌─ STEP 2
└─➤ Earn Points Through Advice`}
      </RequirementItem>

      <RequirementItem>
{`
┌─ STEP 3
└─➤ Connect MetaMask Wallet`}
      </RequirementItem>

      <AsciiHeader>
{`
╔═══════════════════╗
║   MINT DETAILS   ║
╚═══════════════════╝
`}
      </AsciiHeader>

      <RequirementItem>
{`
┌─ PRICE
└─➤ 0.005 ETH
`}
      </RequirementItem>

      <RequirementItem>
{`
┌─ NETWORK
└─➤ Sepolia Testnet
`}
      </RequirementItem>

      <RequirementItem>
{`
┌─ GET TEST ETH
└─➤ sepoliafaucet.com
`}
      </RequirementItem>
    </MintContainer>
  );
};

const MintContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(8px);
  padding: 1.5rem;
  border-radius: 16px;
  color: white;
  font-family: monospace;
  z-index: 9999;
  border: 2px solid transparent;
  background-image: linear-gradient(rgba(10, 10, 10, 0.95), rgba(10, 10, 10, 0.95)), 
                    linear-gradient(45deg, #DA498D, #FF8E53);
  background-origin: border-box;
  background-clip: content-box, border-box;
  width: 280px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const AsciiHeader = styled.pre`
  color: #DA498D;
  font-size: 0.7rem;
  line-height: 1.2;
  margin-bottom: 1rem;
`;

const RequirementItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 0.8rem;
  border-radius: 12px;
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
  border-left: 3px solid #DA498D;
`;

export default HowToMint; 