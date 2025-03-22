// Home page with enhanced UI for Kairo Vision - More modern and glossy design
import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiTrendingUp, FiUsers, FiGlobe, FiMapPin, FiArrowRight, FiCheck } from 'react-icons/fi'
import OptimizedImage from '../components/OptimizedImage'

const HomeContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme?.colors?.backgroundAlt || '#f9f9ff'};
  overflow-x: hidden;
`

const HeroSection = styled.section`
  position: relative;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  color: white;
  
  /* Modern gradient background with tech feel */
  background: linear-gradient(135deg, 
    rgba(${({ theme }) => theme?.colors?.primaryRgb || '138, 43, 226'}, 0.95) 0%,
    rgba(${({ theme }) => theme?.colors?.primaryDark || '#6a1cb7'}, 0.98) 100%
  );
  
  /* Add multiple layers for more depth and tech feel */
  background-image: 
    linear-gradient(135deg, 
      rgba(${({ theme }) => theme?.colors?.primaryRgb || '138, 43, 226'}, 0.95) 0%,
      rgba(${({ theme }) => theme?.colors?.primaryDark || '#6a1cb7'}, 0.98) 100%
    ),
    /* Add subtle grid pattern for tech feel */
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
    ),
    radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 70% 30%, 
      rgba(255, 255, 255, 0.15) 0%,
      rgba(0, 0, 0, 0.4) 100%
    );
    z-index: 1;
  }
  
  /* Glossy shine effect */
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
      rgba(255, 255, 255, 0.02) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: rotate(30deg);
    z-index: 1;
    animation: shineEffect 8s infinite linear;
  }
  
  @keyframes shineEffect {
    0% {
      transform: translateX(-50%) rotate(30deg);
    }
    100% {
      transform: translateX(50%) rotate(30deg);
    }
  }
`

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const MainTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 4.5vw, 4rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`

const SubTitle = styled(motion.p)`
  font-size: clamp(1.1rem, 1.3vw, 1.3rem);
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`

const PrimaryButton = styled(motion(Link))`
  padding: 1.1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-align: center;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary} 0%, 
    ${({ theme }) => theme.colors.primaryDark} 100%
  );
  
  /* Glossy effect */
  background-image: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary} 0%, 
    ${({ theme }) => theme.colors.primaryDark} 100%
  ), linear-gradient(
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0) 50%,
    rgba(0, 0, 0, 0.1) 100%
  );
  
  color: white;
  border: none;
  box-shadow: 0 4px 15px rgba(${({ theme }) => theme.colors.primaryRgb}, 0.3);
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(${({ theme }) => theme.colors.primaryRgb}, 0.4);
    filter: brightness(1.05);
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
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  /* Subtle glass morphism */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
`

const CTAContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const Section = styled.section`
  padding: 100px 5%;
  background: ${({ theme, alt }) => alt ? theme.colors.backgroundAlt : theme.colors.background};
  position: relative;
  overflow: hidden;
  
  /* Add subtle tech pattern background for non-hero sections */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: ${({ theme, alt }) => alt ? 
      `radial-gradient(circle at 20% 20%, rgba(${theme.colors.primaryRgb}, 0.03) 0%, transparent 25%),
       radial-gradient(circle at 80% 80%, rgba(${theme.colors.primaryRgb}, 0.03) 0%, transparent 25%)` : 
      'none'};
    pointer-events: none;
    z-index: 0;
  }
  
  @media (max-width: 768px) {
    padding: 70px 5%;
  }
`

const SectionTitle = styled.h2`
  font-size: clamp(1.8rem, 2.5vw, 2.5rem);
  font-weight: 700;
  margin-bottom: 1.2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    margin-bottom: 0.8rem;
  }
`

const SectionSubtitle = styled.p`
  font-size: clamp(1rem, 1.1vw, 1.15rem);
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
  line-height: 1.7;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    margin: 0 auto 2.5rem;
    font-size: 0.95rem;
  }
`

const Grid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  padding: 0 20px;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    gap: 25px;
    padding: 0;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`

const Card = styled(motion.div)`
  padding: 2.5rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.shadows?.medium || '0 4px 12px rgba(0, 0, 0, 0.05)'};
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  
  /* Glass morphism effect */
  backdrop-filter: blur(10px);
  border: 1px solid rgba(${({ theme }) => theme.colors.primaryRgb}, 0.1);

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows?.large || '0 8px 30px rgba(0, 0, 0, 0.12)'};
  }
  
  /* Subtle gradient highlight on hover */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, 
      rgba(${({ theme }) => theme.colors.primaryRgb}, 0.05) 0%,
      transparent 50%,
      transparent 100%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }

  svg {
    width: 42px;
    height: 42px;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 768px) {
    padding: 1.8rem;
    
    svg {
      width: 36px;
      height: 36px;
      margin-bottom: 1.2rem;
    }
  }
`

const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
  }
`

const CardDescription = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`

// Property Card Components
const PropertyGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 25px;
  padding: 0 20px;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 18px;
    padding: 0;
  }
`

const PropertyCard = styled(motion.div)`
  border-radius: 14px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows?.medium || '0 4px 12px rgba(0, 0, 0, 0.05)'};
  transition: all 0.3s ease;
  position: relative;
  
  /* Glass morphism effect */
  backdrop-filter: blur(10px);
  border: 1px solid rgba(${({ theme }) => theme.colors.primaryRgb}, 0.08);
  
  &:hover {
    transform: translateY(-8px);
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`

const PropertyPrice = styled.span`
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  z-index: 2;
  backdrop-filter: blur(4px);
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
  gap: 5px;
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
  
  /* Tech pattern overlay */
  &::before {
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
  }
  
  /* Glossy effect */
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
      rgba(255, 255, 255, 0.02) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: rotate(30deg);
    z-index: 1;
    animation: shineEffect 8s infinite linear;
  }
`

const CTATitle = styled.h2`
  font-size: clamp(1.8rem, 2.5vw, 2.5rem);
  font-weight: 700;
  margin-bottom: 1.2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 2;
`

const CTADescription = styled.p`
  font-size: clamp(1rem, 1.1vw, 1.15rem);
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.7;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
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
  z-index: 2;
  
  /* Glass effect */
  backdrop-filter: blur(5px);

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
        <HeroContent>
          <MainTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            L'Immobilier Intelligent au Sénégal
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
            <PrimaryButton 
              to="/waitlist"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Rejoindre Kairo <FiArrowRight />
            </PrimaryButton>
            <SecondaryButton 
              to="/contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Nous Contacter
            </SecondaryButton>
          </CTAContainer>
        </HeroContent>
      </HeroSection>

      {/* Property Listings Section moved directly below hero section */}
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
      </CTASection>
    </HomeContainer>
  )
}

export default Home 