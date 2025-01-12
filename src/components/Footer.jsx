import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>GENIS AI</FooterTitle>
          <FooterText>Mental health support for web3 Users</FooterText>
        </FooterSection>
        
        <FooterSection>
          <FooterLinks>
            <FooterLink href="https://988lifeline.org/" target="_blank">Crisis Support</FooterLink>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Use</FooterLink>
          </FooterLinks>
        </FooterSection>
        
        <Copyright>© 2024 GENIS AI. All rights reserved.</Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background: rgba(10, 10, 10, 0.95);
  padding: 2rem 0;
  margin-top: 4rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-family: 'Montserrat', sans-serif;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  color: white;
  font-family: 'Montserrat', sans-serif;
`;

const FooterSection = styled.div`
  margin-bottom: 1.5rem;
  font-family: 'Montserrat', sans-serif;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #DA498D;
  font-family: 'Montserrat', sans-serif;
`;

const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-family: 'Montserrat', sans-serif;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
  font-family: 'Montserrat', sans-serif;
`;

const FooterLink = styled.a`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
  font-family: 'Montserrat', sans-serif;
  &:hover {
    color: #DA498D;
  }
`;

const Copyright = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
  margin-top: 2rem;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
`;

export default Footer; 