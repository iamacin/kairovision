import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const ResetPasswordContainer = styled.div`
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

const PasswordRequirements = styled.ul`
  margin: 5px 0 15px;
  padding-left: 20px;
  color: #666;
  font-size: 14px;
`;

const RequirementItem = styled.li`
  margin-bottom: 3px;
`;

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [invalidToken, setInvalidToken] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { resetPassword } = useAuth();
  
  // Extract token from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (!queryParams.get('token')) {
      setError('Invalid or missing reset token. Please request a new password reset.');
      setInvalidToken(true);
    }
  }, [location]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      // Validate passwords
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get('token');
      
      if (!token) {
        throw new Error('Invalid or missing reset token');
      }
      
      // Reset password
      await resetPassword(token, password);
      
      setSuccess('Your password has been successfully reset!');
      
      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (error) {
      console.error('Reset password error:', error);
      setError(error.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ResetPasswordContainer>
      <Title>Set New Password</Title>
      
      <Description>
        Enter your new password below.
      </Description>
      
      {!invalidToken ? (
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
            <PasswordRequirements>
              <RequirementItem>At least 6 characters long</RequirementItem>
              <RequirementItem>Include a mix of letters, numbers, and special characters for better security</RequirementItem>
            </PasswordRequirements>
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
          </InputGroup>
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
        </Form>
      ) : (
        <ErrorMessage>{error}</ErrorMessage>
      )}
      
      <BackToLogin>
        <Link to="/login">Back to Login</Link>
      </BackToLogin>
    </ResetPasswordContainer>
  );
};

export default ResetPassword; 