import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiSearch, FiShield, FiTrendingUp, FiUsers, FiClock, FiGlobe, FiMapPin, FiDollarSign, FiHome } from 'react-icons/fi'
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

const BentoSection = styled.section`
  padding: 100px 5%;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;
`

const BentoBox = styled.div`
  width: 300px;
  height: 200px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }
`

const BentoImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
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

const StatIcon = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
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
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`

const FeatureDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
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

const SearchSection = styled.section`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 120px 5% 60px;
  background: linear-gradient(135deg, 
    rgba(${({ theme }) => theme.colors.primaryRgb}, 0.1) 0%,
    rgba(${({ theme }) => theme.colors.primaryRgb}, 0.05) 100%
  );
  text-align: center;
`

const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.2;
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 3rem;
  max-width: 600px;
`

const SearchContainer = styled.div`
  width: 100%;
  max-width: 800px;
  background: ${({ theme }) => theme.colors.background};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.layout.borderRadiusLg};
  box-shadow: ${({ theme }) => theme.shadows.medium};
`

const SearchForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const InputGroup = styled.div`
  position: relative;
  
  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  font-size: 1rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const Select = styled.select`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  font-size: 1rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const SearchButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`

const PremiumSection = styled.section`
  padding: 80px 5%;
`

const PropertiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`

const PropertyCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.layout.borderRadiusLg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }
`

const PropertyImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`

const PropertyContent = styled.div`
  padding: 1.5rem;
`

const PropertyTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`

const PropertyLocation = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const PropertyPrice = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const PropertyType = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  margin-left: auto;
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
              to="/search"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Commencez votre recherche
            </PrimaryButton>
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

      <SearchSection>
        <Title>Trouvez votre bien immobilier idéal</Title>
        <Subtitle>
          Des milliers de propriétés à vendre et à louer au Sénégal
        </Subtitle>
        
        <SearchContainer>
          <SearchForm onSubmit={handleSearch}>
            <InputGroup>
              <FiMapPin size={20} />
              <Input
                type="text"
                placeholder="Localisation"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </InputGroup>
            
            <InputGroup>
              <FiHome size={20} />
              <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="all">Type de bien</option>
                <option value="sale">À vendre</option>
                <option value="rent">À louer</option>
              </Select>
            </InputGroup>

            <SearchButton
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiSearch size={20} />
            </SearchButton>
          </SearchForm>
        </SearchContainer>
      </SearchSection>

      <BentoSection>
        <BentoBox>
          <BentoImage src="/images/platform-mockup.jpg" alt="Platform Mockup" />
        </BentoBox>
        <BentoBox>
          <BentoImage src="/images/agent-dashboard.jpg" alt="Agent Dashboard" />
        </BentoBox>
        <BentoBox>
          <BentoImage src="/images/market-analysis.jpg" alt="Market Analysis" />
        </BentoBox>
      </BentoSection>

      <StatsSection>
        <StatsGrid>
          <StatCard
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <StatIcon><FiUsers /></StatIcon>
            <StatNumber>500+</StatNumber>
            <StatLabel>Utilisateurs</StatLabel>
          </StatCard>
          <StatCard
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <StatIcon><FiTrendingUp /></StatIcon>
            <StatNumber>98%</StatNumber>
            <StatLabel>Taux de succès</StatLabel>
          </StatCard>
          <StatCard
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <StatIcon><FiClock /></StatIcon>
            <StatNumber>24/7</StatNumber>
            <StatLabel>Support expert</StatLabel>
          </StatCard>
        </StatsGrid>
      </StatsSection>

      <FeaturesSection>
        <SectionTitle>Pourquoi Choisir Kairo ?</SectionTitle>
        <SectionSubtitle>
          Une plateforme conçue pour rendre l'achat, la vente et la location plus fluides et accessibles.
        </SectionSubtitle>
        <FeaturesGrid>
          <FeatureCard
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <FiShield />
            <FeatureTitle>Accès à des annonces vérifiées</FeatureTitle>
            <FeatureDescription>
              Parcourez des biens publiés par des agents et vendeurs professionnels.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <FiTrendingUp />
            <FeatureTitle>Outils pratiques</FeatureTitle>
            <FeatureDescription>
              Estimez les prix du marché et suivez les tendances immobilières au Sénégal.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <FiUsers />
            <FeatureTitle>Un réseau de partenaires</FeatureTitle>
            <FeatureDescription>
              Kairo connecte acheteurs, vendeurs et professionnels de l'immobilier.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <FiGlobe />
            <FeatureTitle>Des solutions adaptées</FeatureTitle>
            <FeatureDescription>
              Trouvez des financements et des assurances grâce à nos partenaires bancaires.
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

      <PremiumSection>
        <SectionTitle>Propriétés Premium</SectionTitle>
        <PropertiesGrid>
          {premiumProperties.map((property) => (
            <PropertyCard
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PropertyImage src={property.image_url} alt={property.title} />
              <PropertyContent>
                <PropertyTitle>{property.title}</PropertyTitle>
                <PropertyLocation>
                  <FiMapPin />
                  {property.location}
                </PropertyLocation>
                <PropertyPrice>
                  <FiDollarSign />
                  {property.price.toLocaleString()} FCFA
                  <PropertyType>
                    {property.type === 'sale' ? 'À vendre' : 'À louer'}
                  </PropertyType>
                </PropertyPrice>
              </PropertyContent>
            </PropertyCard>
          ))}
        </PropertiesGrid>
      </PremiumSection>
    </HomeContainer>
  )
}

export default Home 