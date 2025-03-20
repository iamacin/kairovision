import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../utils/supabase'
import { FiCheck, FiUser, FiMail, FiPhone, FiMapPin, FiLock, FiList, FiBriefcase } from 'react-icons/fi'

const WaitlistContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 120px 5% 80px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(${({ theme }) => theme.colors.primaryRgb}, 0.03) 0%, rgba(${({ theme }) => theme.colors.primaryRgb}, 0.01) 100%);
    z-index: 0;
  }
`

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`

const InfoSection = styled(motion.div)`
  @media (max-width: 968px) {
    text-align: center;
  }
`

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryDark});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2.5rem;
  max-width: 500px;

  @media (max-width: 968px) {
    margin: 0 auto 2rem;
  }
`

const StepsContainer = styled.div`
  margin-bottom: 2rem;
`

const StepsList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.border};
    transform: translateY(-50%);
    z-index: 0;
  }
`

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  
  &::before {
    content: '';
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${({ active, completed, theme }) => 
      completed ? theme.colors.primary 
      : active ? theme.colors.primaryLight
      : theme.colors.background};
    border: 2px solid ${({ completed, theme }) => 
      completed ? theme.colors.primary : theme.colors.border};
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }
`

const StepLabel = styled.span`
  font-size: 0.9rem;
  color: ${({ active, completed, theme }) => 
    completed || active ? theme.colors.primary : theme.colors.textSecondary};
  font-weight: ${({ active }) => active ? '600' : '400'};
`

const FormSection = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background};
  padding: 2.5rem;
  border-radius: ${({ theme }) => theme.layout.borderRadiusLg};
  box-shadow: ${({ theme }) => theme.shadows.medium};
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`

const Input = styled.input`
  padding: 0.8rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const Select = styled.select`
  padding: 0.8rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  background: ${({ theme, secondary }) => secondary ? 'transparent' : theme.colors.primary};
  color: ${({ theme, secondary }) => secondary ? theme.colors.primary : 'white'};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme, secondary }) => secondary ? 'rgba(138, 43, 226, 0.1)' : theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`

const ErrorMessage = styled(motion.div)`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.9rem;
  margin-top: 0.5rem;
`

const SuccessMessage = styled(motion.div)`
  color: ${({ theme }) => theme.colors.success};
  font-size: 1rem;
  line-height: 1.6;
  margin-top: 1rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.successLight || 'rgba(0, 200, 83, 0.1)'};
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.success};
`

const Waitlist = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    location: '',
    role: '',
    experience: '',
    interests: []
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.email || !formData.password || !formData.confirmPassword) {
          setError('Tous les champs sont requis');
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          setError('Les mots de passe ne correspondent pas');
          return false;
        }
        if (formData.password.length < 8) {
          setError('Le mot de passe doit contenir au moins 8 caractères');
          return false;
        }
        break;
      case 2:
        if (!formData.firstName || !formData.lastName || !formData.phone || !formData.location) {
          setError('Tous les champs sont requis');
          return false;
        }
        break;
      case 3:
        if (!formData.role || !formData.experience) {
          setError('Tous les champs sont requis');
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => prev + 1);
      setError('');
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);
    setError('');

    try {
      // Create auth user with Supabase but set their access level to 'pending'
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            access_level: 'pending'
          }
        }
      });

      if (signUpError) throw signUpError;

      // Store user details in waitlist table instead of profiles
      const { error: waitlistError } = await supabase
        .from('waitlist')
        .insert([
          {
            user_id: data.user.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            location: formData.location,
            role: formData.role,
            experience: formData.experience,
            status: 'pending',
            submission_date: new Date()
          }
        ]);

      if (waitlistError) throw waitlistError;

      setSuccess('Votre demande d'inscription a été enregistrée avec succès ! Notre équipe examinera votre profil et vous contactera par email une fois votre compte approuvé. En attendant, vous pouvez toujours parcourir les propriétés disponibles sur Kairo.');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <InputGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="votre@email.com"
              />
            </InputGroup>
            <InputGroup>
              <Label>Mot de passe</Label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="********"
              />
            </InputGroup>
            <InputGroup>
              <Label>Confirmer le mot de passe</Label>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="********"
              />
            </InputGroup>
          </>
        );
      case 2:
        return (
          <>
            <InputGroup>
              <Label>Prénom</Label>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Votre prénom"
              />
            </InputGroup>
            <InputGroup>
              <Label>Nom</Label>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Votre nom"
              />
            </InputGroup>
            <InputGroup>
              <Label>Téléphone</Label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+221 XX XXX XX XX"
              />
            </InputGroup>
            <InputGroup>
              <Label>Localisation</Label>
              <Input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Ville, Pays"
              />
            </InputGroup>
          </>
        );
      case 3:
        return (
          <>
            <InputGroup>
              <Label>Rôle</Label>
              <Select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="">Sélectionnez votre rôle</option>
                <option value="agent">Agent immobilier</option>
                <option value="buyer">Acheteur</option>
                <option value="seller">Vendeur</option>
                <option value="renter">Locataire</option>
                <option value="landlord">Propriétaire</option>
              </Select>
            </InputGroup>
            <InputGroup>
              <Label>Expérience dans l'immobilier</Label>
              <Select
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
              >
                <option value="">Sélectionnez votre expérience</option>
                <option value="0-1">0-1 an</option>
                <option value="1-3">1-3 ans</option>
                <option value="3-5">3-5 ans</option>
                <option value="5+">5+ ans</option>
              </Select>
            </InputGroup>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <WaitlistContainer>
      <ContentWrapper>
        <InfoSection
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>Rejoignez la révolution immobilière au Sénégal</Title>
          <Description>
            Inscrivez-vous dès maintenant pour faire partie des premiers utilisateurs de Kairo. 
            Bénéficiez d'un accès prioritaire et d'avantages exclusifs.
          </Description>
          
          <StepsContainer>
            <StepsList>
              <Step active={currentStep === 1} completed={currentStep > 1}>
                <StepLabel active={currentStep === 1} completed={currentStep > 1}>
                  Inscription
                </StepLabel>
              </Step>
              <Step active={currentStep === 2} completed={currentStep > 2}>
                <StepLabel active={currentStep === 2} completed={currentStep > 2}>
                  Profil
                </StepLabel>
              </Step>
              <Step active={currentStep === 3} completed={currentStep > 3}>
                <StepLabel active={currentStep === 3} completed={currentStep > 3}>
                  Préférences
                </StepLabel>
              </Step>
            </StepsList>
          </StepsContainer>
        </InfoSection>

        <FormSection
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            {error && (
              <ErrorMessage
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </ErrorMessage>
            )}

            {success && (
              <SuccessMessage
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {success}
              </SuccessMessage>
            )}

            <ButtonGroup>
              {currentStep > 1 && (
                <Button
                  type="button"
                  onClick={handleBack}
                  secondary
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Retour
                </Button>
              )}
              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Suivant
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Terminer l\'inscription'}
                </Button>
              )}
            </ButtonGroup>
          </Form>
        </FormSection>
      </ContentWrapper>
    </WaitlistContainer>
  );
};

export default Waitlist; 