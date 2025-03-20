import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'
import ThemeToggle from './ThemeToggle'

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
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const JoinButton = styled(Link)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
  }
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
        <Logo to="/">Kairo</Logo>
        <NavLinks>
          <NavLink to="/">
            <FiHome />
            Accueil
          </NavLink>
          <JoinButton
            to="/waitlist"
            as={motion.a}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Rejoindre Kairo
          </JoinButton>
          <ThemeToggle />
        </NavLinks>
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
            <MobileMenuItem to="/search" onClick={() => setMobileMenuOpen(false)}>
              Rechercher
            </MobileMenuItem>
            <MobileMenuItem to="/agents" onClick={() => setMobileMenuOpen(false)}>
              Agents
            </MobileMenuItem>
            <MobileMenuItem to="/about" onClick={() => setMobileMenuOpen(false)}>
              À propos
            </MobileMenuItem>
            <MobileMenuItem to="/contact" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </MobileMenuItem>
            <ThemeToggle />
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar 