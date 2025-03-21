import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const ForgotPasswordContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #2a2a2a;
`;

const Description = styled.p`
  text-align: center;
  margin-bottom: 20px;
  color: #666;
  line-height: 1.5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4a90e2;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3a7bc8;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-top: 15px;
  padding: 10px;
  background-color: #fdecea;
  border-radius: 4px;
  text-align: center;
`;

const SuccessMessage = styled.div`
  color: #27ae60;
  margin-top: 15px;
  padding: 10px;
  background-color: #eafaf1;
  border-radius: 4px;
  text-align: center;
`;

const BackToLogin = styled.p`
  text-align: center;
  margin-top: 15px;

  a {
    color: #4a90e2;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { forgotPassword } = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      // Validate email
      if (!email.trim()) {
        throw new Error('Email is required');
      }
      
      // Send reset password email
      await forgotPassword(email);
      
      setSuccess(
        'If your email is registered, you will receive password reset instructions shortly. ' +
        'Please check your inbox and spam folder.'
      );
      
      // Clear email input
      setEmail('');
      
    } catch (error) {
      console.error('Forgot password error:', error);
      setError(error.message || 'Failed to send password reset email.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ForgotPasswordContainer>
      <Title>Reset Your Password</Title>
      
      <Description>
        Enter your email address and we'll send you instructions to reset your password.
      </Description>
      
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </InputGroup>
        
        <Button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Instructions'}
        </Button>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
      </Form>
      
      <BackToLogin>
        <Link to="/login">Back to Login</Link>
      </BackToLogin>
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword; 