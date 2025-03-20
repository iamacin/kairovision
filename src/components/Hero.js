import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import secureClient from '../utils/supabase'

const HeroSection = styled.section`
  position: relative;
  height: 80vh;
  min-height: 600px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.3)
    );
  }
`

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
  padding: 0 2rem;
  max-width: 800px;
`

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const Hero = () => {
  const [heroImage, setHeroImage] = useState(null)

  useEffect(() => {
    fetchHeroImage()
  }, [])

  const fetchHeroImage = async () => {
    try {
      const response = await secureClient.fetchHeroImage();
      
      if (response.success && response.data) {
        setHeroImage(response.data);
      }
    } catch (error) {
      console.error('Error fetching hero image:', error.message);
    }
  }

  return (
    <HeroSection>
      <HeroBackground image={heroImage} />
      <HeroContent>
        <Title>Discover Your Dream Home in Senegal</Title>
        <Subtitle>
          Find the perfect property with our verified listings and trusted agents
        </Subtitle>
      </HeroContent>
    </HeroSection>
  )
}

export default Hero 