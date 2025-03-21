/**
 * SecureClient: A comprehensive API client for Supabase operations
 * This client makes calls to our Netlify Functions instead of directly
 * accessing Supabase, which keeps our API keys secure.
 */

// JWT token storage key in localStorage
const TOKEN_STORAGE_KEY = 'kairovision_auth_token';

// Authentication state
let currentToken = null;
let currentUser = null;

/**
 * Load token from localStorage on initialization
 */
const loadTokenFromStorage = () => {
  if (typeof window !== 'undefined') {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (storedToken) {
      currentToken = storedToken;
      return true;
    }
  }
  return false;
};

// Try to load token on module initialization
loadTokenFromStorage();

// Set the base URL for the API requests
const API_BASE_URL = 
  process.env.NODE_ENV === 'production' 
    ? 'https://kairovision.netlify.app/.netlify/functions'
    : process.env.REACT_APP_API_URL || '/api'; // Fallback to /api for local dev

/**
 * Make a secure API request to our Netlify Functions
 * @param {string} action - The action to perform
 * @param {object} data - The data to send
 * @param {boolean} requiresAuth - Whether this action requires authentication
 * @returns {Promise<object>} The response data
 */
const secureRequest = async (action, data = {}, requiresAuth = false) => {
  try {
    // Check if authentication is required but no token is available
    if (requiresAuth && !currentToken && !loadTokenFromStorage()) {
      throw new Error('Authentication required');
    }

    // Prepare request options
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action,
        data,
        // Include token if available
        ...(currentToken && { token: currentToken })
      })
    };

    try {
      // Make the request
      const response = await fetch(`${API_BASE_URL}supabase-handler`, options);
      const result = await response.json();

      // Check if there was an error
      if (!response.ok || result.error) {
        throw new Error(result.error || result.message || 'Unknown error');
      }

      return result;
    } catch (fetchError) {
      // If in development and there was a network error (likely because the Netlify Functions
      // dev server isn't running), throw a more helpful error
      if (process.env.NODE_ENV === 'development') {
        console.error('API request failed:', fetchError);
        throw new Error('API request failed. If you\'re in development mode, make sure your Netlify Functions server is running.');
      }
      throw fetchError;
    }
  } catch (error) {
    console.error(`Error in secureRequest (${action}):`, error);
    throw error;
  }
};

/**
 * Authentication methods
 */
const authMethods = {
  /**
   * Sign in with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<object>} The user data and token
   */
  signIn: async (email, password) => {
    try {
      // Make the sign in request
      const result = await secureRequest('signIn', { email, password });
      
      // If successful, store the token
      if (result.token) {
        currentToken = result.token;
        currentUser = result.user;
        
        // Save to localStorage for persistence
        if (typeof window !== 'undefined') {
          localStorage.setItem(TOKEN_STORAGE_KEY, result.token);
        }
      }
      
      return result;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  },
  
  /**
   * Sign up a new user
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {object} metadata - Additional user metadata
   * @returns {Promise<object>} The user data and token
   */
  signUp: async (email, password, metadata = {}) => {
    try {
      // Make the sign up request
      const result = await secureRequest('signUp', { email, password, metadata });
      
      // If successful, store the token
      if (result.token) {
        currentToken = result.token;
        currentUser = result.user;
        
        // Save to localStorage for persistence
        if (typeof window !== 'undefined') {
          localStorage.setItem(TOKEN_STORAGE_KEY, result.token);
        }
      }
      
      return result;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  },
  
  /**
   * Sign out the current user
   * @returns {Promise<object>} Success message
   */
  signOut: async () => {
    try {
      // Only make the request if there is a current token
      if (currentToken) {
        await secureRequest('signOut', {}, true);
      }
      
      // Clear local state regardless of API call
      currentToken = null;
      currentUser = null;
      
      // Remove from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
      }
      
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  },
  
  /**
   * Get the current authenticated user
   * @returns {Promise<object>} The current user data
   */
  getCurrentUser: async () => {
    try {
      // Return from cache if available
      if (currentUser) {
        return { user: currentUser };
      }
      
      // Otherwise fetch from API if we have a token
      if (currentToken || loadTokenFromStorage()) {
        const result = await secureRequest('getCurrentUser', {}, true);
        currentUser = result.user;
        return result;
      }
      
      return { user: null };
    } catch (error) {
      console.error('Get current user error:', error);
      // Clear state on auth errors
      if (error.message?.includes('Invalid or expired token')) {
        currentToken = null;
        currentUser = null;
        if (typeof window !== 'undefined') {
          localStorage.removeItem(TOKEN_STORAGE_KEY);
        }
      }
      throw error;
    }
  },
  
  /**
   * Check if the user is authenticated
   * @returns {boolean} Whether the user is authenticated
   */
  isAuthenticated: () => {
    return !!currentToken;
  },
  
  /**
   * Get the current authentication token
   * @returns {string|null} The current token or null
   */
  getToken: () => currentToken,
};

/**
 * Waitlist-related methods
 */
const waitlistMethods = {
  /**
   * Add a user to the waitlist
   * @param {object} userData - User data including email, name, etc.
   * @returns {Promise<object>} Success confirmation and waitlist entry
   */
  addToWaitlist: async (userData) => {
    return await secureRequest('addToWaitlist', userData);
  },

  /**
   * Check a user's waitlist status
   * @param {string} email - Email to check
   * @returns {Promise<object>} Waitlist status information
   */
  checkWaitlistStatus: async (email) => {
    return await secureRequest('checkWaitlistStatus', { email });
  },
};

/**
 * Property-related methods
 */
const propertyMethods = {
  /**
   * Fetch premium properties
   * @param {number} limit - Maximum number of properties to fetch (default: 5)
   * @returns {Promise<object>} List of premium properties
   */
  fetchPremiumProperties: async (limit = 5) => {
    return await secureRequest('fetchPremiumProperties', { limit });
  },

  /**
   * Fetch a property by its slug
   * @param {string} slug - Property slug
   * @returns {Promise<object>} Property details
   */
  fetchPropertyBySlug: async (slug) => {
    return await secureRequest('fetchPropertyBySlug', { slug });
  },

  /**
   * Search for properties based on criteria
   * @param {object} criteria - Search criteria (location, type, price range, etc.)
   * @returns {Promise<object>} List of matching properties
   */
  searchProperties: async (criteria) => {
    return await secureRequest('searchProperties', criteria);
  },

  /**
   * Add a new property
   * @param {object} propertyData - Property details
   * @returns {Promise<object>} Created property
   */
  addProperty: async (propertyData) => {
    return await secureRequest('addProperty', propertyData, true);
  },
};

/**
 * Settings-related methods
 */
const settingsMethods = {
  /**
   * Fetch the hero image URL
   * @returns {Promise<object>} Hero image URL
   */
  fetchHeroImage: async () => {
    return await secureRequest('fetchHeroImage');
  },

  /**
   * Update the hero image
   * @param {string} path - Path to the new hero image
   * @returns {Promise<object>} Updated settings
   */
  updateHeroImage: async (path) => {
    return await secureRequest('updateHeroImage', { path }, true);
  },
};

/**
 * Storage-related methods
 */
const storageMethods = {
  /**
   * Upload an image
   * @param {string} base64Image - Base64-encoded image
   * @param {string} bucket - Storage bucket name
   * @param {string} fileName - Optional file name
   * @returns {Promise<object>} Upload result including the public URL
   */
  uploadImage: async (base64Image, bucket, fileName) => {
    return await secureRequest('uploadImage', { base64Image, bucket, fileName }, true);
  },
};

/**
 * Password reset and verification methods
 */
const passwordMethods = {
  /**
   * Request a password reset email
   * @param {string} email - User email
   * @returns {Promise<object>} Response with message
   */
  forgotPassword: async (email) => {
    return await secureRequest('forgotPassword', { email });
  },
  
  /**
   * Reset password with token
   * @param {string} password - New password
   * @returns {Promise<object>} Response with success message
   */
  resetPassword: async (password) => {
    return await secureRequest('resetPassword', { password });
  },
  
  /**
   * Verify email
   * @returns {Promise<object>} Response with success message
   */
  verifyEmail: async () => {
    return await secureRequest('verifyEmail');
  }
};

/**
 * OAuth methods
 */
const oauthMethods = {
  /**
   * Sign in with Google
   * @returns {Promise<object>} Response with redirect URL
   */
  signInWithGoogle: async () => {
    return await secureRequest('signInWithGoogle');
  },
  
  /**
   * Sign in with Facebook
   * @returns {Promise<object>} Response with redirect URL
   */
  signInWithFacebook: async () => {
    return await secureRequest('signInWithFacebook');
  },
  
  /**
   * Process OAuth callback
   * @param {string} access_token - OAuth access token
   * @param {string} refresh_token - OAuth refresh token
   * @returns {Promise<object>} Response with user data
   */
  handleOAuthCallback: async (access_token, refresh_token) => {
    const result = await secureRequest('verifyOAuthCallback', { access_token, refresh_token });
    
    // Store the token if successful
    if (result.success && result.session?.access_token) {
      currentToken = result.session.access_token;
      currentUser = result.user;
      
      // Save to localStorage for persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem(TOKEN_STORAGE_KEY, result.session.access_token);
      }
    }
    
    return result;
  }
};

/**
 * User profile methods
 */
const profileMethods = {
  /**
   * Update user profile
   * @param {object} profileData - Profile data to update
   * @returns {Promise<object>} Response with success message
   */
  updateProfile: async (profileData) => {
    return await secureRequest('updateUserProfile', profileData, true);
  },
  
  /**
   * Upload avatar
   * @param {File} file - Avatar image file
   * @returns {Promise<object>} Response with avatar URL
   */
  uploadAvatar: async (file) => {
    // Convert File to base64
    const base64Image = await fileToBase64(file);
    
    return await secureRequest('uploadAvatar', {
      base64Image,
      fileName: file.name
    }, true);
  }
};

/**
 * Convert File to base64
 * @param {File} file - File to convert
 * @returns {Promise<string>} Base64 string
 */
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// Create a secure client for API requests with proper error handling
export const secureClient = {
  // Basic HTTP methods
  async get(endpoint, options = {}) {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(currentToken && { 'Authorization': `Bearer ${currentToken}` }),
          ...options.headers
        },
        ...options
      });
      
      if (options.rawResponse) {
        return response;
      }
      
      const data = await response.json();
      return { status: response.status, data };
    } catch (error) {
      console.error(`GET request failed for ${endpoint}:`, error);
      throw error;
    }
  },
  
  async post(endpoint, body, options = {}) {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(currentToken && { 'Authorization': `Bearer ${currentToken}` }),
          ...options.headers
        },
        body: JSON.stringify(body),
        ...options
      });
      
      if (options.rawResponse) {
        return response;
      }
      
      // For empty responses (204 No Content)
      if (response.status === 204) {
        return { status: response.status };
      }
      
      const data = await response.json();
      return { status: response.status, data };
    } catch (error) {
      console.error(`POST request failed for ${endpoint}:`, error);
      throw error;
    }
  },
  
  // Specialized methods for waitlist
  waitlistMethods: {
    async addToWaitlist(userData) {
      try {
        const response = await secureClient.post('/waitlist', userData);
        return response.data;
      } catch (error) {
        console.error('Error adding to waitlist:', error);
        throw error;
      }
    },
    
    async checkWaitlistStatus(email) {
      try {
        const response = await secureClient.get(`/waitlist/check?email=${encodeURIComponent(email)}`);
        return response.data;
      } catch (error) {
        console.error('Error checking waitlist status:', error);
        throw error;
      }
    }
  },
  
  // Auth methods
  authMethods: {
    // ... existing auth methods ...
  },
  
  // Profile methods
  profileMethods: {
    // ... existing profile methods ...
  }
};

// Export the secure client
export default secureClient; 