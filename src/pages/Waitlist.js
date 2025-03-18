import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { supabase } from '../utils/supabase'

const WaitlistContainer = styled.div`
  min-height: 100vh;
  background: var(--gradient-primary);
  padding: 120px 5% 80px;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.1), transparent);
    z-index: 1;
  }
`

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const InfoSection = styled.div`
  background: var(--glass-background);
  padding: 3rem;
  border-radius: 24px;
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
`

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Inter', sans-serif;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  max-width: 500px;

  @media (max-width: 968px) {
    margin: 0 auto 2rem;
  }
`

const BenefitsList = styled(motion.ul)`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
`

const BenefitItem = styled(motion.li)`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: var(--text-primary);

  svg {
    width: 24px;
    height: 24px;
    margin-right: 1rem;
    color: var(--primary);
  }

  @media (max-width: 968px) {
    justify-content: center;
  }
`

const FormSection = styled.div`
  background: var(--glass-background);
  padding: 3rem;
  border-radius: 24px;
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
`

const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--glass-border);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
  }
`

const Select = styled.select`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--glass-border);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);

  option {
    background: var(--primary-dark);
    color: white;
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
  }
`

const SubmitButton = styled.button`
  padding: 1rem;
  border-radius: 8px;
  border: none;
  background: white;
  color: var(--primary);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--glass-shadow);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

const SuccessMessage = styled(motion.div)`
  text-align: center;
  color: #059669;
  background: #ecfdf5;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
`

const ErrorMessage = styled(motion.div)`
  text-align: center;
  color: #dc2626;
  background: #fef2f2;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
`

const Waitlist = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    userType: ''
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([formData])

      if (error) throw error

      setStatus({
        type: 'success',
        message: 'Merci de votre inscription ! Nous vous contacterons bientôt.'
      })
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        userType: ''
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Une erreur est survenue. Veuillez réessayer.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  }

  return (
    <WaitlistContainer>
      <ContentWrapper>
        <InfoSection
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Title variants={itemVariants}>
            Rejoignez l'avenir de l'immobilier
          </Title>
          <Description variants={itemVariants}>
            Soyez parmi les premiers à découvrir notre plateforme révolutionnaire 
            qui transforme l'expérience immobilière au Sénégal.
          </Description>
          
          <BenefitsList variants={containerVariants}>
            <BenefitItem variants={itemVariants}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
              Accès prioritaire aux nouvelles fonctionnalités
            </BenefitItem>
            <BenefitItem variants={itemVariants}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
              Support dédié pour votre onboarding
            </BenefitItem>
            <BenefitItem variants={itemVariants}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
              Offres exclusives pour les premiers inscrits
            </BenefitItem>
          </BenefitsList>
        </InfoSection>

        <FormSection
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="lastName">Nom</Label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="company">Entreprise</Label>
              <Input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="userType">Je suis</Label>
              <Select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionnez votre profil</option>
                <option value="agent">Agent immobilier</option>
                <option value="developer">Promoteur</option>
                <option value="buyer">Acheteur</option>
                <option value="seller">Vendeur</option>
                <option value="partner">Partenaire</option>
              </Select>
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Inscription...' : 'Rejoindre la liste d\'attente'}
            </SubmitButton>

            {status.type === 'success' && (
              <SuccessMessage
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {status.message}
              </SuccessMessage>
            )}

            {status.type === 'error' && (
              <ErrorMessage
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {status.message}
              </ErrorMessage>
            )}
          </Form>
        </FormSection>
      </ContentWrapper>
    </WaitlistContainer>
  )
}

export default Waitlist 