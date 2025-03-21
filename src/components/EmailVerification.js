import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const VerificationContainer = styled.div`
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

const Message = styled.p`
  margin: 15px 0;
  color: #666;
  line-height: 1.5;
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

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-top: 15px;
  padding: 15px;
  background-color: #fdecea;
  border-radius: 4px;
  text-align: center;
`;

const SuccessMessage = styled.div`
  color: #27ae60;
  margin-top: 15px;
  padding: 15px;
  background-color: #eafaf1;
  border-radius: 4px;
  text-align: center;
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 12px 20px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s;
  margin-top: 20px;

  &:hover {
    background-color: #3a7bc8;
  }
`;

const EmailVerification = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyEmail } = useAuth();
  
  useEffect(() => {
    async function verifyUserEmail() {
      try {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        
        if (!token) {
          throw new Error('Invalid or missing verification token.');
        }
        
        // Call the API to verify the email
        await verifyEmail(token);
        setSuccess(true);
        
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
        
      } catch (error) {
        console.error('Email verification error:', error);
        setError(error.message || 'Failed to verify email address.');
      } finally {
        setLoading(false);
      }
    }
    
    verifyUserEmail();
  }, [location, navigate, verifyEmail]);
  
  return (
    <VerificationContainer>
      <Title>Email Verification</Title>
      
      {loading && (
        <>
          <Loader />
          <Message>Verifying your email address...</Message>
        </>
      )}
      
      {!loading && error && (
        <>
          <ErrorMessage>{error}</ErrorMessage>
          <Message>
            The verification link may have expired or is invalid.
            Please try signing up again or contact support for assistance.
          </Message>
          <Button to="/signup">Back to Sign Up</Button>
        </>
      )}
      
      {!loading && success && (
        <>
          <SuccessMessage>Your email has been successfully verified!</SuccessMessage>
          <Message>
            Thank you for confirming your email address. You can now login to your account.
            You will be automatically redirected to the login page in a few seconds.
          </Message>
          <Button to="/login">Go to Login</Button>
        </>
      )}
    </VerificationContainer>
  );
};

export default EmailVerification; 