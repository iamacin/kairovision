import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiShield, FiTrendingUp, FiUsers, FiClock, FiGlobe, FiPhone, FiMail, FiMapPin } from 'react-icons/fi'

const HomeContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`

const HeroSection = styled.section`
  position: relative;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  color: white;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.primaryDark} 100%
  );
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 70% 30%, 
      rgba(255, 255, 255, 0.1) 0%,
      rgba(0, 0, 0, 0.4) 100%
    );
    z-index: 1;
  }
`

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem;
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`

const MainTitle = styled(motion.h1)`
  font-size: clamp(2.75rem, 5vw, 4.5rem);
  font-weight: 800;
  margin-bottom: 2rem;
  line-height: 1.1;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary}, 
    ${({ theme }) => theme.colors.primaryDark}
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
`

const SubTitle = styled(motion.p)`
  font-size: clamp(1.2rem, 1.5vw, 1.4rem);
  line-height: 1.7;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
`

const PrimaryButton = styled(motion(Link))`
  padding: 1.25rem 3rem;
  font-size: 1.2rem;
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

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(${({ theme }) => theme.colors.primaryRgb}, 0.4);
  }

  @media (max-width: 768px) {
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
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
  padding: 120px 5%;
  background: ${({ theme, alt }) => alt ? theme.colors.backgroundAlt : theme.colors.background};
  
  @media (max-width: 768px) {
    padding: 80px 5%;
  }
`

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 3vw, 3rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`

const SectionSubtitle = styled.p`
  font-size: clamp(1.1rem, 1.25vw, 1.3rem);
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  max-width: 700px;
  margin: 0 auto 4rem;
  line-height: 1.7;
  
  @media (max-width: 768px) {
    margin: 0 auto 3rem;
  }
`

const Grid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 50px;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    gap: 30px;
    padding: 0;
  }
`

const Card = styled(motion.div)`
  padding: 3rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 24px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }

  svg {
    width: 48px;
    height: 48px;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 2rem;
  }
  
  @media (max-width: 768px) {
    padding: 2rem;
    
    svg {
      width: 40px;
      height: 40px;
      margin-bottom: 1.5rem;
    }
  }
`

const CardTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
`

const CardDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const Home = () => {
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
            <PrimaryButton to="/waitlist">
              Rejoindre Kairo
            </PrimaryButton>
          </CTAContainer>
        </HeroContent>
      </HeroSection>

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
    </HomeContainer>
  )
}

export default Home 