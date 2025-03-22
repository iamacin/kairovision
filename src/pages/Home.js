// Home page with enhanced UI for Kairo Vision - Trigger new Netlify build
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiTrendingUp, FiUsers, FiGlobe, FiMapPin, FiArrowRight } from 'react-icons/fi'
import OptimizedImage from '../components/OptimizedImage'

const HomeContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.mode === 'dark' 
    ? theme?.colors?.backgroundDark || '#121212' 
    : theme?.colors?.backgroundAlt || '#f9f9ff'};
  color: ${({ theme }) => theme.mode === 'dark' ? '#f9f9ff' : 'inherit'};
`

const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  color: white;
  background: linear-gradient(125deg, 
    #2a2d64 0%,
    #4a115f 50%,
    #203060 100%
  );
  background-image: 
    linear-gradient(125deg, 
      #2a2d64 0%,
      #4a115f 50%,
      #203060 100%
    ),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%239C92AC' fill-opacity='0.06'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z'/%3E%3C/g%3E%3C/svg%3E");
  overflow: hidden;

  /* Tech pattern background */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z' fill='rgba(255,255,255,.05)' fill-rule='evenodd'/%3E%3C/svg%3E"),
      radial-gradient(circle at 20% 20%, rgba(41, 75, 196, 0.2) 0%, transparent 25%),
      radial-gradient(circle at 80% 80%, rgba(141, 41, 196, 0.2) 0%, transparent 25%),
      repeating-linear-gradient(
        to bottom,
        transparent 0px,
        transparent 2px,
        rgba(255, 255, 255, 0.02) 2px,
        rgba(255, 255, 255, 0.02) 4px
      ),
      repeating-linear-gradient(
        to right,
        transparent 0px,
        transparent 2px,
        rgba(255, 255, 255, 0.02) 2px,
        rgba(255, 255, 255, 0.02) 4px
      );
    pointer-events: none;
    z-index: 1;
    animation: patternMove 60s linear infinite;
  }

  /* Building silhouettes at the bottom */
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 180px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z' opacity='.15' fill='%23FFFFFF'/%3E%3Cpath d='M0 0v15.81c13 21.11 27.64 41.05 47.69 56.24C99.41 111.27 165 111 224.58 91.58c31.15-10.15 60.09-26.07 89.67-39.8 40.92-19 84.73-46 130.83-49.67 36.26-2.85 70.9 9.42 98.6 31.56 31.77 25.39 62.32 62 103.63 73 40.44 10.79 81.35-6.69 119.13-24.28s75.16-39 116.92-43.05c59.73-5.85 113.28 22.88 168.9 38.84 30.2 8.66 59 6.17 87.09-7.5 22.43-10.89 48-26.93 60.65-49.24V0z' opacity='.1' fill='%23FFFFFF'/%3E%3Cpath d='M0 0v5.63C149.93 59 314.09 71.32 475.83 42.57c43-7.64 84.23-20.12 127.61-26.46 59-8.63 112.48 12.24 165.56 35.4C827.93 77.22 886 95.24 951.2 90c86.53-7 172.46-45.71 248.8-84.81V0z' opacity='.05' fill='%23FFFFFF'/%3E%3C/svg%3E");
    background-size: cover;
    background-position: center;
    z-index: 2;
    opacity: 0.8;
  }

  @keyframes patternMove {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 100px 100px;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 70% 30%, 
      rgba(255, 255, 255, 0.15) 0%,
      rgba(0, 0, 0, 0.5) 100%
    );
    z-index: 1;
  }
`

const GlassCard = styled(motion.div)`
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1;
  opacity: 0.7;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  pointer-events: none;
  
  &.card1 {
    top: 15%;
    left: 10%;
    transform: rotate(-10deg);
    width: 180px;
    height: 180px;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2), transparent 70%);
      border-radius: inherit;
    }
  }
  
  &.card2 {
    bottom: 20%;
    right: 10%;
    transform: rotate(15deg);
    width: 220px;
    height: 140px;
    background: rgba(255, 255, 255, 0.07);

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), transparent 60%);
      border-radius: inherit;
    }
  }
  
  &.card3 {
    top: 60%;
    left: 15%;
    transform: rotate(10deg);
    width: 100px;
    height: 100px;
    background: rgba(255, 255, 255, 0.03);

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent 70%);
      border-radius: inherit;
    }
  }

  &.card4 {
    top: 25%;
    right: 20%;
    transform: rotate(-15deg);
    width: 130px;
    height: 90px;
    opacity: 0.5;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), transparent 70%);
      border-radius: inherit;
    }
  }

  &.card5 {
    bottom: 35%;
    left: 25%;
    transform: rotate(25deg);
    width: 80px;
    height: 120px;
    opacity: 0.4;
    background: rgba(255, 255, 255, 0.04);
  }
`

const FloatingElement = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  z-index: 1;
  pointer-events: none;

  &.dot1 {
    width: 15px;
    height: 15px;
    top: 20%;
    left: 30%;
  }

  &.dot2 {
    width: 20px;
    height: 20px;
    bottom: 15%;
    right: 25%;
    background: rgba(255, 255, 255, 0.15);
  }

  &.dot3 {
    width: 10px;
    height: 10px;
    top: 40%;
    right: 15%;
  }

  &.dot4 {
    width: 25px;
    height: 25px;
    bottom: 30%;
    left: 10%;
    background: rgba(255, 255, 255, 0.05);
  }

  &.line1 {
    width: 60px;
    height: 3px;
    top: 35%;
    left: 40%;
    border-radius: 3px;
    transform: rotate(45deg);
  }

  &.line2 {
    width: 40px;
    height: 2px;
    bottom: 40%;
    right: 30%;
    border-radius: 2px;
    transform: rotate(-30deg);
    background: rgba(255, 255, 255, 0.05);
  }
`

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 5;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: pulse 6s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% {
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
    50% {
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.1);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), transparent);
    border-radius: inherit;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    max-width: 90%;
  }
`

const MainTitle = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 800;
  line-height: 1.2;
  margin: 0;
  letter-spacing: -0.03em;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

  span {
    background: linear-gradient(to right, #ffffff, #e0e0ff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -5px;
      width: 100%;
      height: 3px;
      background: linear-gradient(to right, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3));
      border-radius: 3px;
      transform: scaleX(0);
      transform-origin: left;
      animation: lineReveal 1.5s 1s forwards;
    }
    
    @keyframes lineReveal {
      to {
        transform: scaleX(1);
      }
    }
  }

  @media (max-width: 768px) {
    font-size: clamp(1.8rem, 7vw, 2.5rem);
  }
`

const SubTitle = styled(motion.p)`
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  font-weight: 400;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  max-width: 700px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: clamp(0.9rem, 3vw, 1.1rem);
  }
`

const CTAContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;

  @media (max-width: 768px) {
    gap: 0.8rem;
  }
`

const buttonBase = `
  padding: 0.9rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  outline: none;
  border: none;
  letter-spacing: 0.02em;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    height: 50%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
    border-radius: inherit;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.6rem;
    font-size: 0.9rem;
  }
`

const GlossyButton = styled(motion(Link))`
  ${buttonBase}
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.3) 0%, 
    rgba(255, 255, 255, 0.05) 100%
  );
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  
  &:hover {
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.4) 0%, 
      rgba(255, 255, 255, 0.1) 100%
    );
    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.25), 0 0 10px rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  }
`

const SecondaryButton = styled(motion(Link))`
  ${buttonBase}
  background: rgba(0, 0, 0, 0.2);
  color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(5px);
  
  &:hover {
    background: rgba(0, 0, 0, 0.3);
    color: rgba(255, 255, 255, 1);
    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  }
`

const Section = styled.section`
  padding: 100px 5%;
  background: ${({ theme, alt }) => {
    if (theme.mode === 'dark') {
      return alt ? theme.colors.backgroundDarker || '#0a0a0a' : theme.colors.backgroundDark || '#121212';
    }
    return alt ? theme.colors.backgroundAlt || '#f5f5f7' : theme.colors.background || '#ffffff';
  }};
  color: ${({ theme }) => theme.mode === 'dark' ? '#f9f9ff' : 'inherit'};
  
  @media (max-width: 768px) {
    padding: 70px 5%;
  }
`

const SectionTitle = styled(motion.h2)`
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  display: inline-block;
  letter-spacing: -0.02em;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 80px;
    height: 4px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }
`

const SectionSubtitle = styled(motion.p)`
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2.5rem;
  max-width: 700px;
  line-height: 1.6;
`

const Grid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    gap: 25px;
    padding: 0;
  }
`

const Card = styled(motion.div)`
  padding: 2.5rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 24px;
  box-shadow: ${({ theme }) => theme.shadows?.medium || '0 4px 12px rgba(0, 0, 0, 0.05)'};
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  
  /* Glass morphism effect */
  backdrop-filter: blur(10px);
  border: 1px solid rgba(${({ theme }) => theme.colors.primaryRgb || '138, 43, 226'}, 0.05);
  
  /* Subtle gradient background */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(${({ theme }) => theme.colors.primaryRgb || '138, 43, 226'}, 0.03) 0%,
      transparent 50%,
      rgba(${({ theme }) => theme.colors.primaryRgb || '138, 43, 226'}, 0.01) 100%
    );
    z-index: 0;
  }
  
  /* Glossy shine effect */
  &::after {
    content: '';
    position: absolute;
    top: -100%;
    left: -100%;
    width: 300%;
    height: 300%;
    background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.05) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: rotate(30deg);
    z-index: 0;
    opacity: 0;
    transition: opacity 0.5s;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows?.large || '0 8px 30px rgba(0, 0, 0, 0.12)'};
    
    &::after {
      opacity: 1;
      animation: shineEffect 3s infinite linear;
    }
  }

  svg {
    width: 42px;
    height: 42px;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1.5rem;
    position: relative;
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    padding: 2rem;
    
    svg {
      width: 36px;
      height: 36px;
      margin-bottom: 1.25rem;
    }
  }
`

const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 1.05rem;
    margin-bottom: 0.75rem;
  }
`

const CardDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`

// Property Card Components
const PropertyGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
`

const PropertyCard = styled(motion.div)`
  background: ${({ theme }) => theme.mode === 'dark' 
    ? 'rgba(30, 30, 40, 0.6)' 
    : theme.colors.cardBg || '#ffffff'};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, ${({ theme }) => theme.mode === 'dark' ? 0.3 : 0.1});
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to bottom, 
      rgba(255, 255, 255, 0.05), 
      transparent
    );
    z-index: 2;
    pointer-events: none;
    border-radius: 16px 16px 0 0;
  }
`

const PropertyImage = styled.div`
  height: 220px;
  background-size: cover;
  background-position: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, 
      rgba(0, 0, 0, 0.1), 
      rgba(0, 0, 0, 0.3)
    );
    z-index: 1;
  }
`

const PropertyTag = styled(motion.span)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${({ type, theme }) => 
    type === 'vente' 
      ? 'rgba(52, 152, 219, 0.9)' 
      : 'rgba(155, 89, 182, 0.9)'
  };
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 2;
  backdrop-filter: blur(5px);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
`

const PropertyPrice = styled(motion.div)`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1.1rem;
  z-index: 2;
  backdrop-filter: blur(5px);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to bottom, 
      rgba(255, 255, 255, 0.2), 
      transparent
    );
    border-radius: 8px 8px 0 0;
    pointer-events: none;
  }
`

const PropertyContent = styled.div`
  padding: 1.5rem;
  position: relative;
`

const PropertyName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`

const PropertyLocation = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.8rem;
  
  svg {
    margin-right: 0.4rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`

const PropertyFeatures = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.2rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1rem;
  }
`

const ViewMoreButton = styled(motion(Link))`
  ${buttonBase}
  margin-top: 2.5rem;
  align-self: center;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  box-shadow: 0 5px 15px rgba(${({ theme }) => theme?.colors?.primaryRgb || '138, 43, 226'}, 0.3);
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    box-shadow: 0 7px 20px rgba(${({ theme }) => theme?.colors?.primaryRgb || '138, 43, 226'}, 0.4);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`

const PropertiesSection = styled(motion.section)`
  padding: 5rem 2rem;
  background: ${({ theme }) => theme.mode === 'dark' 
    ? theme.colors.backgroundDark || '#121212' 
    : theme.colors.background || '#ffffff'};
  color: ${({ theme }) => theme.mode === 'dark' ? '#f9f9ff' : 'inherit'};
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`

// CTA Section Components
const CTASection = styled.section`
  padding: 90px 5%;
  position: relative;
  color: white;
  text-align: center;
  overflow: hidden;
  isolation: isolate;
  
  /* Main Gradient Background */
  background: linear-gradient(135deg,
    #252e66 0%,
    #422863 50%,
    #292b77 100%
  );
  
  /* Create illuminated skyline effect */
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 300' preserveAspectRatio='none'%3E%3Cpath d='M0,250 L0,300 L1200,300 L1200,250 L1150,250 L1140,230 L1130,250 L1120,200 L1100,230 L1090,250 L1080,220 L1070,250 L1060,230 L1040,250 L1030,200 L1010,220 L1000,250 L990,230 L980,250 L970,200 L950,250 L940,230 L930,250 L900,200 L880,250 L870,230 L840,250 L830,200 L810,250 L800,230 L780,250 L770,200 L760,250 L750,230 L720,250 L700,200 L690,250 L680,230 L650,250 L640,200 L630,250 L610,230 L590,250 L570,200 L550,250 L540,230 L530,250 L520,200 L500,230 L480,250 L460,200 L450,250 L440,230 L430,250 L410,200 L390,250 L370,230 L350,250 L330,200 L320,250 L310,230 L300,250 L280,200 L270,230 L240,250 L220,230 L200,250 L180,200 L160,250 L150,230 L130,250 L120,200 L100,250 L80,200 L60,250 L50,200 L20,250 L0,250 Z' fill='rgba(255,255,255,0.05)'/%3E%3C/svg%3E");
    background-size: cover;
    background-position: bottom;
    opacity: 0.7;
    z-index: -1;
  }
  
  /* Add floating particles */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 0%, transparent 10%),
      radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.2) 0%, transparent 10%),
      radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 15%);
    z-index: -1;
    opacity: 0.6;
    animation: pulse 15s infinite alternate ease-in-out;
  }
  
  @keyframes pulse {
    0% { opacity: 0.3; }
    50% { opacity: 0.6; }
    100% { opacity: 0.3; }
  }
`

const CTAContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(6px);
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.1),
    0 1px 1px rgba(255, 255, 255, 0.1) inset;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const CTATitle = styled.h2`
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, #ffffff, #e0e0ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    font-size: clamp(1.5rem, 6vw, 2rem);
  }
`

const CTADescription = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: clamp(0.9rem, 4vw, 1.1rem);
  }
`

const CTAButton = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #4e54c8, #8f94fb);
  color: white;
  font-weight: 600;
  padding: 0.8rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent);
    z-index: 1;
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(5px);
  }
  
  @media (max-width: 768px) {
    padding: 0.7rem 2rem;
  }
`

// Section "Pourquoi Nous Choisir"
const FeaturesSection = styled(motion.section)`
  padding: 5rem 2rem;
  background: ${({ theme }) => theme.mode === 'dark' 
    ? theme.colors.backgroundDarker || '#0a0a0a' 
    : theme.colors.bgSecondary || '#f8f9fa'};
  color: ${({ theme }) => theme.mode === 'dark' ? '#f9f9ff' : 'inherit'};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: ${({ theme }) => theme.mode === 'dark' ? 0.2 : 0.4};
    z-index: 0;
  }
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`

const FeaturesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

const FeatureCard = styled(motion.div)`
  background: ${({ theme }) => theme.mode === 'dark' 
    ? 'rgba(30, 30, 40, 0.6)' 
    : theme.colors.cardBg || '#ffffff'};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, ${({ theme }) => theme.mode === 'dark' ? 0.3 : 0.08});
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(to right, 
      ${({ theme }) => theme.colors.primary}, 
      ${({ theme }) => theme.colors.primaryLight || '#b388ff'}
    );
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, 
      rgba(255, 255, 255, 0.1), 
      transparent
    );
    pointer-events: none;
  }
`

const FeatureIcon = styled(motion.div)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme }) => `rgba(${theme?.colors?.primaryRgb || '138, 43, 226'}, 0.1)`};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.8rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => `rgba(${theme?.colors?.primaryRgb || '138, 43, 226'}, 0.3)`};
    opacity: 0.7;
    animation: pulse-border 2s infinite;
  }
  
  @keyframes pulse-border {
    0% {
      transform: scale(1);
      opacity: 0.7;
    }
    70% {
      transform: scale(1.2);
      opacity: 0;
    }
    100% {
      transform: scale(1.2);
      opacity: 0;
    }
  }
`

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
`

const FeatureDescription = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`

// Section Témoignages
const TestimonialsSection = styled(motion.section)`
  padding: 5rem 2rem;
  background: ${({ theme }) => theme.mode === 'dark' 
    ? theme.colors.backgroundDark || '#121212' 
    : theme.colors.background || '#ffffff'};
  color: ${({ theme }) => theme.mode === 'dark' ? '#f9f9ff' : 'inherit'};
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`

const TestimonialsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

const TestimonialCard = styled(motion.div)`
  background: ${({ theme }) => theme.mode === 'dark' 
    ? 'rgba(30, 30, 40, 0.6)' 
    : theme.colors.cardBg || '#ffffff'};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, ${({ theme }) => theme.mode === 'dark' ? 0.3 : 0.08});
  position: relative;
  
  &::before {
    content: '"';
    position: absolute;
    top: 1rem;
    right: 2rem;
    font-size: 4rem;
    line-height: 1;
    font-family: serif;
    color: ${({ theme }) => `rgba(${theme?.colors?.primaryRgb || '138, 43, 226'}, 0.1)`};
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, 
      rgba(255, 255, 255, 0.05), 
      transparent
    );
    border-radius: inherit;
    pointer-events: none;
  }
`

const TestimonialContent = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
`

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const AuthorAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid ${({ theme }) => theme.colors.primary};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const AuthorName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`

const AuthorTitle = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`

const Home = () => {
  // État pour les propriétés en vedette
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: "Villa de luxe avec vue sur mer",
      location: "Ngor, Dakar",
      price: "250,000,000",
      type: "vente",
      bedrooms: 4,
      bathrooms: 3,
      area: 320,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Appartement moderne au centre-ville",
      location: "Plateau, Dakar",
      price: "95,000,000",
      type: "vente",
      bedrooms: 3,
      bathrooms: 2,
      area: 150,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Maison familiale avec jardin",
      location: "Almadies, Dakar",
      price: "650,000 / mois",
      type: "location",
      bedrooms: 5,
      bathrooms: 3,
      area: 280,
      image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    }
  ]);

  // État pour le thème (à intégrer si vous utilisez le thème)
  const [isOffline, setIsOffline] = useState(false);

  // Vérification de la connexion internet
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOffline(!navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  // Afficher un message si l'utilisateur est hors ligne
  if (isOffline) {
    return (
      <div className="offline-message">
        <h2>Vous êtes actuellement hors ligne</h2>
        <p>Veuillez vérifier votre connexion internet pour accéder à toutes les fonctionnalités de Kairo Vision.</p>
      </div>
    );
  }

  return (
    <HomeContainer>
      <HeroSection>
        <GlassCard 
          className="card1"
          animate={{ 
            y: [0, -20, 0],
            rotate: [-10, -5, -10],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut"
          }}
        />
        <GlassCard 
          className="card2"
          animate={{ 
            y: [0, 15, 0],
            rotate: [15, 10, 15],
            x: [0, 10, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 10,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <GlassCard 
          className="card3"
          animate={{ 
            y: [0, 10, 0],
            rotate: [10, 15, 10],
            scale: [1, 0.95, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 7,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <GlassCard 
          className="card4"
          animate={{ 
            y: [0, -15, 0],
            rotate: [-15, -20, -15],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 9,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
        <GlassCard 
          className="card5"
          animate={{ 
            y: [0, 12, 0],
            rotate: [25, 20, 25],
            x: [0, -10, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 11,
            ease: "easeInOut",
            delay: 2.5
          }}
        />
        <FloatingElement
          className="dot1"
          animate={{
            y: [0, -30, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut"
          }}
        />
        <FloatingElement
          className="dot2"
          animate={{
            y: [0, 20, 0],
            x: [0, 15, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            repeat: Infinity,
            duration: 7,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <FloatingElement
          className="dot3"
          animate={{
            y: [0, -15, 0],
            x: [0, -10, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <FloatingElement
          className="dot4"
          animate={{
            y: [0, 25, 0],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
        <FloatingElement
          className="line1"
          animate={{
            y: [0, -20, 0],
            rotate: [45, 55, 45],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            repeat: Infinity,
            duration: 9,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <FloatingElement
          className="line2"
          animate={{
            y: [0, 15, 0],
            rotate: [-30, -40, -30],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <HeroContent>
          <MainTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span>L'Immobilier Intelligent</span> au Sénégal
          </MainTitle>
          <SubTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Découvrez une nouvelle façon d'acheter, vendre ou louer votre bien immobilier. 
            Kairo révolutionne l'expérience immobilière avec des outils innovants et une approche centrée sur vos besoins.
          </SubTitle>
          <CTAContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <GlossyButton 
              to="/login"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Se connecter
            </GlossyButton>
            <SecondaryButton 
              to="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Nous Contacter
            </SecondaryButton>
          </CTAContainer>
        </HeroContent>
      </HeroSection>

      <PropertiesSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Propriétés à Découvrir
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Explorez notre sélection de propriétés exclusives à travers le Sénégal. Des appartements aux villas, trouvez le bien immobilier qui correspond à vos attentes.
          </SectionSubtitle>
          
          <PropertyGrid
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {properties.map((property, index) => (
              <PropertyCard
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                whileHover={{ 
                  y: -10,
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)'
                }}
              >
                <PropertyImage style={{ backgroundImage: `url(${property.image})` }}>
                  <PropertyTag
                    type={property.type.toLowerCase()}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {property.type}
                  </PropertyTag>
                  <PropertyPrice
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {property.price} CFA
                  </PropertyPrice>
                </PropertyImage>
                <PropertyContent>
                  <PropertyName>{property.name}</PropertyName>
                  <PropertyLocation>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                    </svg>
                    {property.location}
                  </PropertyLocation>
                  <PropertyFeatures>
                    <Feature>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 7V3H7V7H3V21H21V7H17ZM9 5H15V7H9V5ZM19 19H5V9H19V19Z" fill="currentColor"/>
                        <path d="M12 10H10V18H12V10Z" fill="currentColor"/>
                        <path d="M15 13H13V18H15V13Z" fill="currentColor"/>
                        <path d="M9 15H7V18H9V15Z" fill="currentColor"/>
                      </svg>
                      {property.bedrooms} Ch.
                    </Feature>
                    <Feature>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 10.78V8C21 6.9 20.1 6 19 6H15V4C15 2.9 14.1 2 13 2H11C9.9 2 9 2.9 9 4V6H5C3.9 6 3 6.9 3 8V10.78C2.39 11.33 2 12.12 2 13V19C2 19.55 2.45 20 3 20H4C4.55 20 5 19.55 5 19V18H19V19C19 19.55 19.45 20 20 20H21C21.55 20 22 19.55 22 19V13C22 12.12 21.61 11.33 21 10.78ZM11 4H13V6H11V4ZM19 8V10H5V8H19ZM5 16V13H19V16H5Z" fill="currentColor"/>
                      </svg>
                      {property.bathrooms} SdB
                    </Feature>
                    <Feature>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                        <path d="M12.5 7H11V13L16.2 16.2L17 14.9L12.5 12.2V7Z" fill="currentColor"/>
                      </svg>
                      {property.area} m²
                    </Feature>
                  </PropertyFeatures>
                </PropertyContent>
              </PropertyCard>
            ))}
          </PropertyGrid>
          
          <ViewMoreButton 
            to="/properties"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Voir Plus de Propriétés
          </ViewMoreButton>
        </div>
      </PropertiesSection>

      <FeaturesSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Pourquoi Nous Choisir
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Kairo Vision se distingue par son approche innovante et sa détermination à révolutionner le marché immobilier sénégalais.
          </SectionSubtitle>
          
          <FeaturesGrid
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            <FeatureCard
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.12)' }}
            >
              <FeatureIcon
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.3 }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 10.25V20H21V10.25L12 3L3 10.25Z" fill="currentColor"/>
                  <path d="M9 14H15V20H9V14Z" fill="white"/>
                </svg>
              </FeatureIcon>
              <FeatureTitle>Propriétés Exclusives</FeatureTitle>
              <FeatureDescription>
                Accédez à un catalogue de biens immobiliers exclusifs et soigneusement sélectionnés, introuvables ailleurs sur le marché.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.12)' }}
            >
              <FeatureIcon
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.4 }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                  <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="currentColor"/>
                </svg>
              </FeatureIcon>
              <FeatureTitle>Technologie Avancée</FeatureTitle>
              <FeatureDescription>
                Notre plateforme utilise les dernières technologies pour vous offrir une expérience utilisateur fluide et intuitive, facilitant votre recherche immobilière.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.12)' }}
            >
              <FeatureIcon
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.5 }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z" fill="currentColor"/>
                </svg>
              </FeatureIcon>
              <FeatureTitle>Conseils Personnalisés</FeatureTitle>
              <FeatureDescription>
                Bénéficiez de l'expertise de nos conseillers immobiliers qui vous accompagnent à chaque étape de votre projet, de la recherche à la conclusion de la transaction.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </div>
      </FeaturesSection>
      
      <TestimonialsSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Ce Que Disent Nos Clients
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Découvrez les témoignages de ceux qui ont fait confiance à Kairo Vision pour concrétiser leur projet immobilier.
          </SectionSubtitle>
          
          <TestimonialsGrid
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            <TestimonialCard
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
            >
              <TestimonialContent>
                Grâce à Kairo Vision, j'ai trouvé l'appartement de mes rêves en moins de deux semaines. L'interface est intuitive et les conseillers sont très réactifs !
              </TestimonialContent>
              <TestimonialAuthor>
                <AuthorAvatar>
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sophie M." />
                </AuthorAvatar>
                <AuthorInfo>
                  <AuthorName>Sophie M.</AuthorName>
                  <AuthorTitle>Propriétaire à Dakar</AuthorTitle>
                </AuthorInfo>
              </TestimonialAuthor>
            </TestimonialCard>
            
            <TestimonialCard
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
            >
              <TestimonialContent>
                La qualité des biens proposés est exceptionnelle. J'ai investi dans une villa à Saly et le processus a été d'une simplicité remarquable. Je recommande vivement !
              </TestimonialContent>
              <TestimonialAuthor>
                <AuthorAvatar>
                  <img src="https://randomuser.me/api/portraits/men/86.jpg" alt="Amadou D." />
                </AuthorAvatar>
                <AuthorInfo>
                  <AuthorName>Amadou D.</AuthorName>
                  <AuthorTitle>Investisseur immobilier</AuthorTitle>
                </AuthorInfo>
              </TestimonialAuthor>
            </TestimonialCard>
            
            <TestimonialCard
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
            >
              <TestimonialContent>
                Un service client exceptionnel ! Les conseillers de Kairo Vision m'ont aidé à trouver le parfait local commercial pour mon entreprise. Professionnalisme et efficacité.
              </TestimonialContent>
              <TestimonialAuthor>
                <AuthorAvatar>
                  <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Fatou N." />
                </AuthorAvatar>
                <AuthorInfo>
                  <AuthorName>Fatou N.</AuthorName>
                  <AuthorTitle>Entrepreneure</AuthorTitle>
                </AuthorInfo>
              </TestimonialAuthor>
            </TestimonialCard>
          </TestimonialsGrid>
        </div>
      </TestimonialsSection>

      {/* Call-to-Action Section */}
      <CTASection>
        <CTAContent>
          <CTATitle>Prêt à révolutionner votre expérience immobilière ?</CTATitle>
          <CTADescription>
            Rejoignez la liste d'attente dès maintenant pour être parmi les premiers à découvrir Kairo Vision.
          </CTADescription>
          <CTAButton 
            to="/login"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Se connecter <FiArrowRight />
          </CTAButton>
        </CTAContent>
      </CTASection>
    </HomeContainer>
  )
}

export default Home 