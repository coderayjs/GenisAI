import styled from 'styled-components';
import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { mintNFT, getSepoliaEth } from '../utils/mintNFT';
import MintSuccess from './MintSuccess';

const CensusContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Montserrat', sans-serif;
`;

const StepContainer = styled.div`
  margin: 1.5rem 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin: 0.5rem 0;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #FF6B6B, #FF8E53);
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.2rem;
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
  margin: 1rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const StepTitle = styled.div`
  text-align: center;
  margin: 2rem 0;
  font-family: 'Montserrat', sans-serif;
`;

const AsciiTitle = styled.pre`
  font-family: monospace;
  white-space: pre;
  font-size: 0.7rem;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #FF6B6B;
  text-align: center;
`;

const StepNumber = styled.h3`
  font-size: 2rem;
  color: #333;
  margin: 1rem 0;
  font-weight: 600;
`;

const ProgressBarContainer = styled.div`
  position: relative;
  margin: 2rem 0;
  padding: 1rem;
  
  &::before {
    content: '╔════════════════════════╗';
    display: block;
    font-family: monospace;
    color: #FF6B6B;
    margin-bottom: 0.5rem;
  }
  
  &::after {
    content: '╚════════════════════════╝';
    display: block;
    font-family: monospace;
    color: #FF6B6B;
    margin-top: 0.5rem;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: #fff;
  border-radius: 10px;
  margin: 1rem 0;
  overflow: hidden;
  border: 2px solid transparent;
  background-image: linear-gradient(white, white), 
                    linear-gradient(45deg, #FF6B6B, #FF8E53);
  background-origin: border-box;
  background-clip: content-box, border-box;
  position: relative;
`;

const Progress = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background: linear-gradient(45deg, #FF6B6B, #FF8E53);
  transition: width 0.5s ease;
  border-radius: 6px;
`;

const XPReward = styled.div`
  text-align: center;
  font-size: 2rem;
  color: #FF6B6B;
  margin: 2rem 0;
  animation: pulse 2s infinite;
  font-family: 'Montserrat', sans-serif;

  .points {
    font-size: 3rem;
    font-weight: bold;
    margin: 1rem 0;
  }

  .message {
    font-size: 1.5rem;
    color: #333;
    margin-top: 1rem;
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;

const Census = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    solanaAddress: '',
    twitterHandle: '',
    nftMinted: false
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const { registerUser } = useUser();
  const [verifying, setVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [minting, setMinting] = useState(false);
  const [mintError, setMintError] = useState('');
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [discountAddress, setDiscountAddress] = useState('');
  const [mintSuccess, setMintSuccess] = useState(false);
  const [mintData, setMintData] = useState(null);

  const handleSolanaSubmit = () => {
    // Simply move to next step
    setStep(2);
  };

  const handleTelegramSubmit = () => {
    // Simply move to next step without verification
    setStep(3);
  };

  const handleNFTMint = async () => {
    try {
      setMinting(true);
      setMintError(null);
      const result = await mintNFT();
      if (result.success) {
        setMintData(result);
        setMintSuccess(true);
      }
    } catch (error) {
      setMintError(error.message);
    } finally {
      setMinting(false);
    }
  };

  const handleDiscountCheck = async () => {
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error('Please install MetaMask');
      }

      // Get connected wallet address
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      const userAddress = accounts[0];

      // List of addresses eligible for discount
      const discountAddresses = [
        '0x123...', // Replace with actual addresses
        '0x456...',
        '0x789...'
      ];

      const hasDiscount = discountAddresses.includes(userAddress.toLowerCase());
      setIsDiscounted(hasDiscount);
      setDiscountAddress(userAddress);

      return hasDiscount;
    } catch (error) {
      console.error('Discount check error:', error);
      setMintError('Failed to check discount status');
      return false;
    }
  };

  const progress = (step - 1) * 33.33;

  return (
    <CensusContainer>
      <AsciiTitle>
{`
   ▄████▄   ▓█████  ███▄    █   ██████  █    ██   ██████ 
  ▒██▀ ▀█   ▓█   ▀  ██ ▀█   █ ▒██    ▒  ██  ▓██▒▒██    ▒ 
  ▒▓█    ▄  ▒███   ▓██  ▀█ ██▒░ ▓██▄   ▓██  ▒██░░ ▓██▄   
  ▒▓▓▄ ▄██▒ ▒▓█  ▄ ▓██▒  ▐▌██▒  ▒   ██▒▓▓█  ░██░  ▒   ██▒
  ▒ ▓███▀ ░ ░▒████▒▒██░   ▓██░▒██████▒▒▒▒█████▓ ▒██████▒▒
  ░ ░▒ ▒  ░ ░░ ▒░ ░░ ▒░   ▒ ▒ ▒ ▒▓▒ ▒ ░░▒▓▒ ▒ ▒ ▒ ▒▓▒ ▒ ░
    ░  ▒     ░ ░  ░░ ░░   ░ ▒░░ ░▒  ░ ░░░▒░ ░ ░ ░ ░▒  ░ ░
`}
      </AsciiTitle>

      <ProgressBarContainer>
        <ProgressBar>
          <Progress progress={progress} />
        </ProgressBar>
        <div style={{ 
          textAlign: 'center', 
          color: '#FF6B6B', 
          fontFamily: 'monospace' 
        }}>
          {`[${Math.round(progress)}%]`}
        </div>
      </ProgressBarContainer>

      {step === 1 && (
        <StepContainer>
          <StepTitle>
            <AsciiTitle>
{`
  ╭──────────────────────╮
  │    JOIN COMMUNITY    │
  ╰──────────────────────╯
     ┌─┐┌─┐┌┬┐┌─┐┌─┐
     └─┐├┤  │ ├┤ ├─┘
     └─┘└─┘ ┴ └─┘┴  
`}
            </AsciiTitle>
            <StepNumber>Step 1: Enter Your EVM Wallet</StepNumber>
          </StepTitle>
          <Input
            type="text"
            placeholder="Enter EVM Wallet Address"
            value={data.evmWalletAddress}
            onChange={(e) => setData({ ...data, evmWalletAddress: e.target.value })}
          />
          <Button onClick={handleSolanaSubmit}>Proceed</Button>
        </StepContainer>
      )}

      {step === 2 && (
        <StepContainer>
          <StepTitle>
            <AsciiTitle>
{`
  ╭────────────────────╮
  │  TELEGRAM CONNECT  │
  ╰────────────────────╯
    ▀▀█▀▀ █▀▀▀ █   
    ░▒█░░ █▀▀▀ █   
    ░▒█░░ █▄▄▄ ▀▄▄
`}
            </AsciiTitle>
            <StepNumber>Step 2: Join Telegram Channel</StepNumber>
          </StepTitle>
          <div style={{ marginBottom: '2rem' }}>
            <a 
              href="https://t.me/GENIS_AI" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: '#FF6B6B',
                textDecoration: 'none',
                fontFamily: 'Montserrat',
                fontWeight: 'bold',
                fontSize: '1.2rem'
              }}
            >
              Join our Telegram Channel
            </a>
          </div>
          <Button onClick={() => setStep(3)}>
            Continue
          </Button>
        </StepContainer>
      )}

      {step === 3 && (
        <StepContainer>
          <StepTitle>
            <AsciiTitle>
{`
  ╭────────────────────╮
  │    GENIS PASS     │
  ╰────────────────────╯
    ███╗   ██╗███████╗████████╗
    ████╗  ██║██╔════╝╚══██╔══╝
    ██╔██╗ ██║█████╗     ██║   
    ██║╚██╗██║██╔══╝     ██║   
    ██║ ╚████║██║        ██║   
    ╚═╝  ╚═══╝╚═╝        ╚═╝   
`}
            </AsciiTitle>
            <StepNumber>Step 3: Connect & Mint</StepNumber>
          </StepTitle>

          {!data.evmWalletAddress ? (
            <Button 
              onClick={async () => {
                try {
                  // Check if MetaMask is installed
                  if (typeof window.ethereum === 'undefined') {
                    window.open('https://metamask.io', '_blank');
                    throw new Error('Please install MetaMask');
                  }

                  // Request accounts with error handling
                  const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                  }).catch((err) => {
                    if (err.code === 4001) {
                      throw new Error('Please connect your wallet');
                    } else {
                      throw new Error('Error connecting wallet');
                    }
                  });

                  if (accounts && accounts[0]) {
                    setData({ ...data, evmWalletAddress: accounts[0] });
                  }
                } catch (error) {
                  console.error('Wallet connection error:', error);
                  setMintError(error.message);
                }
              }}
            >
              Connect Wallet
            </Button>
          ) : (
            <Button 
              onClick={handleNFTMint}
              disabled={minting}
            >
              {minting ? 'Minting...' : 'Mint NFT'}
            </Button>
          )}

          {data.evmWalletAddress && (
            <div style={{ 
              marginTop: '1rem',
              fontFamily: 'Montserrat',
              color: '#4CAF50',
              fontSize: '0.9rem'
            }}>
              Connected: {data.evmWalletAddress.slice(0, 6)}...{data.evmWalletAddress.slice(-4)}
            </div>
          )}

          {mintError && (
            <div style={{ 
              color: '#FF6B6B', 
              marginTop: '1rem',
              fontFamily: 'Montserrat'
            }}>
              {mintError}
            </div>
          )}

          {mintSuccess && (
            <MintSuccess 
              tokenId={mintData.tokenId}
              transactionHash={mintData.transaction}
            />
          )}
        </StepContainer>
      )}

      {isCompleted && (
        <XPReward>
          <AsciiTitle>
{`
    ██████╗ ██████╗ ███╗   ██╗ ██████╗ ██████╗  █████╗ ████████╗███████╗██╗
   ██╔════╝██╔═══██╗████╗  ██║██╔════╝ ██╔══██╗██╔══██╗╚══██╔══╝██╔════╝██║
   ██║     ██║   ██║██╔██╗ ██║██║  ███╗██████╔╝███████║   ██║   ███████╗██║
   ██║     ██║   ██║██║╚██╗██║██║   ██║██╔══██╗██╔══██║   ██║   ╚════██║╚═╝
   ╚██████╗╚██████╔╝██║ ╚████║╚██████╔╝██║  ██║██║  ██║   ██║   ███████║██╗
    ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝
`}
          </AsciiTitle>
          <div className="points">+10,000 XP</div>
          <div className="message">
            We are proud of you for taking the first step towards better mental health!
          </div>
          <AsciiTitle style={{ marginTop: '1rem', fontSize: '0.6rem' }}>
{`
    ╔═══════════════════════════════════════════╗
    ║             ACHIEVEMENT UNLOCKED           ║
    ║         ⭐ GENIS COMMUNITY MEMBER ⭐      ║
    ╚═══════════════════════════════════════════╝
`}
          </AsciiTitle>
        </XPReward>
      )}
    </CensusContainer>
  );
};

export default Census; 