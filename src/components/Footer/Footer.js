import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter, FiLinkedin } from 'react-icons/fi';

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.glass.background};
  backdrop-filter: ${({ theme }) => theme.glass.blur};
  -webkit-backdrop-filter: ${({ theme }) => theme.glass.blur};
  border-top: 1px solid ${({ theme }) => theme.glass.border};
  padding: 3rem 0 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled.div`
  font-weight: 700;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const FooterDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const FooterTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 0.8rem;
  
  a {
    color: ${({ theme }) => theme.colors.textSecondary};
    transition: ${({ theme }) => theme.transitions.default};
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.glass.background};
  border: 1px solid ${({ theme }) => theme.glass.border};
  color: ${({ theme }) => theme.colors.text};
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: translateY(-3px);
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.glass.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 2rem;
  padding-right: 2rem;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterColumn>
          <FooterLogo>Kairo</FooterLogo>
          <FooterDescription>
            La plateforme immobilière intelligente du Sénégal qui connecte les agents immobiliers et les clients.
          </FooterDescription>
          <SocialLinks>
            <SocialLink href="https://instagram.com/kairo_vision" target="_blank" aria-label="Instagram">
              <FiInstagram />
            </SocialLink>
            <SocialLink href="https://facebook.com/kairovision" target="_blank" aria-label="Facebook">
              <FiFacebook />
            </SocialLink>
            <SocialLink href="https://twitter.com/kairo_vision" target="_blank" aria-label="Twitter">
              <FiTwitter />
            </SocialLink>
            <SocialLink href="https://linkedin.com/company/kairovision" target="_blank" aria-label="LinkedIn">
              <FiLinkedin />
            </SocialLink>
          </SocialLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Découvrir</FooterTitle>
          <FooterLinks>
            <FooterLink><Link to="/#kairo-vision">Kairo Vision</Link></FooterLink>
            <FooterLink><Link to="/waitlist">Liste d'attente</Link></FooterLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Informations</FooterTitle>
          <FooterLinks>
            <FooterLink><Link to="/about">À propos</Link></FooterLink>
            <FooterLink><Link to="/contact">Contact</Link></FooterLink>
            <FooterLink><Link to="/privacy">Confidentialité</Link></FooterLink>
            <FooterLink><Link to="/terms">Conditions d'utilisation</Link></FooterLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Contact</FooterTitle>
          <FooterLinks>
            <FooterLink>Email: info@kairovision.com</FooterLink>
            <FooterLink>Téléphone: +221 XX XXX XX XX</FooterLink>
            <FooterLink>Dakar, Sénégal</FooterLink>
          </FooterLinks>
        </FooterColumn>
      </FooterContent>
      
      <Copyright>
        © {currentYear} Kairo. Tous droits réservés.
      </Copyright>
    </FooterWrapper>
  );
};

export default Footer; 