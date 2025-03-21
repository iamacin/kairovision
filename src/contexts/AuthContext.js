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
  const [userProfile, setUserProfile] = useState(null);

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
          
          // Set user profile from metadata
          if (user?.user_metadata) {
            setUserProfile({
              fullName: user.user_metadata.fullName || '',
              phoneNumber: user.user_metadata.phoneNumber || '',
              bio: user.user_metadata.bio || '',
              avatarUrl: user.user_metadata.avatarUrl || '',
              preferences: user.user_metadata.preferences || {}
            });
          }
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
      
      // Set user profile from metadata
      if (result.user?.user_metadata) {
        setUserProfile({
          fullName: result.user.user_metadata.fullName || '',
          phoneNumber: result.user.user_metadata.phoneNumber || '',
          bio: result.user.user_metadata.bio || '',
          avatarUrl: result.user.user_metadata.avatarUrl || '',
          preferences: result.user.user_metadata.preferences || {}
        });
      }
      
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
      setUserProfile(null);
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
      
      // Initialize user profile
      const initialProfile = {
        fullName: metadata.fullName || '',
        phoneNumber: metadata.phoneNumber || '',
        bio: metadata.bio || '',
        avatarUrl: metadata.avatarUrl || '',
        preferences: metadata.preferences || {}
      };
      
      setUserProfile(initialProfile);
      
      return result;
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Password reset request
  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await secureClient.forgotPassword(email);
      return result;
    } catch (error) {
      console.error('Password reset request error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Reset password with token
  const resetPassword = async (password) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await secureClient.resetPassword(password);
      return result;
    } catch (error) {
      console.error('Password reset error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Google sign in
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await secureClient.signInWithGoogle();
      
      // Redirect to Google authorization page
      if (result.url) {
        window.location.href = result.url;
      }
      
      return result;
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Facebook sign in
  const signInWithFacebook = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await secureClient.signInWithFacebook();
      
      // Redirect to Facebook authorization page
      if (result.url) {
        window.location.href = result.url;
      }
      
      return result;
    } catch (error) {
      console.error('Facebook sign-in error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Handle OAuth callback
  const handleOAuthCallback = async (access_token, refresh_token) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await secureClient.handleOAuthCallback(access_token, refresh_token);
      setUser(result.user);
      
      // Set user profile from metadata
      if (result.user?.user_metadata) {
        setUserProfile({
          fullName: result.user.user_metadata.fullName || '',
          phoneNumber: result.user.user_metadata.phoneNumber || '',
          bio: result.user.user_metadata.bio || '',
          avatarUrl: result.user.user_metadata.avatarUrl || '',
          preferences: result.user.user_metadata.preferences || {}
        });
      }
      
      return result;
    } catch (error) {
      console.error('OAuth callback error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await secureClient.updateProfile(profileData);
      
      // Update local profile state
      setUserProfile(prev => ({
        ...prev,
        ...profileData
      }));
      
      return result;
    } catch (error) {
      console.error('Profile update error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Upload avatar
  const uploadAvatar = async (file) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await secureClient.uploadAvatar(file);
      
      // Update local profile state with new avatar URL
      if (result.avatarUrl) {
        setUserProfile(prev => ({
          ...prev,
          avatarUrl: result.avatarUrl
        }));
      }
      
      return result;
    } catch (error) {
      console.error('Avatar upload error:', error);
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
    userProfile,
    loading,
    error,
    login,
    logout,
    signup,
    forgotPassword,
    resetPassword,
    signInWithGoogle,
    signInWithFacebook,
    handleOAuthCallback,
    updateProfile,
    uploadAvatar,
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