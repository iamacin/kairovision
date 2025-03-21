const { createClient } = require('@supabase/supabase-js');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

// Initialize Supabase client (only on the server side)
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

// Secret key for JWT - in production, this should be set as an environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-for-jwt-signatures';

// List of actions that don't require authentication
const PUBLIC_ACTIONS = [
  'checkWaitlistStatus',
  'addToWaitlist',
  'fetchHeroImage',
  'fetchPremiumProperties',
  'fetchPropertyBySlug',
  'searchProperties',
  'forgotPassword',
  'resetPassword',
  'verifyEmail',
  'verifyOAuthCallback'
];

/**
 * Netlify Function handler for all Supabase operations
 * This serverless function provides a secure API for frontend to interact with Supabase
 * without exposing API keys in the client-side code
 */
exports.handler = async (event) => {
  // Only allow POST requests to this endpoint
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { action, data, token } = JSON.parse(event.body);

    // Validate required action
    if (!action) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Action is required' })
      };
    }

    // Check authentication for protected actions
    if (!PUBLIC_ACTIONS.includes(action)) {
      // Token is required for protected actions
      if (!token) {
        return {
          statusCode: 401,
          body: JSON.stringify({ error: 'Authentication required' })
        };
      }

      try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // You can add additional checks here (e.g., role-based access)
        // For example, if only admins can perform certain actions
        if (action === 'updateHeroImage' && decoded.role !== 'admin') {
          return {
            statusCode: 403,
            body: JSON.stringify({ error: 'Insufficient permissions' })
          };
        }
      } catch (error) {
        return {
          statusCode: 401,
          body: JSON.stringify({ 
            error: 'Invalid or expired token',
            message: error.message
          })
        };
      }
    }

    // Route to the appropriate handler based on the action
    switch (action) {
      // -------------------- WAITLIST OPERATIONS --------------------
      case 'addToWaitlist':
        return await addToWaitlist(validateWaitlistData(data));
      
      case 'checkWaitlistStatus':
        return await checkWaitlistStatus(validateEmail(data));

      // -------------------- PROPERTIES OPERATIONS --------------------
      case 'fetchPremiumProperties':
        return await fetchPremiumProperties(data);

      case 'fetchPropertyBySlug':
        return await fetchPropertyBySlug(validateSlug(data));
        
      case 'searchProperties':
        return await searchProperties(validateSearchCriteria(data));
        
      case 'addProperty':
        return await addProperty(validatePropertyData(data));

      // -------------------- SETTINGS OPERATIONS --------------------
      case 'fetchHeroImage':
        return await fetchHeroImage();
        
      case 'updateHeroImage':
        return await updateHeroImage(validateImagePath(data));

      // -------------------- STORAGE OPERATIONS --------------------
      case 'uploadImage':
        return await uploadImage(validateUploadData(data));
        
      // -------------------- AUTH OPERATIONS --------------------
      case 'signUp':
        return await signUp(validateSignupData(data));
        
      case 'signIn':
        return await signIn(validateLoginData(data));
        
      case 'signOut':
        return await signOut();
        
      case 'getCurrentUser':
        return await getCurrentUser();

      // -------------------- PASSWORD/EMAIL OPERATIONS --------------------
      case 'forgotPassword':
        return await forgotPassword(validateEmail(data));
        
      case 'resetPassword':
        return await resetPassword(validateResetPasswordData(data));
      
      case 'verifyEmail':
        return await verifyEmail(data);
      
      // -------------------- OAUTH OPERATIONS --------------------
      case 'signInWithGoogle':
        return await signInWithGoogle();
      
      case 'signInWithFacebook':
        return await signInWithFacebook();
      
      case 'verifyOAuthCallback':
        return await verifyOAuthCallback(data);
        
      // -------------------- USER PROFILE OPERATIONS --------------------
      case 'updateUserProfile':
        return await updateUserProfile(validateProfileData(data));
      
      case 'uploadAvatar':
        return await uploadAvatar(validateUploadData(data));

      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Invalid action' })
        };
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};

// ============================= VALIDATION FUNCTIONS =============================

/**
 * Validate waitlist data
 */
function validateWaitlistData(data) {
  if (!data) {
    throw new Error('Waitlist data is required');
  }
  
  if (!data.email || !isValidEmail(data.email)) {
    throw new Error('Valid email is required');
  }
  
  // Clone data to avoid modifying the original
  const validatedData = { ...data };
  
  // Sanitize/validate other fields
  validatedData.name = data.name ? String(data.name).trim().substring(0, 100) : '';
  validatedData.phone = data.phone ? String(data.phone).trim().substring(0, 20) : '';
  validatedData.location = data.location ? String(data.location).trim().substring(0, 100) : '';
  validatedData.userType = ['agent', 'buyer', 'seller', 'developer'].includes(data.userType) 
    ? data.userType 
    : 'buyer';
  validatedData.details = data.details ? String(data.details).trim().substring(0, 500) : '';
  validatedData.createdAt = data.createdAt || new Date().toISOString();
  
  return validatedData;
}

/**
 * Validate email
 */
function validateEmail(data) {
  if (!data || !data.email || !isValidEmail(data.email)) {
    throw new Error('Valid email is required');
  }
  return { email: data.email };
}

/**
 * Validate slug
 */
function validateSlug(data) {
  if (!data || !data.slug) {
    throw new Error('Slug is required');
  }
  return { slug: String(data.slug).trim() };
}

/**
 * Validate search criteria
 */
function validateSearchCriteria(data) {
  const validatedData = { ...data };
  
  // Apply sensible defaults and limits
  if (validatedData.limit && (!Number.isInteger(validatedData.limit) || validatedData.limit > 100)) {
    validatedData.limit = 20;
  }
  
  if (validatedData.minPrice && !Number.isFinite(parseFloat(validatedData.minPrice))) {
    delete validatedData.minPrice;
  }
  
  if (validatedData.maxPrice && !Number.isFinite(parseFloat(validatedData.maxPrice))) {
    delete validatedData.maxPrice;
  }
  
  return validatedData;
}

/**
 * Validate property data
 */
function validatePropertyData(data) {
  if (!data) {
    throw new Error('Property data is required');
  }
  
  if (!data.title) {
    throw new Error('Property title is required');
  }
  
  if (!data.price || isNaN(parseFloat(data.price))) {
    throw new Error('Valid property price is required');
  }
  
  if (!data.location) {
    throw new Error('Property location is required');
  }
  
  // Clone data to avoid modifying the original
  const validatedData = { ...data };
  
  // Sanitize fields
  validatedData.title = String(data.title).trim().substring(0, 200);
  validatedData.description = data.description ? String(data.description).trim().substring(0, 2000) : '';
  validatedData.price = parseFloat(data.price);
  validatedData.location = String(data.location).trim().substring(0, 200);
  validatedData.property_type = ['house', 'apartment', 'land', 'commercial', 'other'].includes(data.property_type) 
    ? data.property_type 
    : 'other';
  validatedData.is_premium = Boolean(data.is_premium);
  
  return validatedData;
}

/**
 * Validate image path
 */
function validateImagePath(data) {
  if (!data || !data.path) {
    throw new Error('Image path is required');
  }
  return { path: String(data.path).trim() };
}

/**
 * Validate upload data
 */
function validateUploadData(data) {
  if (!data) {
    throw new Error('Upload data is required');
  }
  
  if (!data.base64Image) {
    throw new Error('Base64 image data is required');
  }
  
  if (!data.bucket) {
    throw new Error('Storage bucket is required');
  }
  
  return {
    base64Image: data.base64Image,
    fileName: data.fileName || `${uuidv4()}.jpg`,
    bucket: String(data.bucket).trim()
  };
}

/**
 * Validate signup data
 */
function validateSignupData(data) {
  if (!data) {
    throw new Error('Signup data is required');
  }
  
  if (!data.email || !isValidEmail(data.email)) {
    throw new Error('Valid email is required');
  }
  
  if (!data.password || data.password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }
  
  return {
    email: data.email,
    password: data.password,
    metadata: data.metadata || {}
  };
}

/**
 * Validate login data
 */
function validateLoginData(data) {
  if (!data) {
    throw new Error('Login data is required');
  }
  
  if (!data.email || !isValidEmail(data.email)) {
    throw new Error('Valid email is required');
  }
  
  if (!data.password) {
    throw new Error('Password is required');
  }
  
  return {
    email: data.email,
    password: data.password
  };
}

/**
 * Check if email is valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).toLowerCase());
}

/**
 * Validate reset password data
 */
function validateResetPasswordData(data) {
  if (!data) {
    throw new Error('Reset password data is required');
  }
  
  if (!data.password || data.password.length < 6) {
    throw new Error('New password must be at least 6 characters');
  }
  
  return { password: data.password };
}

/**
 * Validate profile data
 */
function validateProfileData(data) {
  if (!data) {
    throw new Error('Profile data is required');
  }
  
  const validatedData = {};
  
  // Only include valid fields
  if (data.fullName) {
    validatedData.fullName = String(data.fullName).trim().substring(0, 100);
  }
  
  if (data.phoneNumber) {
    validatedData.phoneNumber = String(data.phoneNumber).trim().substring(0, 20);
  }
  
  if (data.bio) {
    validatedData.bio = String(data.bio).trim().substring(0, 500);
  }
  
  if (data.preferences) {
    validatedData.preferences = data.preferences;
  }
  
  if (data.avatarUrl) {
    validatedData.avatarUrl = String(data.avatarUrl).trim();
  }
  
  return validatedData;
}

// ============================= IMPLEMENTATION FUNCTIONS =============================

// -------------------- WAITLIST OPERATIONS --------------------

/**
 * Add a user to the waitlist
 */
async function addToWaitlist(data) {
  try {
    const { error } = await supabase
      .from('waitlist')
      .insert([data]);

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        message: 'Successfully added to waitlist' 
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false,
        error: 'Failed to add to waitlist',
        message: error.message
      })
    };
  }
}

/**
 * Check if an email already exists on the waitlist
 */
async function checkWaitlistStatus(data) {
  try {
    const { data: waitlistData, error: selectError } = await supabase
      .from('waitlist')
      .select('*')
      .eq('email', data.email)
      .single();

    // PGRST116 is the error code for "no rows returned"
    if (selectError && selectError.code !== 'PGRST116') throw selectError;

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        exists: !!waitlistData,
        data: waitlistData || null
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to check waitlist status',
        message: error.message
      })
    };
  }
}

// -------------------- PROPERTIES OPERATIONS --------------------

/**
 * Fetch premium properties
 */
async function fetchPremiumProperties(data) {
  try {
    const limit = data?.limit || 5;
    
    const { data: properties, error } = await supabase
      .from('properties')
      .select('*')
      .eq('is_premium', true)
      .limit(limit);

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        data: properties || [] 
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false,
        error: 'Failed to fetch premium properties',
        message: error.message
      })
    };
  }
}

/**
 * Fetch a property by its slug
 */
async function fetchPropertyBySlug(data) {
  try {
    const { slug } = data;
    
    const { data: property, error } = await supabase
      .from('properties')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        data: property 
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false,
        error: 'Failed to fetch property',
        message: error.message
      })
    };
  }
}

/**
 * Search for properties based on criteria
 */
async function searchProperties(data) {
  try {
    const { location, type, minPrice, maxPrice, limit } = data;
    
    let query = supabase
      .from('properties')
      .select('*');
    
    // Apply filters conditionally
    if (location) {
      query = query.ilike('location', `%${location}%`);
    }
    
    if (type && type !== 'all') {
      query = query.eq('property_type', type);
    }
    
    if (minPrice) {
      query = query.gte('price', minPrice);
    }
    
    if (maxPrice) {
      query = query.lte('price', maxPrice);
    }
    
    if (limit) {
      query = query.limit(limit);
    }
    
    const { data: properties, error } = await query;

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        data: properties || [] 
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false,
        error: 'Failed to search properties',
        message: error.message
      })
    };
  }
}

/**
 * Add a new property
 */
async function addProperty(data) {
  try {
    const { data: property, error } = await supabase
      .from('properties')
      .insert([data])
      .select();

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        data: property[0] || null
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false,
        error: 'Failed to add property',
        message: error.message
      })
    };
  }
}

// -------------------- SETTINGS OPERATIONS --------------------

/**
 * Fetch the hero image URL
 */
async function fetchHeroImage() {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('hero_image')
      .single();

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        data: data?.hero_image || null
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false,
        error: 'Failed to fetch hero image',
        message: error.message
      })
    };
  }
}

/**
 * Update the hero image URL
 */
async function updateHeroImage(data) {
  try {
    const { path } = data;
    
    const { error } = await supabase
      .from('settings')
      .upsert({ id: 1, hero_image: path });

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        message: 'Hero image updated successfully'
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false,
        error: 'Failed to update hero image',
        message: error.message
      })
    };
  }
}

// -------------------- STORAGE OPERATIONS --------------------

/**
 * Upload an image to Supabase Storage
 */
async function uploadImage(data) {
  try {
    const { base64Image, fileName, bucket } = data;
    
    // Convert base64 to buffer for upload
    const buffer = Buffer.from(
      base64Image.replace(/^data:image\/\w+;base64,/, ''),
      'base64'
    );
    
    // Generate a unique file name if not provided
    const fileExt = fileName.split('.').pop();
    const uniqueFileName = fileName || `${uuidv4()}.${fileExt}`;
    const filePath = uniqueFileName;

    // Upload the file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: `image/${fileExt}`,
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) throw uploadError;

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        path: publicUrl,
        message: 'Image uploaded successfully'
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false,
        error: 'Failed to upload image',
        message: error.message
      })
    };
  }
}

// -------------------- AUTH OPERATIONS --------------------

/**
 * Register a new user
 */
async function signUp(data) {
  try {
    const { email, password, metadata } = data;
    
    const { data: authData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata || {}
      }
    });

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        user: authData?.user || null,
        message: 'User registered successfully'
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false,
        error: 'Failed to register user',
        message: error.message
      })
    };
  }
}

/**
 * Sign in a user
 */
async function signIn(data) {
  try {
    const { email, password } = data;
    
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        user: authData?.user || null,
        session: authData?.session || null
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false,
        error: 'Failed to sign in',
        message: error.message
      })
    };
  }
}

/**
 * Sign out a user
 */
async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        message: 'Signed out successfully'
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false,
        error: 'Failed to sign out',
        message: error.message
      })
    };
  }
}

/**
 * Get the current user
 */
async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        user: user || null
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false,
        error: 'Failed to get current user',
        message: error.message
      })
    };
  }
}

// -------------------- PASSWORD/EMAIL OPERATIONS --------------------

/**
 * Send a password reset email
 */
async function forgotPassword(data) {
  try {
    const { email } = data;
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.APP_URL || 'http://localhost:3000'}/reset-password`
    });

    if (error) throw error;

    // For security reasons, always return success even if email doesn't exist
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        message: 'If your email is registered, you will receive password reset instructions' 
      })
    };
  } catch (error) {
    console.error('Forgot password error:', error);
    // Still return success for security
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        message: 'If your email is registered, you will receive password reset instructions' 
      })
    };
  }
}

/**
 * Reset password with token
 */
async function resetPassword(data) {
  try {
    const { password } = data;
    
    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        message: 'Password has been reset successfully' 
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false,
        error: 'Failed to reset password',
        message: error.message
      })
    };
  }
}

/**
 * Verify email
 */
async function verifyEmail(data) {
  try {
    // The actual verification happens automatically via the link
    // This endpoint is just for confirming success
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        message: 'Email verified successfully' 
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false,
        error: 'Email verification failed',
        message: error.message
      })
    };
  }
}

// -------------------- OAUTH OPERATIONS --------------------

/**
 * Sign in with Google
 */
async function signInWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.APP_URL || 'http://localhost:3000'}/auth/callback`
      }
    });

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        url: data.url 
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false,
        error: 'Failed to initialize Google sign-in',
        message: error.message
      })
    };
  }
}

/**
 * Sign in with Facebook
 */
async function signInWithFacebook() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: `${process.env.APP_URL || 'http://localhost:3000'}/auth/callback`
      }
    });

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        url: data.url 
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false,
        error: 'Failed to initialize Facebook sign-in',
        message: error.message
      })
    };
  }
}

/**
 * Verify OAuth callback
 */
async function verifyOAuthCallback(data) {
  try {
    // Extract the auth tokens from the URL
    const { access_token, refresh_token } = data;
    
    if (!access_token) {
      throw new Error('Missing access token');
    }
    
    // Exchange the token for user session
    const { data: sessionData, error } = await supabase.auth.setSession({
      access_token,
      refresh_token
    });

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        user: sessionData.user,
        session: sessionData.session
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false,
        error: 'Failed to verify OAuth sign-in',
        message: error.message
      })
    };
  }
}

// -------------------- USER PROFILE OPERATIONS --------------------

/**
 * Update user profile
 */
async function updateUserProfile(data) {
  try {
    // Update user metadata
    const { error } = await supabase.auth.updateUser({
      data: {
        ...data
      }
    });

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        message: 'Profile updated successfully' 
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false,
        error: 'Failed to update profile',
        message: error.message
      })
    };
  }
}

/**
 * Upload avatar
 */
async function uploadAvatar(data) {
  try {
    const { base64Image, fileName } = data;
    
    // Convert base64 to buffer for upload
    const buffer = Buffer.from(
      base64Image.replace(/^data:image\/\w+;base64,/, ''),
      'base64'
    );
    
    // Generate a unique file name if not provided
    const fileExt = (fileName || '').split('.').pop() || 'jpg';
    const uniqueFileName = fileName || `${uuidv4()}.${fileExt}`;
    const filePath = `avatars/${uniqueFileName}`;

    // Upload the file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('profiles')
      .upload(filePath, buffer, {
        contentType: `image/${fileExt}`,
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) throw uploadError;

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('profiles')
      .getPublicUrl(filePath);

    // Update user metadata with avatar URL
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        avatarUrl: publicUrl
      }
    });

    if (updateError) throw updateError;

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        avatarUrl: publicUrl,
        message: 'Avatar updated successfully'
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false,
        error: 'Failed to upload avatar',
        message: error.message
      })
    };
  }
} 