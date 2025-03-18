import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiSearch, FiShield, FiTrendingUp, FiUsers, FiClock, FiGlobe } from 'react-icons/fi'

const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%);
`

const HeroSection = styled.section`
  padding: 120px 5% 80px;
  background: var(--gradient-primary);
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.1), transparent);
    z-index: 1;
  }
`

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  text-align: center;
  background: var(--glass-background);
  padding: 3rem;
  border-radius: 24px;
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
`

const MainTitle = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  font-family: 'Inter', sans-serif;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const SubTitle = styled(motion.p)`
  font-size: 1.5rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const CTAButton = styled(motion(Link))`
  display: inline-block;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`

const StatsSection = styled.section`
  padding: 80px 5%;
  background: white;
`

const StatsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 568px) {
    grid-template-columns: 1fr;
  }
`

const StatCard = styled(motion.div)`
  padding: 2rem;
  background: var(--glass-background);
  border-radius: 16px;
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 1rem;
`

const StatLabel = styled.div`
  font-size: 1.1rem;
  color: var(--text-secondary);
`

const FeaturesSection = styled.section`
  padding: 80px 5%;
  background: linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: radial-gradient(circle at top left, rgba(var(--primary-rgb), 0.03), transparent);
  }
`

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text-primary);
  position: relative;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`

const FeaturesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 568px) {
    grid-template-columns: 1fr;
  }
`

const FeatureCard = styled(motion.div)`
  padding: 2rem;
  background: var(--glass-background);
  border-radius: 16px;
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  svg {
    width: 40px;
    height: 40px;
    color: var(--primary);
    margin-bottom: 1rem;
    opacity: 0.9;
  }
`

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-primary);
`

const FeatureDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-secondary);
`

const TestimonialsSection = styled.section`
  padding: 80px 5%;
  background: white;
`

const TestimonialsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const TestimonialCard = styled(motion.div)`
  padding: 2rem;
  background: var(--glass-background);
  border-radius: 16px;
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`

const Quote = styled.blockquote`
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
`

const Author = styled.div`
  display: flex;
  align-items: center;
`

const AuthorImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: #ddd;
  margin-right: 1rem;
`

const AuthorInfo = styled.div`
  h4 {
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  p {
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
`

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
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

      <StatsSection>
        <StatsGrid>
          <StatCard
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <StatNumber>2000+</StatNumber>
            <StatLabel>Annonces immobilières</StatLabel>
          </StatCard>
          <StatCard
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <StatNumber>200+</StatNumber>
            <StatLabel>Agents partenaires</StatLabel>
          </StatCard>
          <StatCard
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <StatNumber>5000+</StatNumber>
            <StatLabel>Utilisateurs actifs</StatLabel>
          </StatCard>
        </StatsGrid>
      </StatsSection>

      <FeaturesSection>
        <SectionTitle>Pourquoi choisir Kairos ?</SectionTitle>
        <FeaturesGrid>
          <FeatureCard
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
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
            viewport={{ once: true }}
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
            viewport={{ once: true }}
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
            viewport={{ once: true }}
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
            viewport={{ once: true }}
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
            viewport={{ once: true }}
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
            viewport={{ once: true }}
          >
            <Quote>
              "Kairo m'a permis de trouver rapidement le parfait appartement à Dakar. 
              La plateforme m'a mise en relation avec un agent professionnel qui a 
              parfaitement compris mes besoins."
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
            viewport={{ once: true }}
          >
            <Quote>
              "En tant qu'agent immobilier indépendant, Kairo me donne accès à des 
              outils puissants et à une clientèle qualifiée. C'est un véritable 
              accélérateur pour mon activité."
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