import styled from 'styled-components';
import { useUser } from '../context/UserContext';

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(45deg, #FF6B6B, #FF8E53);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-family: 'Montserrat', sans-serif;
  z-index: 1000;
`;

const WalletDisplay = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  
  .label {
    font-size: 0.8rem;
    opacity: 0.8;
  }
`;

const XPDisplay = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  
  .label {
    font-size: 0.8rem;
    opacity: 0.8;
  }
`;

const UserHeader = () => {
  const { user } = useUser();

  if (!user) return null;

  const shortenedAddress = `${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}`;

  return (
    <HeaderContainer>
      <WalletDisplay>
        <div className="label">Wallet</div>
        {shortenedAddress}
      </WalletDisplay>
      <XPDisplay>
        <div className="label">XP</div>
        {user.xp.toLocaleString()}
      </XPDisplay>
    </HeaderContainer>
  );
};

export default UserHeader; 