import React, { useState } from 'react';
import styled from 'styled-components';
import HowToMint from './HowToMint';

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(8px);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  font-family: 'Montserrat', sans-serif;
`;

const WalletDisplay = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 2px;
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-family: 'Montserrat', sans-serif;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-1px);
  }

  .label {
    font-size: 0.6rem;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-family: 'Montserrat', sans-serif;
  }

  .address {
    font-size: 0.9rem;
  }
`;

const PoweredBy = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  font-family: "Montserrat", sans-serif;

  span {
    color: #69247c;
    font-weight: bold;
    font-size: 0.9rem;
    font-family: "Montserrat", sans-serif;
  }
`;

const XPDisplay = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  
  .label {
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 0.2rem;
    font-family: 'Montserrat', sans-serif;
  }
`;

const InfoButton = styled.button`
  background: #DA498D;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  margin-left: 1rem;
  transition: all 0.2s ease;
  font-family: 'Montserrat', sans-serif;
  &:hover {
    transform: translateY(-1px);
    background: #ff8585;
  }
`;

const UserHeader = () => {
  const [showHowToMint, setShowHowToMint] = useState(false);

  return (
    <>
      <HeaderContainer>
        <WalletDisplay>
          <div className="label">GENIS AI</div>
          <div className="address">Mental Health Support</div>
        </WalletDisplay>
        
        <PoweredBy>
          Developed <span> MONAD💜 Community </span>
        </PoweredBy>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <XPDisplay>
            <div className="label">POINTS</div>
            <div>0</div>
          </XPDisplay>
          
          <InfoButton onClick={() => setShowHowToMint(!showHowToMint)}>
            <span>{showHowToMint ? 'CLOSE' : 'HOW TO MINT'}</span>
          </InfoButton>
        </div>
      </HeaderContainer>

      {showHowToMint && <HowToMint />}
    </>
  );
};

export default UserHeader; 