import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const LoginContainer = styled.div`
  min-height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt || '#f9f9ff'};
  position: relative;
  overflow: hidden;
  
  /* Tech pattern background */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 20%, rgba(${({ theme }) => theme.colors.primaryRgb || '138, 43, 226'}, 0.03) 0%, transparent 25%),
      radial-gradient(circle at 80% 80%, rgba(${({ theme }) => theme.colors.primaryRgb || '138, 43, 226'}, 0.03) 0%, transparent 25%),
      repeating-linear-gradient(
        rgba(255, 255, 255, 0.03) 0px,
        rgba(255, 255, 255, 0.03) 1px,
        transparent 1px,
        transparent 20px
      ),
      repeating-linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.03) 0px,
        rgba(255, 255, 255, 0.03) 1px,
        transparent 1px,
        transparent 20px
      );
    pointer-events: none;
    z-index: 0;
  }
`;

const FormCard = styled(motion.div)`
  width: 100%;
  max-width: 450px;
  padding: 40px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background || '#ffffff'};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 1;
  overflow: hidden;
  
  /* Glass morphism effect */
  backdrop-filter: blur(10px);
  border: 1px solid rgba(${({ theme }) => theme.colors.primaryRgb || '138, 43, 226'}, 0.1);
  
  /* Subtle gradient background */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(${({ theme }) => theme.colors.primaryRgb || '138, 43, 226'}, 0.03) 0%,
      transparent 50%,
      rgba(${({ theme }) => theme.colors.primaryRgb || '138, 43, 226'}, 0.01) 100%
    );
    z-index: -1;
  }
  
  /* Glossy shine effect */
  &::after {
    content: '';
    position: absolute;
    top: -100%;
    left: -100%;
    width: 300%;
    height: 300%;
    background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.05) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: rotate(30deg);
    z-index: -1;
    animation: shineEffect 8s infinite linear;
  }
  
  @keyframes shineEffect {
    0% {
      transform: translateX(-50%) rotate(30deg);
    }
    100% {
      transform: translateX(50%) rotate(30deg);
    }
  }
  
  @media (max-width: 500px) {
    padding: 30px 20px;
  }
`;

const Title = styled(motion.h1)`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 10px;
  text-align: center;
`;

const Subtitle = styled(motion.p)`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 30px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 15px 15px 45px;
  border: 1px solid ${({ hasError, theme }) => 
    hasError ? theme.colors.error : theme.colors.border || 'rgba(0, 0, 0, 0.1)'};
  border-radius: 10px;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.colors.inputBackground || 'rgba(255, 255, 255, 0.8)'};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ hasError, theme }) => 
      hasError ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(${({ theme }) => theme.colors.primaryRgb || '138, 43, 226'}, 0.1);
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary || '#aaa'};
  }
`;

const InputError = styled.div`
  color: ${({ theme }) => theme.colors.error || '#d32f2f'};
  font-size: 0.85rem;
  margin-top: 5px;
  margin-left: 8px;
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.primaryDark} 100%
  );
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
  position: relative;
  overflow: hidden;
  
  /* Glossy effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0) 50%,
      rgba(0, 0, 0, 0.1) 100%
    );
    pointer-events: none;
  }
  
  &:disabled {
    background: ${({ theme }) => theme.colors.disabled || '#cccccc'};
    cursor: not-allowed;
    &::before {
      opacity: 0.5;
    }
  }
`;

const ErrorMessage = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.errorLight || 'rgba(211, 47, 47, 0.1)'};
  color: ${({ theme }) => theme.colors.error || '#d32f2f'};
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.error || '#d32f2f'};
  font-size: 0.9rem;
  margin-bottom: 20px;
  text-align: center;
`;

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  font-size: 0.9rem;
`;

const TextLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
    text-decoration: underline;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  
  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.border || 'rgba(0, 0, 0, 0.1)'};
  }
  
  span {
    padding: 0 15px;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.9rem;
  }
`;

const WaitlistLink = styled(motion(Link))`
  display: block;
  text-align: center;
  padding: 15px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      120deg,
      rgba(${({ theme }) => theme.colors.primaryRgb || '138, 43, 226'}, 0) 0%,
      rgba(${({ theme }) => theme.colors.primaryRgb || '138, 43, 226'}, 0.05) 20%,
      rgba(${({ theme }) => theme.colors.primaryRgb || '138, 43, 226'}, 0) 40%
    );
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  &:hover {
    background-color: rgba(${({ theme }) => theme.colors.primaryRgb}, 0.05);
    transform: translateY(-2px);
    
    &::after {
      opacity: 1;
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!email.trim()) {
      newErrors.email = 'L\'adresse email est requise';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'L\'adresse email est invalide';
    }
    
    if (!password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setLoginError(result.message || 'Une erreur est survenue lors de la connexion');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(
        error.message || 'Une erreur est survenue lors de la connexion. Veuillez réessayer.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <LoginContainer>
      <FormCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Se connecter
        </Title>
        <Subtitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Accédez à votre compte Kairo
        </Subtitle>
        
        {loginError && (
          <ErrorMessage
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {loginError}
          </ErrorMessage>
        )}
        
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <InputIcon>
              <FiMail />
            </InputIcon>
            <Input
              type="email"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              hasError={!!errors.email}
            />
            {errors.email && <InputError>{errors.email}</InputError>}
          </InputGroup>
          
          <InputGroup>
            <InputIcon>
              <FiLock />
            </InputIcon>
            <Input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              hasError={!!errors.password}
            />
            {errors.password && <InputError>{errors.password}</InputError>}
          </InputGroup>
          
          <SubmitButton
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            {isLoading ? <LoadingSpinner /> : (
              <>
                Se connecter <FiArrowRight />
              </>
            )}
          </SubmitButton>
        </Form>
        
        <Options>
          <TextLink to="/forgot-password">Mot de passe oublié?</TextLink>
        </Options>
        
        <Divider>
          <span>ou</span>
        </Divider>
        
        <WaitlistLink 
          to="/waitlist"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Rejoindre la liste d'attente
        </WaitlistLink>
      </FormCard>
    </LoginContainer>
  );
};

export default Login; 