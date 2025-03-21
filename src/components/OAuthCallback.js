import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const CallbackContainer = styled.div`
  max-width: 500px;
  margin: 100px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #2a2a2a;
`;

const Loader = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid #4a90e2;
  animation: spin 1s linear infinite;
  margin: 20px 0;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Message = styled.p`
  margin: 15px 0;
  color: #666;
  line-height: 1.5;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-top: 15px;
  padding: 15px;
  background-color: #fdecea;
  border-radius: 4px;
  text-align: center;
`;

const OAuthCallback = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('Completing authentication...');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { handleOAuthCallback } = useAuth();
  
  useEffect(() => {
    async function processCallback() {
      try {
        // Parse hash fragment or query parameters
        const hash = location.hash.substring(1);
        const queryParams = new URLSearchParams(hash || location.search);
        
        // Extract needed parameters
        const accessToken = queryParams.get('access_token');
        const refreshToken = queryParams.get('refresh_token');
        const expiresIn = queryParams.get('expires_in');
        const provider = queryParams.get('provider') || 'unknown';
        
        if (!accessToken) {
          throw new Error('No access token found in the callback. Authentication failed.');
        }
        
        setMessage(`Completing ${provider} authentication...`);
        
        // Process the OAuth callback
        await handleOAuthCallback({
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: expiresIn
        });
        
        // Success! Redirect to dashboard
        setMessage('Authentication successful! Redirecting...');
        setTimeout(() => navigate('/dashboard'), 1500);
        
      } catch (error) {
        console.error('OAuth callback error:', error);
        setError(error.message || 'Failed to complete authentication.');
        setLoading(false);
      }
    }
    
    processCallback();
  }, [location, navigate, handleOAuthCallback]);
  
  return (
    <CallbackContainer>
      <Title>Authentication in Progress</Title>
      
      {loading && <Loader />}
      
      <Message>{message}</Message>
      
      {error && (
        <ErrorMessage>
          <p><strong>Error:</strong> {error}</p>
          <p>Please try logging in again.</p>
        </ErrorMessage>
      )}
    </CallbackContainer>
  );
};

export default OAuthCallback; 