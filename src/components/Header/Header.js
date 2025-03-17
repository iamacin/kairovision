import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Image from '../common/Image';
import { images } from '../../utils/images';

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
  ${({ theme }) => theme.glass.background};
  backdrop-filter: ${({ theme }) => theme.glass.blur};
  -webkit-backdrop-filter: ${({ theme }) => theme.glass.blur};
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
    font-weight: 500;
    transition: ${({ theme }) => theme.transitions.default};

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }

    &.active {
      color: ${({ theme }) => theme.colors.primary};
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
  background: ${({ theme }) => theme.glass.background};
  border: 1px solid ${({ theme }) => theme.glass.border};

  span {
    padding: 0.25rem 0.5rem;
    cursor: pointer;
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

    &:hover {
      background: rgba(138, 43, 226, 0.1);
    }
  }

  &.signup {
    background: ${({ theme }) => theme.colors.primary};
    color: white;

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