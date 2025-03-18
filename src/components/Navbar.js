import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.scrolled 
    ? props.theme.mode === 'light' 
      ? 'rgba(255, 255, 255, 0.9)' 
      : 'rgba(22, 22, 37, 0.9)'
    : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  transition: all 0.3s ease;
`

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 800;
  color: ${props => props.scrolled 
    ? props.theme.colors.text
    : '#ffffff'};
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 24px;
    height: 24px;
  }
`

const MenuItems = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`

const MenuItem = styled(Link)`
  color: ${props => props.scrolled 
    ? props.theme.colors.text
    : '#ffffff'};
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.scrolled 
      ? props.theme.colors.primary
      : '#e0e0e0'};
  }
`

const AuthButton = styled(motion.button)`
  padding: 0.5rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  
  ${props => props.primary ? `
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    color: white;
    border: none;
    
    &:hover {
      box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);
    }
  ` : `
    background: transparent;
    color: ${props.scrolled 
      ? props.theme.colors.text
      : '#ffffff'};
    border: 2px solid ${props.scrolled 
      ? props.theme.colors.border
      : '#ffffff'};
    
    &:hover {
      background: ${props.scrolled 
        ? props.theme.mode === 'light'
          ? 'rgba(0, 0, 0, 0.05)'
          : 'rgba(255, 255, 255, 0.05)'
        : 'rgba(255, 255, 255, 0.1)'};
    }
  `}
`

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.scrolled 
    ? props.theme.colors.text
    : '#ffffff'};
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.mode === 'light'
    ? 'rgba(255, 255, 255, 0.98)'
    : 'rgba(22, 22, 37, 0.98)'};
  padding: 5rem 2rem;
  z-index: 999;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`

const MobileMenuItem = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Nav
        scrolled={scrolled}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo to="/" scrolled={scrolled}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L1 12h3v9h6v-6h4v6h6v-9h3L12 2z" />
          </svg>
          Kairo
        </Logo>

        <MenuItems>
          <MenuItem to="/properties" scrolled={scrolled}>Properties</MenuItem>
          <MenuItem to="/agents" scrolled={scrolled}>Agents</MenuItem>
          <MenuItem to="/about" scrolled={scrolled}>About</MenuItem>
          <MenuItem to="/contact" scrolled={scrolled}>Contact</MenuItem>
          <AuthButton
            scrolled={scrolled}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </AuthButton>
          <AuthButton
            primary
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            List Property
          </AuthButton>
        </MenuItems>

        <MobileMenuButton
          scrolled={scrolled}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </Nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
          >
            <MobileMenuItem to="/properties" onClick={() => setMobileMenuOpen(false)}>
              Properties
            </MobileMenuItem>
            <MobileMenuItem to="/agents" onClick={() => setMobileMenuOpen(false)}>
              Agents
            </MobileMenuItem>
            <MobileMenuItem to="/about" onClick={() => setMobileMenuOpen(false)}>
              About
            </MobileMenuItem>
            <MobileMenuItem to="/contact" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </MobileMenuItem>
            <AuthButton primary>List Property</AuthButton>
            <AuthButton>Sign In</AuthButton>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar 