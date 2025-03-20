import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 5rem;
  font-weight: 800;
  margin-bottom: 0;
  background: ${({ theme }) => theme?.gradients?.primary || 'linear-gradient(135deg, #8a2be2, #6a1cb7)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme?.colors?.textSecondary || '#666666'};
`;

const StyledLink = styled(Link)`
  background-color: ${({ theme }) => theme?.colors?.primary || '#8a2be2'};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme?.colors?.primaryDark || '#6a1cb7'};
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(138, 43, 226, 0.2);
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Subtitle>La page que vous recherchez n'existe pas</Subtitle>
      <StyledLink to="/">Retour à l'accueil</StyledLink>
    </NotFoundContainer>
  );
};

export default NotFound; 