import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { mintNFT } from '../utils/mintNFT';
import MintSuccess from './MintSuccess';
import MintInstructions from './MintInstructions';
import UserHeader from './UserHeader';

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
  background: linear-gradient(45deg, #DA498D, #FF8E53);
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
  color: #DA498D;
  text-align: center;
`;

const StepNumber = styled.h3`
  font-size: 2rem;
  color: #333;
  margin: 1rem 0;
  font-weight: 600;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  margin: 2rem 0;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
`;

const Progress = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: ${props => props.progress}%;
  height: 100%;
  background: linear-gradient(45deg, #DA498D, #FF8E53);
  border-radius: 2px;
  transition: width 0.3s ease;
`;

const XPReward = styled.div`
  text-align: center;
  font-size: 2rem;
  color: #DA498D;
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
  const { user, registerUser } = useUser();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    solanaAddress: '',
    twitterHandle: '',
    nftMinted: false
  });
  const [isCompleted] = useState(false);
  const [minting, setMinting] = useState(false);
  const [mintError, setMintError] = useState('');

  const [mintSuccess, setMintSuccess] = useState(false);
  const [mintData, setMintData] = useState(null);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [hasSepoliaNetwork] = useState(false);
  const [hasBalance] = useState(false);

  const handleSolanaSubmit = () => {
    // Simply move to next step
    setStep(2);
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

  const handleWalletConnect = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      if (accounts[0]) {
        registerUser(accounts[0]);
        setStep(2); // This will set progress to 33.33%
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const progress = ((step - 1) / 3) * 100;

  // Check requirements on mount
  useEffect(() => {
    const checkRequirements = async () => {
      setHasMetamask(!!window.ethereum);
      // Check network and balance here
    };
    checkRequirements();
  }, []);

  // Debug log
  console.log('Current user state:', user);
  console.log('Current step:', step);
  console.log('Current progress:', progress);

  return (
    <div className="relative">
      {user && <UserHeader />}
      
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
            <Progress progress={mintSuccess ? 100 : progress} />
          </ProgressBar>
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
                  color: '#DA498D',
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
                onClick={handleWalletConnect}
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
                MON Address: {data.evmWalletAddress.slice(0, 6)}...{data.evmWalletAddress.slice(-4)}
              </div>
            )}

            {mintError && (
              <div style={{ 
                color: '#DA498D', 
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

        {step === 3 && ( // Show during mint step
          <MintInstructions 
            hasMetamask={hasMetamask}
            hasSepoliaNetwork={hasSepoliaNetwork}
            hasBalance={hasBalance}
          />
        )}
      </CensusContainer>
    </div>
  );
};

export default Census; 