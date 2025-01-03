import styled from 'styled-components';

const InfoContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.95);
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-family: monospace;
  max-width: 400px;
  border: 2px solid transparent;
  background-image: linear-gradient(white, white), 
                    linear-gradient(45deg, #FF6B6B, #FF8E53);
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const AsciiHeader = styled.pre`
  color: #FF6B6B;
  font-size: 0.7rem;
  line-height: 1.2;
  margin-bottom: 1rem;
`;

const LinkItem = styled.a`
  display: block;
  color: #333;
  text-decoration: none;
  margin: 0.5rem 0;
  padding: 0.5rem;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  
  &:hover {
    color: #FF6B6B;
    transform: translateX(5px);
  }
`;

const InfoLinks = () => {
  return (
    <InfoContainer>
      <AsciiHeader>
{`
╔══════════════════════╗
║     GENIS LINKS     ║
╚══════════════════════╝
`}
      </AsciiHeader>

      <LinkItem href="https://twitter.com/GENIS_AI" target="_blank">
{`
┌─ TWITTER
└─➤ @GENIS_AI
`}
      </LinkItem>

      <LinkItem href="https://t.me/GENIS_AI" target="_blank">
{`
┌─ TELEGRAM
└─➤ @GENIS_AI
`}
      </LinkItem>

      <AsciiHeader>
{`
╔═════════════════════════╗
║      CONTRACT ADDRESS     ║
╚═════════════════════════╝
`}
      </AsciiHeader>

      <LinkItem 
        href="https://solscan.io/token/your_contract_address" 
        target="_blank"
        style={{ wordBreak: 'break-all' }}
      >
{`
┌─ SOLANA
└─➤ Gn5...xyz
`}
      </LinkItem>
    </InfoContainer>
  );
};

export default InfoLinks; 