import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { supabase } from '../utils/supabase'

const WaitlistContainer = styled.div`
  min-height: 100vh;
  background-color: var(--background-alt);
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
    background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.03) 0%, rgba(var(--primary-rgb), 0.01) 100%);
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
  align-items: center;

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
  color: var(--text-primary);
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
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
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  color: var(--text-secondary);

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

const FormSection = styled(motion.div)`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.05);
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const InputGroup = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 568px) {
    flex-direction: column;
  }
`

const FormGroup = styled.div`
  flex: 1;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-primary);
  font-size: 0.95rem;
`

const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1rem;
  border: 2px solid #f0f0f5;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: #f9f9ff;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    background: white;
    box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
  }
`

const Select = styled.select`
  width: 100%;
  padding: 0.9rem 1rem;
  border: 2px solid #f0f0f5;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: #f9f9ff;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    background: white;
    box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
  }
`

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
  margin-top: 1rem;
  
  &:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(var(--primary-rgb), 0.2);
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
  font-weight: 500;
`

const ErrorMessage = styled(motion.div)`
  text-align: center;
  color: #dc2626;
  background: #fef2f2;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  font-weight: 500;
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
            <InputGroup>
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
            </InputGroup>

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

            <InputGroup>
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
            </InputGroup>

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
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
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