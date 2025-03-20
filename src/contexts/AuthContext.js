import React, { createContext, useState, useContext, useEffect } from 'react';
import secureClient from '../utils/supabase';

// Create the authentication context
const AuthContext = createContext(null);

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if we have a token
        if (secureClient.isAuthenticated()) {
          // Validate the token and get user info
          const { user } = await secureClient.getCurrentUser();
          setUser(user);
        }
      } catch (error) {
        console.error('Failed to load user:', error);
        setError(error.message);
        // Clear any invalid auth state
        await secureClient.signOut();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await secureClient.signIn(email, password);
      setUser(result.user);
      
      return result;
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      
      await secureClient.signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign up function
  const signup = async (email, password, metadata = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await secureClient.signUp(email, password, metadata);
      setUser(result.user);
      
      return result;
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Check if user has a specific role
  const hasRole = (requiredRole) => {
    if (!user) return false;
    return user.role === requiredRole;
  };

  // Authentication values to be provided
  const value = {
    user,
    loading,
    error,
    login,
    logout,
    signup,
    hasRole,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 