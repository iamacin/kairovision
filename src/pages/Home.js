// Home page with enhanced UI for Kairo Vision - Trigger new Netlify build
import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiTrendingUp, FiUsers, FiGlobe, FiMapPin, FiArrowRight } from 'react-icons/fi'
import OptimizedImage from '../components/OptimizedImage'

const HomeContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme?.colors?.backgroundAlt || '#f9f9ff'};
`

const HeroSection = styled.section`
  position: relative;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  color: white;
  background: linear-gradient(135deg, 
    rgba(${({ theme }) => theme?.colors?.primaryRgb || '138, 43, 226'}, 0.95) 0%,
    rgba(${({ theme }) => theme?.colors?.primaryDark || '#6a1cb7'}, 0.98) 100%
  );
  background-image: 
    linear-gradient(135deg, 
      rgba(${({ theme }) => theme?.colors?.primaryRgb || '138, 43, 226'}, 0.95) 0%,
      rgba(${({ theme }) => theme?.colors?.primaryDark || '#6a1cb7'}, 0.98) 100%
    ),
    radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
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
      repeating-linear-gradient(
        rgba(255, 255, 255, 0.03) 0px,
        rgba(255, 255, 255, 0.03) 1px,
        transparent 1px,
        transparent 20px
      ),
      repeating-linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.03) 0px,
        rgba(255, 255, 255, 0.03) 1px,
        transparent 1px,
        transparent 20px
      );
    pointer-events: none;
    z-index: 1;
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
  }
  
  &.card2 {
    bottom: 20%;
    right: 10%;
    transform: rotate(15deg);
  }
  
  &.card3 {
    top: 60%;
    left: 15%;
    transform: rotate(10deg);
    width: 100px;
    height: 100px;
  }
`

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`

const MainTitle = styled(motion.h1)`
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  
  span {
    background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0.8));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`

const SubTitle = styled(motion.p)`
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-bottom: 2rem;
  }
`

const GlossyButton = styled(motion(Link))`
  position: relative;
  padding: 1.1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary} 0%, 
    ${({ theme }) => theme.colors.primaryDark} 100%
  );
  color: white;
  border: none;
  box-shadow: 0 4px 15px rgba(${({ theme }) => theme.colors.primaryRgb}, 0.3);
  transition: all 0.3s ease;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0) 50%,
      rgba(0, 0, 0, 0.1) 100%
    );
    pointer-events: none;
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
      rgba(255, 255, 255, 0.08) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: rotate(30deg);
    animation: shineEffect 8s infinite linear;
  }
  
  @keyframes shineEffect {
    0% {
      transform: translateX(-100%) rotate(30deg);
    }
    100% {
      transform: translateX(100%) rotate(30deg);
    }
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(${({ theme }) => theme.colors.primaryRgb}, 0.4);
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
`

const SecondaryButton = styled(motion(Link))`
  padding: 1.1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.1) 20%,
      rgba(255, 255, 255, 0) 40%
    );
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
    
    &::after {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
`

const CTAContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const Section = styled.section`
  padding: 100px 5%;
  background: ${({ theme, alt }) => alt ? theme.colors.backgroundAlt : theme.colors.background};
  
  @media (max-width: 768px) {
    padding: 70px 5%;
  }
`

const SectionTitle = styled.h2`
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 700;
  margin-bottom: 1.25rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`

const SectionSubtitle = styled.p`
  font-size: clamp(1rem, 1.25vw, 1.1rem);
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3.5rem;
  line-height: 1.7;
  
  @media (max-width: 768px) {
    margin: 0 auto 2.5rem;
  }
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
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 1.15rem;
    margin-bottom: 0.75rem;
  }
`

const CardDescription = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`

// Property Card Components
const PropertyGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
    padding: 0;
  }
`

const PropertyCard = styled(motion.div)`
  border-radius: 16px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows?.medium || '0 4px 12px rgba(0, 0, 0, 0.05)'};
  transition: all 0.3s ease;
  position: relative;
  
  /* Glass morphism effect */
  backdrop-filter: blur(10px);
  border: 1px solid rgba(${({ theme }) => theme.colors.primaryRgb || '138, 43, 226'}, 0.05);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.shadows?.large || '0 8px 30px rgba(0, 0, 0, 0.12)'};
  }
`

const PropertyImage = styled.div`
  height: 180px;
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${PropertyCard}:hover & img {
    transform: scale(1.1);
  }
`

const PropertyTag = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  z-index: 2;
  box-shadow: 0 2px 10px rgba(${({ theme }) => theme.colors.primaryRgb}, 0.3);
`

const PropertyPrice = styled.span`
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  z-index: 2;
  backdrop-filter: blur(5px);
`

const PropertyContent = styled.div`
  padding: 16px;
`

const PropertyTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

const PropertyLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.85rem;
  margin-bottom: 10px;
  
  svg {
    font-size: 0.95rem;
  }
`

const PropertyDetails = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 10px;
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.85rem;
`

const PropertyDetail = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`

// CTA Section Components
const CTASection = styled.section`
  padding: 70px 5%;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary} 0%, 
    ${({ theme }) => theme.colors.primaryDark} 100%
  );
  text-align: center;
  color: white;
  position: relative;
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
      repeating-linear-gradient(
        rgba(255, 255, 255, 0.03) 0px,
        rgba(255, 255, 255, 0.03) 1px,
        transparent 1px,
        transparent 20px
      ),
      repeating-linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.03) 0px,
        rgba(255, 255, 255, 0.03) 1px,
        transparent 1px,
        transparent 20px
      );
    pointer-events: none;
    z-index: 1;
  }
`

const CTAContent = styled.div`
  position: relative;
  z-index: 2;
`

const CTATitle = styled.h2`
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 700;
  margin-bottom: 1.25rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`

const CTADescription = styled.p`
  font-size: clamp(1rem, 1.25vw, 1.1rem);
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.7;
`

const CTAButton = styled(motion(Link))`
  padding: 1.1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-align: center;
  background: white;
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 255, 255, 0) 60%,
      rgba(0, 0, 0, 0.05) 100%
    );
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
`

const Home = () => {
  // Sample property data
  const properties = [
    {
      id: 1,
      title: 'Appartement Moderne',
      location: 'Dakar, Almadies',
      price: '120 000 000 FCFA',
      tag: 'À Vendre',
      image: 'https://placehold.co/600x400/7030a0/FFFFFF/png?text=Appartement+Moderne',
      beds: 3,
      baths: 2,
      area: '120m²'
    },
    {
      id: 2,
      title: 'Villa avec Vue',
      location: 'Saly, Mbour',
      price: '75 000 FCFA/mois',
      tag: 'À Louer',
      image: 'https://placehold.co/600x400/7030a0/FFFFFF/png?text=Villa+avec+Vue',
      beds: 4,
      baths: 3,
      area: '200m²'
    },
    {
      id: 3,
      title: 'Bureau Commercial',
      location: 'Dakar, Plateau',
      price: '250 000 FCFA/mois',
      tag: 'À Louer',
      image: 'https://placehold.co/600x400/7030a0/FFFFFF/png?text=Bureau+Commercial',
      beds: 0,
      baths: 1,
      area: '80m²'
    },
    {
      id: 4,
      title: 'Terrain à Bâtir',
      location: 'Diamniadio',
      price: '45 000 000 FCFA',
      tag: 'À Vendre',
      image: 'https://placehold.co/600x400/7030a0/FFFFFF/png?text=Terrain+à+Bâtir',
      beds: 0,
      baths: 0,
      area: '500m²'
    }
  ];

  return (
    <HomeContainer>
      <HeroSection>
        <GlassCard 
          className="card1"
          animate={{ 
            y: [0, -15, 0],
            rotate: [-10, -5, -10]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 5,
            ease: "easeInOut"
          }}
        />
        <GlassCard 
          className="card2"
          animate={{ 
            y: [0, 15, 0],
            rotate: [15, 10, 15]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 6,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <GlassCard 
          className="card3"
          animate={{ 
            y: [0, 10, 0],
            rotate: [10, 15, 10]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 7,
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
              to="/waitlist"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Rejoindre Kairo
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

      {/* Property Listings Section - Moved directly under the hero */}
      <Section alt>
        <SectionTitle>Découvrez nos Biens Immobiliers</SectionTitle>
        <SectionSubtitle>
          Une sélection de propriétés exclusives à travers le Sénégal pour tous vos projets.
        </SectionSubtitle>
        <PropertyGrid>
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <PropertyImage>
                <img src={property.image} alt={property.title} />
                <PropertyTag>{property.tag}</PropertyTag>
                <PropertyPrice>{property.price}</PropertyPrice>
              </PropertyImage>
              <PropertyContent>
                <PropertyTitle>{property.title}</PropertyTitle>
                <PropertyLocation>
                  <FiMapPin />
                  {property.location}
                </PropertyLocation>
                <PropertyDetails>
                  <PropertyDetail>{property.beds} Chambres</PropertyDetail>
                  <PropertyDetail>{property.baths} SDB</PropertyDetail>
                  <PropertyDetail>{property.area}</PropertyDetail>
                </PropertyDetails>
              </PropertyContent>
            </PropertyCard>
          ))}
        </PropertyGrid>
      </Section>

      <Section>
        <SectionTitle>Pourquoi choisir Kairo ?</SectionTitle>
        <SectionSubtitle>
          Une plateforme conçue pour simplifier vos projets immobiliers et vous offrir une expérience unique.
        </SectionSubtitle>
        <Grid>
          <Card
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <FiTrendingUp />
            <CardTitle>Simplicité & Efficacité</CardTitle>
            <CardDescription>
              Une interface intuitive et des outils modernes pour trouver rapidement ce que vous cherchez.
            </CardDescription>
          </Card>
          <Card
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FiUsers />
            <CardTitle>Accompagnement Personnalisé</CardTitle>
            <CardDescription>
              Une équipe d'experts à votre écoute pour vous guider dans votre projet immobilier.
            </CardDescription>
          </Card>
          <Card
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <FiGlobe />
            <CardTitle>Accessibilité Totale</CardTitle>
            <CardDescription>
              Accédez à notre plateforme 24/7 et gérez vos projets immobiliers où que vous soyez.
            </CardDescription>
          </Card>
        </Grid>
      </Section>

      {/* Call-to-Action Section */}
      <CTASection>
        <CTAContent>
          <CTATitle>Prêt à révolutionner votre expérience immobilière ?</CTATitle>
          <CTADescription>
            Rejoignez la liste d'attente dès maintenant pour être parmi les premiers à découvrir Kairo Vision.
          </CTADescription>
          <CTAButton 
            to="/waitlist"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Rejoindre Kairo <FiArrowRight />
          </CTAButton>
        </CTAContent>
      </CTASection>
    </HomeContainer>
  )
}

export default Home 