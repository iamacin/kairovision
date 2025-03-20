import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaHome, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const UnauthorizedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 20px;
  min-height: 60vh;
  text-align: center;
`;

const Icon = styled.div`
  font-size: 5rem;
  color: #f44336;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #2a2a2a;
`;

const Message = styled.p`
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto 30px;
  color: #666;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  background-color: ${props => props.primary ? '#4a90e2' : '#f5f5f5'};
  color: ${props => props.primary ? 'white' : '#333'};
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.primary ? '#3a7bc8' : '#e0e0e0'};
    transform: translateY(-2px);
  }
  
  svg {
    margin-right: 8px;
  }
`;

const Unauthorized = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  return (
    <UnauthorizedContainer>
      <Icon>
        <FaLock />
      </Icon>
      
      <Title>Access Denied</Title>
      
      <Message>
        Sorry, you don't have permission to access this page. 
        {isAuthenticated ? 
          ' You need higher access privileges to view this content.' : 
          ' Please log in with an account that has the required permissions.'}
      </Message>
      
      <ButtonGroup>
        <Button 
          onClick={() => navigate('/')}
        >
          <FaHome /> Go to Home
        </Button>
        
        {isAuthenticated ? (
          <Button 
            primary
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard
          </Button>
        ) : (
          <Button 
            primary
            onClick={() => navigate('/login')}
          >
            <FaSignInAlt /> Login
          </Button>
        )}
      </ButtonGroup>
    </UnauthorizedContainer>
  );
};

export default Unauthorized; 