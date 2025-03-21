import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const UnauthorizedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors?.error || '#e53e3e'};
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors?.textSecondary || '#4a5568'};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled(Link)`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const PrimaryButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors?.primary || '#4a90e2'};
  color: white;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors?.primaryDark || '#3a7bc8'};
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors?.primary || '#4a90e2'};
  border: 1px solid ${({ theme }) => theme.colors?.primary || '#4a90e2'};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors?.backgroundLight || '#f7fafc'};
  }
`;

const Unauthorized = () => {
  return (
    <UnauthorizedContainer>
      <Title>Access Denied</Title>
      <Message>
        You don't have permission to access this page. Please log in with an account that has the necessary permissions, or return to the homepage.
      </Message>
      <ButtonContainer>
        <PrimaryButton to="/login">Log In</PrimaryButton>
        <SecondaryButton to="/">Return Home</SecondaryButton>
      </ButtonContainer>
    </UnauthorizedContainer>
  );
};

export default Unauthorized; 