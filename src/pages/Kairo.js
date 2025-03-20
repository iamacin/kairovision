import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSearch, FiMapPin, FiHome, FiDollarSign } from 'react-icons/fi';
import { supabase } from '../utils/supabase';

const KairoContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.backgroundAlt};
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

const SectionTitle = styled.h2`
  font-size: clamp(1.75rem, 2.5vw, 2.5rem);
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
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

const Kairo = () => {
  const [location, setLocation] = useState('');
  const [type, setType] = useState('all');
  const [premiumProperties, setPremiumProperties] = useState([]);

  useEffect(() => {
    const fetchPremiumProperties = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('is_premium', true)
          .limit(5);

        if (error) throw error;
        setPremiumProperties(data || []);
      } catch (error) {
        console.error('Error fetching premium properties:', error);
      }
    };

    fetchPremiumProperties();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', { location, type });
  };

  return (
    <KairoContainer>
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
    </KairoContainer>
  );
};

export default Kairo; 