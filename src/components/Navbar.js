import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { FiHome, FiUser, FiLogIn, FiLogOut } from 'react-icons/fi'
import ThemeToggle from './ThemeToggle'
import { useAuth } from '../contexts/AuthContext'

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

const AuthButton = styled(Link)`
  background: ${props => props.logout ? '#f44336' : ({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.logout ? '#d32f2f' : ({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
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

const LogoutButton = styled.button`
  background: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  font-size: 1.5rem;

  &:hover {
    background: #d32f2f;
  }
`

const ProfileButton = styled(Link)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  margin-left: 20px;
  transition: color 0.3s;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
  object-fit: cover;
`

const DefaultAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #999;
  margin-right: 8px;
`

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, isAuthenticated, logout, userProfile } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const renderAvatar = () => {
    if (userProfile?.avatarUrl) {
      return <Avatar src={userProfile.avatarUrl} alt="User Avatar" />
    }
    
    return (
      <DefaultAvatar>
        {userProfile?.fullName ? userProfile.fullName.charAt(0).toUpperCase() : '?'}
      </DefaultAvatar>
    )
  }

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
          
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard">
                <FiUser />
                Dashboard
              </NavLink>
              <ProfileButton to="/profile">
                {renderAvatar()}
                Profile
              </ProfileButton>
              <AuthButton as="button" logout onClick={handleLogout}>
                <FiLogOut />
                Logout
              </AuthButton>
            </>
          ) : (
            <>
              <AuthButton to="/login">
                <FiLogIn />
                Se connecter
              </AuthButton>
            </>
          )}
          
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
            <MobileMenuItem to="/" onClick={() => setMobileMenuOpen(false)}>
              Accueil
            </MobileMenuItem>
            
            {isAuthenticated ? (
              <>
                <MobileMenuItem to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  Dashboard
                </MobileMenuItem>
                <MobileMenuItem to="/profile" onClick={() => setMobileMenuOpen(false)}>
                  {renderAvatar()}
                  Profile
                </MobileMenuItem>
                <LogoutButton onClick={handleLogout}>
                  <FiLogOut />
                  Logout
                </LogoutButton>
              </>
            ) : (
              <>
                <MobileMenuItem to="/login" onClick={() => setMobileMenuOpen(false)}>
                  Se connecter
                </MobileMenuItem>
              </>
            )}
            
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