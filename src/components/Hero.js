import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { supabase } from '../utils/supabase'
import { motion } from 'framer-motion'

const HeroSection = styled.section`
  position: relative;
  height: 90vh;
  min-height: 700px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
`

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.6) 50%,
      rgba(0, 0, 0, 0.4) 100%
    );
  }
`

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 1;
  color: white;
  padding: 0 8%;
  max-width: 800px;
`

const Title = styled(motion.h1)`
  font-size: 4rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Inter', sans-serif;

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const CTAContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease;
  font-family: 'Inter', sans-serif;
  
  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  border: none;
  box-shadow: 0 4px 6px rgba(99, 102, 241, 0.25);

  &:hover {
    box-shadow: 0 6px 8px rgba(99, 102, 241, 0.3);
  }
`

const SecondaryButton = styled(Button)`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`

const StatsContainer = styled(motion.div)`
  display: flex;
  gap: 3rem;
  margin-top: 4rem;

  @media (max-width: 768px) {
    gap: 2rem;
    flex-wrap: wrap;
  }
`

const StatItem = styled(motion.div)`
  text-align: left;
`

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
  font-family: 'Inter', sans-serif;
`

const StatLabel = styled.div`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
`

const Hero = () => {
  const [heroImage, setHeroImage] = useState(null)

  useEffect(() => {
    fetchHeroImage()
  }, [])

  const fetchHeroImage = async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('hero_image')
        .single()

      if (error) throw error
      if (data?.hero_image) {
        setHeroImage(data.hero_image)
      }
    } catch (error) {
      console.error('Error fetching hero image:', error.message)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  }

  return (
    <HeroSection>
      <HeroBackground image={heroImage} />
      <HeroContent
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Title variants={itemVariants}>
          Transforming Real Estate in Senegal
        </Title>
        <Subtitle variants={itemVariants}>
          Experience the future of property transactions with our tech-driven platform. 
          Find, verify, and secure your dream property with confidence.
        </Subtitle>
        
        <CTAContainer variants={itemVariants}>
          <PrimaryButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Properties
          </PrimaryButton>
          <SecondaryButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            List Your Property
          </SecondaryButton>
        </CTAContainer>

        <StatsContainer variants={containerVariants}>
          <StatItem variants={itemVariants}>
            <StatNumber>500+</StatNumber>
            <StatLabel>Verified Properties</StatLabel>
          </StatItem>
          <StatItem variants={itemVariants}>
            <StatNumber>98%</StatNumber>
            <StatLabel>Success Rate</StatLabel>
          </StatItem>
          <StatItem variants={itemVariants}>
            <StatNumber>24/7</StatNumber>
            <StatLabel>Expert Support</StatLabel>
          </StatItem>
        </StatsContainer>
      </HeroContent>
    </HeroSection>
  )
}

export default Hero 