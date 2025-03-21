import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const LoginContainer = styled.div`
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

const ForgotPassword = styled.p`
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

const SignupLink = styled.p`
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signInWithGoogle, signInWithFacebook } = useAuth();

  // Get redirect path from location state or default to dashboard
  const redirectPath = location.state?.from?.pathname || '/dashboard';

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // The AuthContext's currentUser state will handle this
      } catch (error) {
        console.error('Error checking authentication:', error);
        // If token is invalid, we stay on login page
      }
    };
    
    checkAuth();
  }, [navigate, redirectPath]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      // Validate inputs
      if (!email.trim()) {
        throw new Error('Email is required');
      }
      
      if (!password) {
        throw new Error('Password is required');
      }
      
      // Attempt login
      await login(email, password);
      
      setSuccess('Login successful! Redirecting...');
      
      // Redirect after successful login (with small delay for UX)
      setTimeout(() => {
        navigate(redirectPath, { replace: true });
      }, 1500);
      
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to login. Please check your credentials.');
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
    <LoginContainer>
      <Title>Login to Kairo</Title>
      
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
        </InputGroup>
        
        <Button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
      </Form>
      
      <ForgotPassword>
        <Link to="/forgot-password">Forgot password?</Link>
      </ForgotPassword>
      
      <OrDivider>
        <span>Or</span>
      </OrDivider>
      
      <SocialButtonsContainer>
        <GoogleButton 
          onClick={handleGoogleSignIn} 
          disabled={loading || Boolean(socialLoading)}
        >
          {socialLoading === 'google' ? 'Connecting...' : (
            <>
              <img src="/images/google-icon.svg" alt="Google" />
              Sign in with Google
            </>
          )}
        </GoogleButton>
        
        <FacebookButton 
          onClick={handleFacebookSignIn} 
          disabled={loading || Boolean(socialLoading)}
        >
          {socialLoading === 'facebook' ? 'Connecting...' : (
            <>
              <img src="/images/facebook-icon.svg" alt="Facebook" />
              Sign in with Facebook
            </>
          )}
        </FacebookButton>
      </SocialButtonsContainer>
      
      <SignupLink>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </SignupLink>
    </LoginContainer>
  );
};

export default Login; 