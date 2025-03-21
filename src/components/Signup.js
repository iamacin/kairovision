import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const SignupContainer = styled.div`
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

const LoginLink = styled.p`
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

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  
  &:before, &:after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #ddd;
  }
  
  span {
    margin: 0 10px;
    color: #666;
    font-size: 14px;
    text-transform: uppercase;
  }
`;

const SocialButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
  
  &:hover {
    background-color: #f7f7f7;
    border-color: #ccc;
  }
  
  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`;

const GoogleButton = styled(SocialButton)`
  color: #555;
  
  &:hover {
    background-color: #f8f8f8;
  }
`;

const FacebookButton = styled(SocialButton)`
  color: #3b5998;
  
  &:hover {
    background-color: #f0f2f7;
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

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();
  const { signup, signInWithGoogle, signInWithFacebook } = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      // Validate inputs
      if (!fullName.trim()) {
        throw new Error('Full name is required');
      }
      
      if (!email.trim()) {
        throw new Error('Email is required');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      // Attempt signup
      await signup(email, password, { fullName });
      
      setSuccess('Account created successfully! Check your email for verification link.');
      
      // Clear inputs
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message || 'Failed to create account.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setSocialLoading('google');
    
    try {
      const { url } = await signInWithGoogle();
      // Redirect to Google authentication page
      window.location.href = url;
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError(error.message || 'Failed to sign in with Google.');
      setSocialLoading('');
    }
  };

  const handleFacebookSignIn = async () => {
    setError('');
    setSocialLoading('facebook');
    
    try {
      const { url } = await signInWithFacebook();
      // Redirect to Facebook authentication page
      window.location.href = url;
    } catch (error) {
      console.error('Facebook sign-in error:', error);
      setError(error.message || 'Failed to sign in with Facebook.');
      setSocialLoading('');
    }
  };
  
  return (
    <SignupContainer>
      <Title>Create Account</Title>
      
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </InputGroup>
        
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
        
        <InputGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
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
            placeholder="Confirm your password"
            required
          />
        </InputGroup>
        
        <Button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </Button>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
      </Form>
      
      <OrDivider>
        <span>Or</span>
      </OrDivider>
      
      <SocialButtonsContainer>
        <GoogleButton 
          onClick={handleGoogleSignIn} 
          disabled={loading || Boolean(socialLoading)}
          type="button"
        >
          {socialLoading === 'google' ? 'Connecting...' : (
            <>
              <img src="/images/google-icon.svg" alt="Google" />
              Sign up with Google
            </>
          )}
        </GoogleButton>
        
        <FacebookButton 
          onClick={handleFacebookSignIn} 
          disabled={loading || Boolean(socialLoading)}
          type="button"
        >
          {socialLoading === 'facebook' ? 'Connecting...' : (
            <>
              <img src="/images/facebook-icon.svg" alt="Facebook" />
              Sign up with Facebook
            </>
          )}
        </FacebookButton>
      </SocialButtonsContainer>
      
      <LoginLink>
        Already have an account? <Link to="/login">Login</Link>
      </LoginLink>
    </SignupContainer>
  );
};

export default Signup; 