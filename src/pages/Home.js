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
      : 'rgba(22, 22, 37, 0.85), rgba(30, 30, 45, 0.9)'
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
  font-size: clamp(2rem, 4vw, 3.5rem);
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
    font-size: 2rem;
  }
`

const SubTitle = styled(motion.p)`
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  line-height: 1.6;
  margin-bottom: 2.5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  color: ${({ theme }) => theme.colors.textSecondary};

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const PrimaryButton = styled(motion(Link))`
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  transition: transform 0.2s ease;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryDark} 100%);
  color: white;
  border: none;
  box-shadow: 0 4px 6px rgba(${({ theme }) => theme.colors.primaryRgb}, 0.25);

  &:hover {
    box-shadow: 0 6px 8px rgba(${({ theme }) => theme.colors.primaryRgb}, 0.3);
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
`

const SectionTitle = styled.h2`
  font-size: clamp(1.75rem, 2.5vw, 2.5rem);
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
`

const Grid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
`

const Card = styled(motion.div)`
  padding: 2.5rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: transform 0.3s ease;

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

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`

const CardDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
`

const ContactSection = styled(Section)`
  background: ${({ theme }) => theme.colors.backgroundAlt};
`

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Home = () => {
  // Add image validation
  const [heroImageError, setHeroImageError] = React.useState(false);

  React.useEffect(() => {
    const img = new Image();
    img.src = '/images/vKairo-AI.jpg';
    img.onerror = () => setHeroImageError(true);
  }, []);

  return (
    <HomeContainer>
      <HeroSection style={heroImageError ? { backgroundImage: 'none' } : undefined}>
        <HeroContent>
          <MainTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Bienvenue sur Kairo, votre plateforme immobilière digitale au Sénégal
          </MainTitle>
          <SubTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Découvrez les meilleures opportunités immobilières au Sénégal. Notre plateforme connecte clients et professionnels qualifiés pour une expérience immobilière transparente et efficace.
          </SubTitle>
          <CTAContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
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
          Nous révolutionnons l'expérience immobilière au Sénégal avec des outils innovants et une approche centrée sur l'utilisateur.
        </SectionSubtitle>
        <Grid>
          <Card
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <FiTrendingUp />
            <CardTitle>Outils pratiques</CardTitle>
            <CardDescription>
              Profitez d'outils modernes pour une recherche immobilière efficace et personnalisée.
            </CardDescription>
          </Card>
          <Card
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <FiUsers />
            <CardTitle>Réseau de partenaires</CardTitle>
            <CardDescription>
              Accédez à un réseau d'agents immobiliers et de promoteurs qualifiés.
            </CardDescription>
          </Card>
          <Card
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <FiGlobe />
            <CardTitle>Accès au marché digital</CardTitle>
            <CardDescription>
              Explorez le marché immobilier sénégalais depuis n'importe où dans le monde.
            </CardDescription>
          </Card>
        </Grid>
      </Section>

      <ContactSection>
        <SectionTitle>Contactez-nous</SectionTitle>
        <SectionSubtitle>
          Notre équipe est à votre disposition pour répondre à toutes vos questions.
        </SectionSubtitle>
        <Grid>
          <Card>
            <ContactInfo>
              <FiPhone />
              <div>{process.env.REACT_APP_CONTACT_PHONE || '+221 77 777 77 77'}</div>
            </ContactInfo>
            <ContactInfo>
              <FiMail />
              <div>{process.env.REACT_APP_CONTACT_EMAIL || 'contact@kairovision.com'}</div>
            </ContactInfo>
            <ContactInfo>
              <FiMapPin />
              <div>Dakar, Sénégal</div>
            </ContactInfo>
          </Card>
        </Grid>
      </ContactSection>
    </HomeContainer>
  )
}

export default Home 