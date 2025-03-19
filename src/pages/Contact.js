import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiUsers } from 'react-icons/fi';

const ContactContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 120px 5% 60px;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const InfoSection = styled.div`
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 2rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  svg {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }
  
  div {
    h3 {
      font-size: 1.1rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.text};
      margin-bottom: 0.25rem;
    }
    
    p {
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.textSecondary};
      margin: 0;
    }
  }
`;

const FormSection = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajouter la logique d'envoi du formulaire ici
  };

  return (
    <ContactContainer>
      <ContentWrapper>
        <InfoSection>
          <h1>Contactez-nous</h1>
          <p>
            Notre équipe est là pour vous aider. N'hésitez pas à nous contacter 
            pour toute question concernant nos services.
          </p>
          
          <ContactInfo>
            <ContactItem>
              <FiPhone />
              <div>
                <h3>Téléphone</h3>
                <p>[Numéro]</p>
              </div>
            </ContactItem>
            
            <ContactItem>
              <FiMail />
              <div>
                <h3>Email</h3>
                <p>[Adresse email]</p>
              </div>
            </ContactItem>
            
            <ContactItem>
              <FiMapPin />
              <div>
                <h3>Adresse</h3>
                <p>[Adresse physique]</p>
              </div>
            </ContactItem>
            
            <ContactItem>
              <FiUsers />
              <div>
                <h3>Agents partenaires</h3>
                <p>Trouvez un agent partenaire près de chez vous</p>
              </div>
            </ContactItem>
          </ContactInfo>
        </InfoSection>

        <FormSection>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Nom complet"
              required
            />
            <Input
              type="email"
              placeholder="Email"
              required
            />
            <Input
              type="tel"
              placeholder="Téléphone"
            />
            <TextArea
              placeholder="Votre message"
              required
            />
            <SubmitButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
            >
              Envoyer le message
            </SubmitButton>
          </Form>
        </FormSection>
      </ContentWrapper>
    </ContactContainer>
  );
};

export default Contact; 