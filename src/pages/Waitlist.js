import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { secureClient } from '../utils/supabase';
import LoadingSpinner from '../components/LoadingSpinner';

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

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: ${props => props.theme.colors.text};
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 40px;
  color: ${props => props.theme.colors.textSecondary};
  max-width: 600px;
  text-align: center;
`;

const FormContainer = styled.div`
  background-color: ${props => props.theme.colors.cardBackground};
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 600px;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${props => props.hasError ? props.theme.colors.error : props.theme.colors.border};
  font-size: 1rem;
  background-color: ${props => props.theme.colors.inputBackground};
  color: ${props => props.theme.colors.text};
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? props.theme.colors.error : props.theme.colors.primary};
  }
`;

const InputError = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: 0.9rem;
  margin-top: 4px;
`;

const Button = styled.button`
  padding: 14px 24px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 16px;
  transition: background-color 0.2s;
  width: 100%;
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }
  
  &:disabled {
    background-color: ${props => props.theme.colors.disabled};
    cursor: not-allowed;
  }
`;

const Message = styled.div`
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 1rem;
  text-align: center;
`;

const SuccessMessage = styled(Message)`
  color: ${props => props.theme.colors.success};
  background-color: ${props => props.theme.colors.successLight};
  border: 1px solid ${props => props.theme.colors.success};
`;

const ErrorMessage = styled(Message)`
  color: ${props => props.theme.colors.error};
  background-color: ${props => props.theme.colors.errorLight};
  border: 1px solid ${props => props.theme.colors.error};
`;

const InfoMessage = styled(Message)`
  color: ${props => props.theme.colors.info};
  background-color: ${props => props.theme.colors.infoLight};
  border: 1px solid ${props => props.theme.colors.info};
`;

const ErrorContainer = styled.div`
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
  padding: 30px;
  border-radius: 12px;
  background-color: ${props => props.theme.colors.cardBackground};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const ErrorTitle = styled.h2`
  color: ${props => props.theme.colors.error};
  margin-bottom: 16px;
`;

const ErrorText = styled.p`
  margin-bottom: 20px;
  color: ${props => props.theme.colors.textSecondary};
`;

const RefreshButton = styled.button`
  padding: 12px 24px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
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
        const ping = await secureClient.get('/ping', { timeout: 5000 });
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
      errors.name = 'Name is required';
    }
    
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
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
        secureClient.post('/waitlist', { 
          name, 
          email 
        }),
        10000
      );
      
      if (response.status === 200 || response.status === 201) {
        setSubmissionSuccess(true);
        setName('');
        setEmail('');
      } else {
        console.error('Unexpected response status:', response.status);
        setApiError('There was an issue adding you to the waitlist. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting waitlist form:', error);
      
      if (error.message.includes('timeout')) {
        setApiError('The request timed out. Our servers might be experiencing high load. Please try again later.');
      } else if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 409) {
          setApiError('This email is already on our waitlist. Thank you for your interest!');
        } else if (error.response.status === 400) {
          setApiError('Please check your information and try again.');
        } else {
          setApiError(`Something went wrong (${error.response.status}). Please try again later.`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        setIsOfflineMode(true);
        setApiError('Could not connect to our servers. Please check your internet connection and try again.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setApiError('An unexpected error occurred. Please try again later.');
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
          <ErrorContainer>
            <ErrorTitle>Something went wrong</ErrorTitle>
            <ErrorText>We're having trouble loading the waitlist page. Please try refreshing.</ErrorText>
            <RefreshButton onClick={handleRefresh}>Refresh Page</RefreshButton>
          </ErrorContainer>
        </CenteredContent>
      </WaitlistContainer>
    );
  }

  return (
    <WaitlistContainer>
      <CenteredContent>
        <Title>Join Our Waitlist</Title>
        <Subtitle>Be among the first to access our innovative platform when we launch.</Subtitle>
        
        {isOfflineMode && (
          <InfoMessage>
            Note: You're viewing this page in offline mode. Form submissions will be simulated.
          </InfoMessage>
        )}
        
        <FormContainer>
          {submissionSuccess ? (
            <SuccessMessage>
              Thank you for joining our waitlist! We'll notify you when we launch.
            </SuccessMessage>
          ) : (
            <form onSubmit={handleSubmit}>
              {apiError && <ErrorMessage>{apiError}</ErrorMessage>}
              
              <InputGroup>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  hasError={!!validationErrors.name}
                  disabled={isLoading}
                />
                {validationErrors.name && <InputError>{validationErrors.name}</InputError>}
              </InputGroup>
              
              <InputGroup>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  hasError={!!validationErrors.email}
                  disabled={isLoading}
                />
                {validationErrors.email && <InputError>{validationErrors.email}</InputError>}
              </InputGroup>
              
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <LoadingSpinner /> : 'Join Waitlist'}
              </Button>
            </form>
          )}
        </FormContainer>
      </CenteredContent>
    </WaitlistContainer>
  );
};

export default Waitlist;
