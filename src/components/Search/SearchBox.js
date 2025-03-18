import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiMap, FiList, FiHome, FiDollarSign, FiUser, FiDroplet, FiSquare, FiSliders, FiChevronDown, FiX } from 'react-icons/fi';

// Container principal du moteur de recherche
const SearchContainer = styled.div`
  background: ${({ theme }) => theme.glass.background};
  backdrop-filter: ${({ theme }) => theme.glass.blur};
  -webkit-backdrop-filter: ${({ theme }) => theme.glass.blur};
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  border: 1px solid ${({ theme }) => theme.glass.border};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  padding: 2rem;
  width: 90%;
  max-width: 1100px;
  margin: 0 auto;
  margin-top: -60px;
  position: relative;
  z-index: 10;
  overflow: hidden;
`;

// Tab pour basculer entre la recherche par liste et par carte
const SearchTabs = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.glass.border};
  padding-bottom: 1rem;
`;

const SearchTab = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: none;
  color: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.text};
  font-weight: 600;
  font-size: 1rem;
  position: relative;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  &:after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 0;
    width: ${({ active }) => active ? '100%' : '0'};
    height: 3px;
    background: ${({ theme }) => theme.colors.primary};
    transition: ${({ theme }) => theme.transitions.default};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    
    &:after {
      width: 100%;
    }
  }

  svg {
    font-size: 1.2rem;
  }
`;

// Barre de recherche principale
const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => 
    theme.mode === 'light' 
      ? 'rgba(255, 255, 255, 0.8)' 
      : 'rgba(30, 30, 45, 0.8)'
  };
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  border: 1px solid ${({ theme }) => theme.glass.border};
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(${({ theme }) => theme.colors.primaryRgb}, 0.2);
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  padding: 0.5rem;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

// Filtres
const FiltersRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const FilterDropdown = styled.div`
  position: relative;
  min-width: 180px;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: ${({ theme, active }) => 
    active 
      ? theme.mode === 'light' 
        ? 'rgba(138, 43, 226, 0.1)' 
        : 'rgba(171, 91, 245, 0.2)'
      : theme.mode === 'light' 
        ? 'rgba(255, 255, 255, 0.8)' 
        : 'rgba(30, 30, 45, 0.8)'
  };
  border: 1px solid ${({ theme, active }) => 
    active ? theme.colors.primary : theme.glass.border
  };
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  padding: 0.75rem 1rem;
  color: ${({ theme, active }) => 
    active ? theme.colors.primary : theme.colors.text
  };
  font-weight: 500;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  svg {
    margin-right: ${({ noLabel }) => noLabel ? '0' : '0.5rem'};
    font-size: 1.2rem;
  }
`;

const FilterDropdownContent = styled(motion.div)`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  width: 250px;
  background: ${({ theme }) => 
    theme.mode === 'light' 
      ? 'rgba(255, 255, 255, 0.95)' 
      : 'rgba(20, 20, 30, 0.95)'
  };
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  border: 1px solid ${({ theme }) => theme.glass.border};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  padding: 1rem;
  z-index: 20;
  backdrop-filter: ${({ theme }) => theme.glass.blur};
  -webkit-backdrop-filter: ${({ theme }) => theme.glass.blur};
`;

const FilterTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ResetButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    text-decoration: underline;
  }
`;

const RangeSlider = styled.div`
  margin-bottom: 1rem;
  
  input {
    width: 100%;
    -webkit-appearance: none;
    height: 6px;
    border-radius: 3px;
    background: ${({ theme }) => 
      theme.mode === 'light' 
        ? '#e5e5e5' 
        : '#333333'
    };
    outline: none;
    
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.primary};
      cursor: pointer;
      transition: ${({ theme }) => theme.transitions.default};
      border: 2px solid white;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      
      &:hover {
        transform: scale(1.1);
      }
    }
  }
`;

const RangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const RangeValue = styled.div`
  text-align: center;
  margin-top: 0.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const Checkbox = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.9rem;
  
  input {
    margin-right: 0.5rem;
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 4px;
    border: 2px solid ${({ theme }) => theme.glass.border};
    outline: none;
    cursor: pointer;
    position: relative;
    transition: ${({ theme }) => theme.transitions.default};
    
    &:checked {
      background: ${({ theme }) => theme.colors.primary};
      border-color: ${({ theme }) => theme.colors.primary};
      
      &:after {
        content: '✓';
        position: absolute;
        color: white;
        font-size: 12px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    
    &:hover {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const FilterActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const ApplyButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  padding: 0.5rem 1rem;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

// Prévisualisation de résultats
const ResultsPreview = styled(motion.div)`
  margin-top: 2rem;
  transition: ${({ theme }) => theme.transitions.default};
`;

const ResultsHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ResultsCount = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const ResultCard = styled(motion.div)`
  background: ${({ theme }) => 
    theme.mode === 'light' 
      ? 'rgba(255, 255, 255, 0.9)' 
      : 'rgba(30, 30, 45, 0.9)'
  };
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  border: 1px solid ${({ theme }) => theme.glass.border};
  overflow: hidden;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const ResultImage = styled.div`
  height: 150px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const ResultTag = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
`;

const ResultPrice = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 0.9rem;
  font-weight: 700;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
`;

const ResultDetails = styled.div`
  padding: 1rem;
`;

const ResultTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ResultLocation = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ResultFeatures = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ResultFeature = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  svg {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

// Animations
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const resultsVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { 
    opacity: 1, 
    height: "auto",
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: custom => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1 }
  })
};

// Composant principal
const SearchBox = () => {
  // États pour les filtres et le résultat
  const [searchType, setSearchType] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(null);
  const [priceRange, setPriceRange] = useState(500000);
  const [bedrooms, setBedrooms] = useState(2);
  const [propertyType, setPropertyType] = useState([]);
  const [showResults, setShowResults] = useState(false);
  
  // Données exemple pour les résultats
  const mockResults = [
    {
      id: 1,
      title: "Appartement Moderne",
      location: "Almadies, Dakar",
      price: 320000,
      beds: 3,
      baths: 2,
      area: 120,
      type: "Appartement",
      tag: "Nouveau",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      title: "Villa avec Piscine",
      location: "Ngor, Dakar",
      price: 480000,
      beds: 4,
      baths: 3,
      area: 250,
      type: "Villa",
      tag: "Premium",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      title: "Studio Moderne",
      location: "Plateau, Dakar",
      price: 150000,
      beds: 1,
      baths: 1,
      area: 45,
      type: "Studio",
      tag: "Bon prix",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    }
  ];

  // Formatage du prix
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-SN', { 
      style: 'currency', 
      currency: 'XOF',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Gestion des filtres
  const toggleFilter = (filter) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }
  };

  const togglePropertyType = (type) => {
    if (propertyType.includes(type)) {
      setPropertyType(propertyType.filter(t => t !== type));
    } else {
      setPropertyType([...propertyType, type]);
    }
  };

  // Réinitialiser les filtres
  const resetFilters = () => {
    setPriceRange(500000);
    setBedrooms(2);
    setPropertyType([]);
  };

  // Recherche
  const handleSearch = () => {
    setShowResults(true);
  };

  // Effet pour fermer les filtres lorsqu'on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeFilter && !event.target.closest('.filter-dropdown')) {
        setActiveFilter(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeFilter]);

  return (
    <SearchContainer as={motion.div} variants={containerVariants} initial="hidden" animate="visible">
      <SearchTabs>
        <SearchTab 
          active={searchType === 'list'} 
          onClick={() => setSearchType('list')}
        >
          <FiList /> Recherche par liste
        </SearchTab>
        <SearchTab 
          active={searchType === 'map'} 
          onClick={() => setSearchType('map')}
        >
          <FiMap /> Recherche par carte
        </SearchTab>
      </SearchTabs>

      <SearchInputWrapper>
        <FiSearch size={20} style={{ marginRight: '10px', color: '#888' }} />
        <SearchInput 
          type="text" 
          placeholder="Rechercher par localité, quartier, ou caractéristiques..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <SearchButton onClick={handleSearch}>
          <FiSearch /> Rechercher
        </SearchButton>
      </SearchInputWrapper>

      <FiltersRow>
        <FilterDropdown className="filter-dropdown">
          <FilterButton 
            active={activeFilter === 'price'} 
            onClick={() => toggleFilter('price')}
          >
            <FiDollarSign /> Prix
            <FiChevronDown size={16} />
          </FilterButton>
          <AnimatePresence>
            {activeFilter === 'price' && (
              <FilterDropdownContent
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <FilterTitle>
                  Prix maximum
                  <ResetButton onClick={() => setPriceRange(500000)}>Réinitialiser</ResetButton>
                </FilterTitle>
                <RangeSlider>
                  <input 
                    type="range" 
                    min="50000" 
                    max="1000000" 
                    step="10000" 
                    value={priceRange} 
                    onChange={(e) => setPriceRange(parseInt(e.target.value))} 
                  />
                </RangeSlider>
                <RangeLabels>
                  <span>50,000 XOF</span>
                  <span>1,000,000 XOF</span>
                </RangeLabels>
                <RangeValue>{formatPrice(priceRange)}</RangeValue>
                <FilterActions>
                  <ApplyButton onClick={() => setActiveFilter(null)}>Appliquer</ApplyButton>
                </FilterActions>
              </FilterDropdownContent>
            )}
          </AnimatePresence>
        </FilterDropdown>

        <FilterDropdown className="filter-dropdown">
          <FilterButton 
            active={activeFilter === 'beds'} 
            onClick={() => toggleFilter('beds')}
          >
            <FiUser /> Chambres
            <FiChevronDown size={16} />
          </FilterButton>
          <AnimatePresence>
            {activeFilter === 'beds' && (
              <FilterDropdownContent
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <FilterTitle>
                  Nombre de chambres
                  <ResetButton onClick={() => setBedrooms(2)}>Réinitialiser</ResetButton>
                </FilterTitle>
                <RangeSlider>
                  <input 
                    type="range" 
                    min="1" 
                    max="6" 
                    step="1" 
                    value={bedrooms} 
                    onChange={(e) => setBedrooms(parseInt(e.target.value))} 
                  />
                </RangeSlider>
                <RangeLabels>
                  <span>1</span>
                  <span>6+</span>
                </RangeLabels>
                <RangeValue>{bedrooms} {bedrooms > 1 ? 'chambres' : 'chambre'}</RangeValue>
                <FilterActions>
                  <ApplyButton onClick={() => setActiveFilter(null)}>Appliquer</ApplyButton>
                </FilterActions>
              </FilterDropdownContent>
            )}
          </AnimatePresence>
        </FilterDropdown>

        <FilterDropdown className="filter-dropdown">
          <FilterButton 
            active={activeFilter === 'type'} 
            onClick={() => toggleFilter('type')}
          >
            <FiHome /> Type de bien
            <FiChevronDown size={16} />
          </FilterButton>
          <AnimatePresence>
            {activeFilter === 'type' && (
              <FilterDropdownContent
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <FilterTitle>
                  Type de propriété
                  <ResetButton onClick={() => setPropertyType([])}>Réinitialiser</ResetButton>
                </FilterTitle>
                <CheckboxGroup>
                  <Checkbox>
                    <input 
                      type="checkbox" 
                      checked={propertyType.includes('Appartement')} 
                      onChange={() => togglePropertyType('Appartement')}
                    />
                    Appartement
                  </Checkbox>
                  <Checkbox>
                    <input 
                      type="checkbox" 
                      checked={propertyType.includes('Villa')} 
                      onChange={() => togglePropertyType('Villa')}
                    />
                    Villa
                  </Checkbox>
                  <Checkbox>
                    <input 
                      type="checkbox" 
                      checked={propertyType.includes('Maison')} 
                      onChange={() => togglePropertyType('Maison')}
                    />
                    Maison
                  </Checkbox>
                  <Checkbox>
                    <input 
                      type="checkbox" 
                      checked={propertyType.includes('Studio')} 
                      onChange={() => togglePropertyType('Studio')}
                    />
                    Studio
                  </Checkbox>
                  <Checkbox>
                    <input 
                      type="checkbox" 
                      checked={propertyType.includes('Terrain')} 
                      onChange={() => togglePropertyType('Terrain')}
                    />
                    Terrain
                  </Checkbox>
                  <Checkbox>
                    <input 
                      type="checkbox" 
                      checked={propertyType.includes('Commercial')} 
                      onChange={() => togglePropertyType('Commercial')}
                    />
                    Commercial
                  </Checkbox>
                </CheckboxGroup>
                <FilterActions>
                  <ApplyButton onClick={() => setActiveFilter(null)}>Appliquer</ApplyButton>
                </FilterActions>
              </FilterDropdownContent>
            )}
          </AnimatePresence>
        </FilterDropdown>

        <FilterDropdown className="filter-dropdown">
          <FilterButton 
            noLabel 
            active={activeFilter === 'more'} 
            onClick={() => toggleFilter('more')}
          >
            <FiSliders /> Plus de filtres
            <FiChevronDown size={16} />
          </FilterButton>
          <AnimatePresence>
            {activeFilter === 'more' && (
              <FilterDropdownContent
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <FilterTitle>
                  Caractéristiques supplémentaires
                  <ResetButton onClick={resetFilters}>Réinitialiser</ResetButton>
                </FilterTitle>
                <CheckboxGroup>
                  <Checkbox>
                    <input type="checkbox" />
                    Piscine
                  </Checkbox>
                  <Checkbox>
                    <input type="checkbox" />
                    Climatisation
                  </Checkbox>
                  <Checkbox>
                    <input type="checkbox" />
                    Balcon
                  </Checkbox>
                  <Checkbox>
                    <input type="checkbox" />
                    Ascenseur
                  </Checkbox>
                  <Checkbox>
                    <input type="checkbox" />
                    Parking
                  </Checkbox>
                  <Checkbox>
                    <input type="checkbox" />
                    Sécurité 24/7
                  </Checkbox>
                </CheckboxGroup>
                <FilterActions>
                  <ApplyButton onClick={() => setActiveFilter(null)}>Appliquer</ApplyButton>
                </FilterActions>
              </FilterDropdownContent>
            )}
          </AnimatePresence>
        </FilterDropdown>
      </FiltersRow>

      <AnimatePresence>
        {showResults && (
          <ResultsPreview
            variants={resultsVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <ResultsHeading>
              <ResultsCount>3 propriétés trouvées</ResultsCount>
            </ResultsHeading>
            <ResultsGrid>
              {mockResults.map((result, index) => (
                <ResultCard
                  key={result.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                >
                  <ResultImage src={result.image}>
                    <ResultTag>{result.tag}</ResultTag>
                    <ResultPrice>{formatPrice(result.price)}</ResultPrice>
                  </ResultImage>
                  <ResultDetails>
                    <ResultTitle>{result.title}</ResultTitle>
                    <ResultLocation>{result.location}</ResultLocation>
                    <ResultFeatures>
                      <ResultFeature>
                        <FiUser /> {result.beds}
                      </ResultFeature>
                      <ResultFeature>
                        <FiDroplet /> {result.baths}
                      </ResultFeature>
                      <ResultFeature>
                        <FiSquare /> {result.area} m²
                      </ResultFeature>
                    </ResultFeatures>
                  </ResultDetails>
                </ResultCard>
              ))}
            </ResultsGrid>
          </ResultsPreview>
        )}
      </AnimatePresence>
    </SearchContainer>
  );
};

export default SearchBox; 