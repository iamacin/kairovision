import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { secureClient } from '../utils/supabase';
import LoadingSpinner from '../components/LoadingSpinner';
import { motion } from 'framer-motion';

// Styled components for better UI management
const WaitlistContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 20px 80px;
  
  @media (max-width: 768px) {
    padding: 80px 16px 60px;
  }
`;

const CenteredContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: ${props => props.theme.colors.text};
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 40px;
  color: ${props => props.theme.colors.textSecondary};
  max-width: 600px;
  text-align: center;
`;

const FormContainer = styled(motion.div)`
  background-color: ${props => props.theme.colors.cardBackground || props.theme.colors.background};
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 600px;
  position: relative;
  overflow: hidden;
  
  /* Glass morphism effect */
  backdrop-filter: blur(10px);
  border: 1px solid rgba(${({ theme }) => theme.colors.primaryRgb}, 0.1);
  
  /* Glossy effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(${props => props.theme.colors.primaryRgb}, 0.03) 0%,
      transparent 50%
    );
    z-index: 0;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${props => props.hasError ? props.theme.colors.error : props.theme.colors.border};
  font-size: 1rem;
  background-color: ${props => props.theme.colors.inputBackground || 'rgba(255, 255, 255, 0.8)'};
  color: ${props => props.theme.colors.text};
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? props.theme.colors.error : props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(${props => props.theme.colors.primaryRgb}, 0.1);
  }
`;

const InputError = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: 0.9rem;
  margin-top: 4px;
`;

const Button = styled(motion.button)`
  padding: 14px 24px;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary} 0%, 
    ${props => props.theme.colors.primaryDark} 100%
  );
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 16px;
  transition: all 0.3s ease;
  width: 100%;
  position: relative;
  z-index: 1;
  
  &:hover {
    filter: brightness(1.05);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(${props => props.theme.colors.primaryRgb}, 0.4);
  }
  
  &:disabled {
    background: ${props => props.theme.colors.disabled || '#cccccc'};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const Message = styled(motion.div)`
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 1rem;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const SuccessMessage = styled(Message)`
  color: ${props => props.theme.colors.success || '#2e7d32'};
  background-color: ${props => props.theme.colors.successLight || 'rgba(46, 125, 50, 0.1)'};
  border: 1px solid ${props => props.theme.colors.success || '#2e7d32'};
`;

const ErrorMessage = styled(Message)`
  color: ${props => props.theme.colors.error || '#d32f2f'};
  background-color: ${props => props.theme.colors.errorLight || 'rgba(211, 47, 47, 0.1)'};
  border: 1px solid ${props => props.theme.colors.error || '#d32f2f'};
`;

const InfoMessage = styled(Message)`
  color: ${props => props.theme.colors.info || '#0288d1'};
  background-color: ${props => props.theme.colors.infoLight || 'rgba(2, 136, 209, 0.1)'};
  border: 1px solid ${props => props.theme.colors.info || '#0288d1'};
`;

const ErrorContainer = styled(motion.div)`
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
  padding: 30px;
  border-radius: 12px;
  background-color: ${props => props.theme.colors.cardBackground || props.theme.colors.background};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const ErrorTitle = styled.h2`
  color: ${props => props.theme.colors.error || '#d32f2f'};
  margin-bottom: 16px;
`;

const ErrorText = styled.p`
  margin-bottom: 20px;
  color: ${props => props.theme.colors.textSecondary};
`;

const RefreshButton = styled(motion.button)`
  padding: 12px 24px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

/**
 * Waitlist Component
 * This component allows users to join the waitlist for the Kairo application.
 * It includes form validation, API integration, fallback mode, and error handling.
 */
const Waitlist = () => {
  // Form state
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [fatalError, setFatalError] = useState(false);
  
  // Check if API is available on component mount
  useEffect(() => {
    const checkApiAvailability = async () => {
      try {
        // This is a lightweight ping to check if the API is available
        const ping = await secureClient.get('ping', { 
          timeout: 5000,
          // Add a cache buster to prevent caching
          headers: { 'Cache-Control': 'no-cache, no-store' }
        });
        if (ping.status === 200) {
          setIsOfflineMode(false);
        } else {
          console.warn('API responded but with non-200 status:', ping.status);
          setIsOfflineMode(true);
        }
      } catch (error) {
        console.warn('Failed to reach API, enabling offline mode:', error);
        setIsOfflineMode(true);
      }
    };
    
    checkApiAvailability();
  }, []);

  // Helper for timeouts
  const withTimeout = (promise, timeoutMs) => {
    let timeoutId;
    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error(`Request timed out after ${timeoutMs}ms`));
      }, timeoutMs);
    });
    
    return Promise.race([
      promise,
      timeoutPromise
    ]).finally(() => clearTimeout(timeoutId));
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!name.trim()) {
      errors.name = 'Veuillez entrer votre nom';
    }
    
    if (!email.trim()) {
      errors.email = 'Veuillez entrer votre adresse email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Veuillez entrer une adresse email valide';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // For offline mode, we'll simulate success
      if (isOfflineMode) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubmissionSuccess(true);
        setIsLoading(false);
        return;
      }
      
      // With a 10 second timeout to prevent hanging
      const response = await withTimeout(
        secureClient.waitlistMethods.addToWaitlist({ 
          name, 
          email 
        }),
        10000
      );
      
      if (response && response.success) {
        setSubmissionSuccess(true);
        setName('');
        setEmail('');
      } else {
        console.error('Unexpected response:', response);
        setApiError('Un problème est survenu lors de votre inscription à la liste d\'attente. Veuillez réessayer plus tard.');
      }
    } catch (error) {
      console.error('Error submitting waitlist form:', error);
      
      if (error.message && error.message.includes('timeout')) {
        setApiError('La requête a expiré. Nos serveurs peuvent être en surcharge. Veuillez réessayer plus tard.');
      } else if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 409) {
          setApiError('Cette adresse email est déjà sur notre liste d\'attente. Merci pour votre intérêt !');
        } else if (error.response.status === 400) {
          setApiError('Veuillez vérifier vos informations et réessayer.');
        } else {
          setApiError(`Une erreur est survenue (${error.response.status}). Veuillez réessayer plus tard.`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        setIsOfflineMode(true);
        setApiError('Impossible de se connecter à nos serveurs. Veuillez vérifier votre connexion internet et réessayer.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setApiError('Une erreur inattendue est survenue. Veuillez réessayer plus tard.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle page refresh
  const handleRefresh = () => {
    window.location.reload();
  };

  // If there's a fatal error, show the error container
  if (fatalError) {
    return (
      <WaitlistContainer>
        <CenteredContent>
          <ErrorContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ErrorTitle>Un problème est survenu</ErrorTitle>
            <ErrorText>Nous rencontrons des difficultés pour charger la page de liste d'attente. Veuillez rafraîchir.</ErrorText>
            <RefreshButton 
              onClick={handleRefresh}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Rafraîchir la page
            </RefreshButton>
          </ErrorContainer>
        </CenteredContent>
      </WaitlistContainer>
    );
  }

  return (
    <WaitlistContainer>
      <CenteredContent>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Rejoignez notre liste d'attente
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Soyez parmi les premiers à accéder à notre plateforme innovante lors de son lancement.
        </Subtitle>
        
        {isOfflineMode && (
          <InfoMessage
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Note : Vous consultez cette page en mode hors ligne. Les soumissions de formulaire seront simulées.
          </InfoMessage>
        )}
        
        <FormContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {submissionSuccess ? (
            <SuccessMessage
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Merci de vous être inscrit à notre liste d'attente ! Nous vous informerons lors de notre lancement.
            </SuccessMessage>
          ) : (
            <form onSubmit={handleSubmit}>
              {apiError && (
                <ErrorMessage
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {apiError}
                </ErrorMessage>
              )}
              
              <InputGroup>
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Entrez votre nom complet"
                  hasError={!!validationErrors.name}
                  disabled={isLoading}
                />
                {validationErrors.name && <InputError>{validationErrors.name}</InputError>}
              </InputGroup>
              
              <InputGroup>
                <Label htmlFor="email">Adresse email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Entrez votre adresse email"
                  hasError={!!validationErrors.email}
                  disabled={isLoading}
                />
                {validationErrors.email && <InputError>{validationErrors.email}</InputError>}
              </InputGroup>
              
              <Button 
                type="submit" 
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {isLoading ? <LoadingSpinner /> : 'Rejoindre la liste d\'attente'}
              </Button>
            </form>
          )}
        </FormContainer>
      </CenteredContent>
    </WaitlistContainer>
  );
};

export default Waitlist;
