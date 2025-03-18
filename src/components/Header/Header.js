import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Image from '../common/Image';
import { images } from '../../utils/images';
import ThemeToggle from '../ThemeToggle';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: ${({ theme }) => theme.transitions.default};
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: ${({ theme }) => 
    theme.mode === 'light' 
      ? 'rgba(255, 255, 255, 0.8)' 
      : 'rgba(18, 18, 18, 0.8)'
  };
  border-bottom: 1px solid ${({ theme }) => theme.glass.border};
  backdrop-filter: ${({ theme }) => theme.glass.blur};
  -webkit-backdrop-filter: ${({ theme }) => theme.glass.blur};
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05);
`;

const NavBrand = styled.div`
  .logo {
    height: 40px;
    width: auto;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  a {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
    transition: ${({ theme }) => theme.transitions.default};
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: ${({ theme }) => theme.colors.primary};
      transition: ${({ theme }) => theme.transitions.default};
    }

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      
      &:after {
        width: 100%;
      }
    }

    &.active {
      color: ${({ theme }) => theme.colors.primary};
      
      &:after {
        width: 100%;
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LanguageToggle = styled.div`
  display: flex;
  align-items: center;
  padding: 0.25rem;
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  background: ${({ theme }) => 
    theme.mode === 'light' 
      ? 'rgba(245, 245, 255, 0.9)' 
      : 'rgba(40, 40, 60, 0.9)'
  };
  border: 1px solid ${({ theme }) => theme.glass.border};

  span {
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
    transition: ${({ theme }) => theme.transitions.default};

    &.active {
      background: ${({ theme }) => theme.colors.primary};
      color: white;
      border-radius: ${({ theme }) => theme.layout.borderRadius};
    }
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  font-weight: 500;
  transition: ${({ theme }) => theme.transitions.default};

  &.login {
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    background: transparent;

    &:hover {
      background: ${({ theme }) => 
        theme.mode === 'light'
          ? 'rgba(138, 43, 226, 0.1)'
          : 'rgba(157, 80, 239, 0.2)'
      };
    }
  }

  &.signup {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border: 1px solid ${({ theme }) => theme.colors.primary};

    &:hover {
      background: ${({ theme }) => theme.colors.primaryDark};
    }
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Nav>
        <NavBrand>
          <Link to="/">
            <Image
              src={images.logo}
              alt="Kairo"
              className="logo"
              width="40px"
              height="40px"
              objectFit="contain"
            />
          </Link>
        </NavBrand>
        
        <NavLinks>
          <Link to="/#properties">Acheter</Link>
          <Link to="/#properties">Louer</Link>
          <Link to="/#kairo-vision">Kairo Vision</Link>
          <Link to="/waitlist">Liste d'attente</Link>
        </NavLinks>
        
        <NavButtons>
          <ThemeToggle />
          <LanguageToggle>
            <span className="active">FR</span>
            <span>EN</span>
          </LanguageToggle>
          <Button className="login">Se connecter</Button>
          <Button className="signup">S'inscrire</Button>
        </NavButtons>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header; 