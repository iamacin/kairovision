import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FiHome, FiUser, FiLogIn, FiLogOut, FiPhone } from 'react-icons/fi'
import ThemeToggle from './ThemeToggle'
import { useAuth } from '../contexts/AuthContext'

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0.8rem 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.scrolled 
    ? props.theme.mode === 'light' 
      ? 'rgba(255, 255, 255, 0.85)' 
      : 'rgba(18, 18, 30, 0.85)'
    : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(12px)' : 'none'};
  box-shadow: ${props => props.scrolled ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none'};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 800;
  color: ${({ theme, scrolled }) => 
    !scrolled && theme.mode === 'light' && window.location.pathname === '/' 
      ? 'white' 
      : theme.colors.text};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  padding: 0.3rem 0;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2.2rem;

  @media (max-width: 768px) {
    gap: 1.2rem;
  }
`

const NavLink = styled(Link)`
  color: ${({ theme, scrolled, isActive, isHome }) => {
    if (isActive) return theme.colors.primary;
    if (isHome && !scrolled) return 'white';
    return theme.colors.text;
  }};
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.3rem 0;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.isActive ? '100%' : '0'};
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    
    &::after {
      width: 100%;
    }
  }
`

const ButtonBase = `
  padding: 0.6rem 1.6rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: rotate(30deg);
    z-index: -1;
    transition: transform 0.5s ease;
    opacity: 0;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    
    &::after {
      opacity: 1;
      transform: rotate(30deg) translate(80%, -40%);
    }
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`

const AuthButton = styled(motion(Link))`
  ${ButtonBase}
  background: ${props => props.logout ? 'linear-gradient(135deg, #f44336, #d32f2f)' : ({ theme }) => `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryDark})`};
  color: white;
`

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: ${props => {
    if (props.isOpen) return props.theme.colors.primary;
    if (!props.scrolled && window.location.pathname === '/') return 'white';
    return props.theme.colors.text;
  }};
  font-size: 1.5rem;
  cursor: pointer;
  position: relative;
  z-index: 1001;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(${props => props.theme.colors.primaryRgb}, 0.1);
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.mode === 'light'
    ? 'rgba(255, 255, 255, 0.98)'
    : 'rgba(18, 18, 30, 0.98)'};
  padding: 5rem 2rem;
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 769px) {
    display: none;
  }
`

const MobileMenuItem = styled(motion(Link))`
  color: ${({ theme, isActive }) => isActive ? theme.colors.primary : theme.colors.text};
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  padding: 1rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: ${props => props.isActive ? '40%' : '0'};
    height: 3px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 3px;
    transition: width 0.3s ease;
  }
  
  &:hover {
    background: rgba(${({ theme }) => theme.colors.primaryRgb}, 0.05);
    
    &::after {
      width: 40%;
    }
  }
`

const LogoutButton = styled(motion.button)`
  background: linear-gradient(135deg, #f44336, #d32f2f);
  color: white;
  border: none;
  padding: 1rem 0;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  width: 100%;
  font-size: 1.5rem;
  box-shadow: 0 4px 15px rgba(244, 67, 54, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(244, 67, 54, 0.4);
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(244, 67, 54, 0.4);
  }
`

const ProfileButton = styled(motion(Link))`
  display: flex;
  align-items: center;
  color: ${({ theme, scrolled, isHome }) => {
    if (isHome && !scrolled) return 'white';
    return theme.colors.text;
  }};
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 0.5rem 0.8rem;
  border-radius: 30px;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: rgba(${({ theme }) => theme.colors.primaryRgb}, 0.05);
    transform: translateY(-2px);
  }
`

const Avatar = styled(motion.img)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  transition: all 0.3s ease;
  
  ${ProfileButton}:hover & {
    transform: scale(1.1);
  }
`

const DefaultAvatar = styled(motion.div)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryDark});
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: white;
  margin-right: 10px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  ${ProfileButton}:hover & {
    transform: scale(1.1);
  }
`

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, isAuthenticated, logout, userProfile } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

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
      return (
        <Avatar 
          src={userProfile.avatarUrl} 
          alt="User Avatar" 
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        />
      )
    }
    
    return (
      <DefaultAvatar
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {userProfile?.fullName ? userProfile.fullName.charAt(0).toUpperCase() : '?'}
      </DefaultAvatar>
    )
  }

  const menuVariants = {
    hidden: { 
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.3,
        ease: "easeIn" 
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <>
      <Nav
        scrolled={scrolled}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ 
          duration: 0.6, 
          ease: [0.22, 1, 0.36, 1] 
        }}
      >
        <Logo 
          to="/" 
          scrolled={scrolled}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          Kairo
        </Logo>
        <NavLinks>
          <NavLink 
            to="/" 
            isActive={location.pathname === '/'} 
            scrolled={scrolled}
            isHome={isHome}
          >
            <FiHome />
            Accueil
          </NavLink>
          
          {isAuthenticated ? (
            <>
              <NavLink 
                to="/dashboard" 
                isActive={location.pathname === '/dashboard'} 
                scrolled={scrolled}
                isHome={isHome}
              >
                <FiUser />
                Dashboard
              </NavLink>
              <ProfileButton 
                to="/profile" 
                scrolled={scrolled}
                isHome={isHome}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {renderAvatar()}
                Profile
              </ProfileButton>
              <AuthButton 
                as="button" 
                logout 
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiLogOut />
                Logout
              </AuthButton>
            </>
          ) : (
            <>
              <AuthButton 
                to="/login"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiLogIn />
                Se connecter
              </AuthButton>
            </>
          )}
          
          <ThemeToggle />
        </NavLinks>
        <MobileMenuButton
          scrolled={scrolled}
          isOpen={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </Nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <MobileMenuItem 
              to="/" 
              isActive={location.pathname === '/'}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiHome style={{ marginRight: '10px' }} />
              Accueil
            </MobileMenuItem>
            
            {isAuthenticated ? (
              <>
                <MobileMenuItem 
                  to="/dashboard" 
                  isActive={location.pathname === '/dashboard'}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiUser style={{ marginRight: '10px' }} />
                  Dashboard
                </MobileMenuItem>
                <MobileMenuItem 
                  to="/profile" 
                  isActive={location.pathname === '/profile'}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {renderAvatar()}
                  Profile
                </MobileMenuItem>
                <LogoutButton 
                  onClick={handleLogout}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiLogOut />
                  Logout
                </LogoutButton>
              </>
            ) : (
              <>
                <MobileMenuItem 
                  to="/login" 
                  isActive={location.pathname === '/login'}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiLogIn style={{ marginRight: '10px' }} />
                  Se connecter
                </MobileMenuItem>
              </>
            )}
            
            <MobileMenuItem 
              to="/contact" 
              isActive={location.pathname === '/contact'}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiPhone style={{ marginRight: '10px' }} />
              Contact
            </MobileMenuItem>
            
            <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <ThemeToggle />
            </motion.div>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar 