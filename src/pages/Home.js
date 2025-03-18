import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiSearch, FiShield, FiTrendingUp, FiUsers, FiClock, FiGlobe } from 'react-icons/fi'
import SearchBox from '../components/Search/SearchBox'

const HomeContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`

const HeroSection = styled.section`
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 60px 5%;
  background-image: linear-gradient(
    to bottom right,
    ${({ theme }) => theme.mode === 'light' 
      ? 'rgba(250, 250, 255, 0.9), rgba(240, 240, 255, 0.95)'
      : 'rgba(10, 10, 20, 0.85), rgba(20, 20, 35, 0.9)'
    }),
    url('/images/vKairo-AI.jpg');
  background-size: cover;
  background-position: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: radial-gradient(circle at 70% 30%, rgba(${({ theme }) => theme.colors.primaryRgb}, 0.1), transparent 70%);
  }
`

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 3rem;
`

const MainTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryDark});
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const SubTitle = styled(motion.p)`
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  line-height: 1.6;
  margin-bottom: 2.5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  color: ${({ theme }) => theme.colors.textSecondary};

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`

const CTAButton = styled(motion(Link))`
  display: inline-block;
  padding: 1rem 2.5rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(${({ theme }) => theme.colors.primaryRgb}, 0.2);

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(${({ theme }) => theme.colors.primaryRgb}, 0.3);
  }
`

const StatsSection = styled.section`
  padding: 100px 5%;
  background: ${({ theme }) => theme.colors.background};
`

const StatsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 568px) {
    grid-template-columns: 1fr;
  }
`

const StatCard = styled(motion.div)`
  padding: 2.5rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }
`

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryDark});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
`

const StatLabel = styled.div`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`

const FeaturesSection = styled.section`
  padding: 100px 5%;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  position: relative;
  overflow: hidden;
`

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 3vw, 3rem);
  font-weight: 800;
  text-align: center;
  margin-bottom: 5rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }
`

const FeaturesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 568px) {
    grid-template-columns: 1fr;
  }
`

const FeatureCard = styled(motion.div)`
  padding: 2.5rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: transform 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }

  svg {
    width: 40px;
    height: 40px;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1.5rem;
  }
`

const FeatureTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`

const FeatureDescription = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
  flex-grow: 1;
`

const TestimonialsSection = styled.section`
  padding: 100px 5%;
  background: ${({ theme }) => theme.colors.background};
`

const TestimonialsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const TestimonialCard = styled(motion.div)`
  padding: 2.5rem;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }
`

const Quote = styled.blockquote`
  font-size: 1.1rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  position: relative;
  padding-left: 2rem;
  
  &:before {
    content: '"';
    position: absolute;
    left: 0;
    top: -10px;
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.primary};
    opacity: 0.3;
    font-family: serif;
  }
`

const Author = styled.div`
  display: flex;
  align-items: center;
`

const AuthorImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  margin-right: 1rem;
  position: relative;
  overflow: hidden;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom right, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryDark});
    opacity: 0.8;
  }
`

const AuthorInfo = styled.div`
  h4 {
    font-weight: 600;
    margin-bottom: 0.25rem;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.9rem;
  }
`

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  }

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <MainTitle
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            La Plateforme Immobilière Intelligente du Sénégal
          </MainTitle>
          <SubTitle
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            Connectez-vous avec les meilleurs agents immobiliers du Sénégal et trouvez 
            votre bien idéal grâce à notre plateforme innovante.
          </SubTitle>
          <CTAButton
            to="/waitlist"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Rejoindre la liste d'attente
          </CTAButton>
        </HeroContent>
      </HeroSection>

      <SearchBox />

      <StatsSection>
        <StatsGrid>
          <StatCard
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <StatNumber>2000+</StatNumber>
            <StatLabel>Annonces immobilières</StatLabel>
          </StatCard>
          <StatCard
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <StatNumber>200+</StatNumber>
            <StatLabel>Agents partenaires</StatLabel>
          </StatCard>
          <StatCard
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <StatNumber>5000+</StatNumber>
            <StatLabel>Utilisateurs actifs</StatLabel>
          </StatCard>
        </StatsGrid>
      </StatsSection>

      <FeaturesSection>
        <SectionTitle>Pourquoi choisir Kairo ?</SectionTitle>
        <FeaturesGrid>
          <FeatureCard
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <FiSearch />
            <FeatureTitle>Recherche personnalisée</FeatureTitle>
            <FeatureDescription>
              Trouvez le bien idéal grâce à nos filtres avancés et 
              connectez-vous directement avec les agents.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <FiShield />
            <FeatureTitle>Mise en relation directe</FeatureTitle>
            <FeatureDescription>
              Communiquez directement avec des agents vérifiés pour 
              une expérience immobilière transparente.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <FiTrendingUp />
            <FeatureTitle>Données du marché</FeatureTitle>
            <FeatureDescription>
              Prenez des décisions éclairées grâce à nos analyses 
              détaillées du marché immobilier sénégalais.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <FiUsers />
            <FeatureTitle>Agents vérifiés</FeatureTitle>
            <FeatureDescription>
              Collaborez en toute confiance avec des agents immobiliers 
              soigneusement sélectionnés et vérifiés.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <FiClock />
            <FeatureTitle>Outils pour agents</FeatureTitle>
            <FeatureDescription>
              Agents, gérez vos annonces, suivez vos leads et organisez 
              vos visites efficacement sur une seule plateforme.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <FiGlobe />
            <FeatureTitle>Marketing digital</FeatureTitle>
            <FeatureDescription>
              Agents, bénéficiez d'une visibilité optimale de vos annonces 
              auprès d'une audience ciblée et qualifiée.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <TestimonialsSection>
        <SectionTitle>Ce qu'ils disent de nous</SectionTitle>
        <TestimonialsGrid>
          <TestimonialCard
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Quote>
              Kairo m'a permis de trouver rapidement le parfait appartement à Dakar. 
              La plateforme m'a mise en relation avec un agent professionnel qui a 
              parfaitement compris mes besoins.
            </Quote>
            <Author>
              <AuthorImage />
              <AuthorInfo>
                <h4>Fatou Diallo</h4>
                <p>Propriétaire à Dakar</p>
              </AuthorInfo>
            </Author>
          </TestimonialCard>
          <TestimonialCard
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Quote>
              En tant qu'agent immobilier indépendant, Kairo me donne accès à des 
              outils puissants et à une clientèle qualifiée. C'est un véritable 
              accélérateur pour mon activité.
            </Quote>
            <Author>
              <AuthorImage />
              <AuthorInfo>
                <h4>Moussa Sow</h4>
                <p>Agent immobilier</p>
              </AuthorInfo>
            </Author>
          </TestimonialCard>
        </TestimonialsGrid>
      </TestimonialsSection>
    </HomeContainer>
  )
}

export default Home 