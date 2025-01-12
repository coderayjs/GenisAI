import styled from 'styled-components';
import { useState } from 'react';

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
                    linear-gradient(45deg, #DA498D, #FF8E53);
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const AsciiHeader = styled.pre`
  color: #DA498D;
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
    color: #DA498D;
    transform: translateX(5px);
  }
`;

const ToggleArrow = styled.button`
  background: none;
  border: none;
  color: #DA498D;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const LinksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const InfoLinks = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <InfoContainer>
      <ToggleArrow onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "▼" : "▲"}
      </ToggleArrow>

      {isOpen && (
        <LinksGrid>
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
└─➤ @Coming soon
`}
          </LinkItem>

          <AsciiHeader>
            {`
╔═════════════════════════╗
║      EVM ADDRESS     ║
╚═════════════════════════╝
`}
          </AsciiHeader>

          <LinkItem
            href="https://explorer.monad-devnet.devnet101.com/"
            target="_blank"
            style={{ wordBreak: "break-all" }}>
            {`
┌─ $GENSIS TOKEN
└─➤ Gn5...xyz
`}
          </LinkItem>
        </LinksGrid>
      )}
    </InfoContainer>
  );
};

export default InfoLinks; 