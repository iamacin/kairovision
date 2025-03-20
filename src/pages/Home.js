import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiSearch, FiShield, FiTrendingUp, FiUsers, FiClock, FiGlobe, FiMapPin, FiDollarSign, FiHome, FiPhone, FiMail } from 'react-icons/fi'
import SearchBox from '../components/Search/SearchBox'
import { supabase } from '../utils/supabase'

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

const BaseButton = styled(Link)`
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  transition: transform 0.2s ease;
`

const PrimaryButton = styled(motion(BaseButton))`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryDark} 100%);
  color: white;
  border: none;
  box-shadow: 0 4px 6px rgba(${({ theme }) => theme.colors.primaryRgb}, 0.25);

  &:hover {
    box-shadow: 0 6px 8px rgba(${({ theme }) => theme.colors.primaryRgb}, 0.3);
  }
`

const SecondaryButton = styled(motion(BaseButton))`
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};

  &:hover {
    background: rgba(${({ theme }) => theme.colors.primaryRgb}, 0.1);
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

const PublishSection = styled(Section)`
  background: ${({ theme }) => theme.colors.background};
  text-align: center;
`

const Steps = styled.div`
  max-width: 800px;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const Step = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  text-align: left;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
`

const StepContent = styled.div`
  flex: 1;
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
  const [location, setLocation] = useState('');
  const [type, setType] = useState('all');
  const [premiumProperties, setPremiumProperties] = useState([]);

  useEffect(() => {
    const fetchPremiumProperties = async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('is_premium', true)
        .limit(5);

      if (!error && data) {
        setPremiumProperties(data);
      }
    };

    fetchPremiumProperties();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic here
  };

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
            Bienvenue sur Kairo, votre plateforme immobilière digitale au Sénégal
          </MainTitle>
          <SubTitle
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            Acheter, vendre ou louer un bien immobilier n'a jamais été aussi simple. Kairo connecte clients, agents et partenaires sur une plateforme unique et transparente. Nous facilitons les transactions en centralisant les annonces et en mettant en relation des professionnels qualifiés.
          </SubTitle>
          <CTAContainer>
            <PrimaryButton
              to="/kairo"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Commencez votre recherche
            </PrimaryButton>
            <SecondaryButton
              to="/waitlist"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Publiez votre annonce
            </SecondaryButton>
            <SecondaryButton
              to="/agents"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Trouvez un agent partenaire
            </SecondaryButton>
          </CTAContainer>
        </HeroContent>
      </HeroSection>

      <Section>
        <SectionTitle>Pourquoi Choisir Kairo ?</SectionTitle>
        <Grid>
          <Card
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <FiShield />
            <CardTitle>Accès à des annonces vérifiées</CardTitle>
            <CardDescription>
              Parcourez des biens publiés par des agents et vendeurs professionnels.
            </CardDescription>
          </Card>
          <Card
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <FiTrendingUp />
            <CardTitle>Outils pratiques</CardTitle>
            <CardDescription>
              Estimez les prix du marché et suivez les tendances immobilières au Sénégal.
            </CardDescription>
          </Card>
          <Card
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <FiUsers />
            <CardTitle>Un réseau de partenaires</CardTitle>
            <CardDescription>
              Kairo connecte acheteurs, vendeurs et professionnels de l'immobilier.
            </CardDescription>
          </Card>
          <Card
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <FiGlobe />
            <CardTitle>Des solutions adaptées</CardTitle>
            <CardDescription>
              Trouvez des financements et des assurances grâce à nos partenaires bancaires.
            </CardDescription>
          </Card>
        </Grid>
      </Section>

      <Section alt>
        <SectionTitle>Services Offerts</SectionTitle>
        <Grid>
          <Card
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <FiHome />
            <CardTitle>Location Long Terme</CardTitle>
            <CardDescription>
              Trouvez rapidement un appartement, une maison ou un local commercial.
            </CardDescription>
          </Card>
          <Card
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <FiTrendingUp />
            <CardTitle>Achat et Vente de Biens</CardTitle>
            <CardDescription>
              Consultez ou publiez des annonces en toute simplicité.
            </CardDescription>
          </Card>
          <Card
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <FiTrendingUp />
            <CardTitle>Évaluation Immobilière</CardTitle>
            <CardDescription>
              Estimez la valeur d'un bien grâce à des outils basés sur des données locales.
            </CardDescription>
          </Card>
          <Card
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <FiTrendingUp />
            <CardTitle>Visibilité Premium</CardTitle>
            <CardDescription>
              Augmentez la portée de votre annonce avec des options publicitaires ciblées.
            </CardDescription>
          </Card>
          <Card
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <FiTrendingUp />
            <CardTitle>Solutions Financières</CardTitle>
            <CardDescription>
              Profitez de collaborations avec les banques pour accéder à des financements adaptés.
            </CardDescription>
          </Card>
        </Grid>
      </Section>

      <PublishSection>
        <SectionTitle>Publiez Votre Annonce</SectionTitle>
        <SectionSubtitle>
          Kairo est une plateforme dédiée aux agents immobiliers et professionnels.
        </SectionSubtitle>
        <Grid>
          <Card>
            <CardTitle>Inscription requise</CardTitle>
            <CardDescription>
              L'accès à la plateforme est réservé aux agents enregistrés.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>Création de profil</CardTitle>
            <CardDescription>
              Chaque agent doit disposer d'un profil validé pour publier des annonces.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>Liste d'attente</CardTitle>
            <CardDescription>
              L'inscription des agents est en cours de déploiement. Inscrivez-vous dès maintenant pour être informé dès l'ouverture.
            </CardDescription>
          </Card>
        </Grid>

        <Steps>
          <Step>
            <StepNumber>1</StepNumber>
            <StepContent>
              <CardTitle>Inscrivez-vous sur la waitlist et créez votre profil d'agent.</CardTitle>
            </StepContent>
          </Step>
          <Step>
            <StepNumber>2</StepNumber>
            <StepContent>
              <CardTitle>Accédez à la plateforme après validation de votre inscription.</CardTitle>
            </StepContent>
          </Step>
          <Step>
            <StepNumber>3</StepNumber>
            <StepContent>
              <CardTitle>Publiez vos annonces et connectez-vous avec des acheteurs et locataires sérieux.</CardTitle>
            </StepContent>
          </Step>
        </Steps>

        <CTAContainer>
          <PrimaryButton
            to="/waitlist"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            S'inscrire sur la waitlist
          </PrimaryButton>
          <SecondaryButton
            to="/about"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            En savoir plus sur le fonctionnement
          </SecondaryButton>
        </CTAContainer>
      </PublishSection>

      <Section>
        <SectionTitle>Sécurité et Transparence</SectionTitle>
        <Grid>
          <Card>
            <CardTitle>Vérification stricte des annonces</CardTitle>
            <CardDescription>
              Nous collaborons avec des agents et vendeurs reconnus pour garantir des biens conformes aux attentes.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>Mise en relation intelligente</CardTitle>
            <CardDescription>
              Un système conçu pour connecter clients et agents en fonction de leurs besoins.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>Un marché digitalisé et accessible</CardTitle>
            <CardDescription>
              Accédez aux meilleures opportunités immobilières en quelques clics.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>Retours et évaluations des utilisateurs</CardTitle>
            <CardDescription>
              Consultez les avis des clients pour prendre des décisions éclairées.
            </CardDescription>
          </Card>
        </Grid>
      </Section>

      <ContactSection>
        <SectionTitle>Contactez-nous</SectionTitle>
        <Grid>
          <Card>
            <ContactInfo>
              <FiPhone />
              <CardDescription>+221 XX XXX XX XX</CardDescription>
            </ContactInfo>
            <ContactInfo>
              <FiMail />
              <CardDescription>contact@kairo.sn</CardDescription>
            </ContactInfo>
            <ContactInfo>
              <FiMapPin />
              <CardDescription>Dakar, Sénégal</CardDescription>
            </ContactInfo>
          </Card>
          <Card>
            <CardTitle>Trouvez un agent partenaire</CardTitle>
            <CardDescription>
              Besoin d'aide pour votre projet immobilier ? Nos agents partenaires sont là pour vous accompagner.
            </CardDescription>
            <PrimaryButton
              to="/agents"
              style={{ marginTop: '1.5rem' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Trouver un agent partenaire
            </PrimaryButton>
          </Card>
        </Grid>
      </ContactSection>
    </HomeContainer>
  )
}

export default Home 