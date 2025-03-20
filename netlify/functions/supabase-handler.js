const { createClient } = require('@supabase/supabase-js');
const { v4: uuidv4 } = require('uuid');

// Initialize Supabase client (only on the server side)
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

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
    const { action, data } = JSON.parse(event.body);

    // Route to the appropriate handler based on the action
    switch (action) {
      // -------------------- WAITLIST OPERATIONS --------------------
      case 'addToWaitlist':
        return await addToWaitlist(data);
      
      case 'checkWaitlistStatus':
        return await checkWaitlistStatus(data);

      // -------------------- PROPERTIES OPERATIONS --------------------
      case 'fetchPremiumProperties':
        return await fetchPremiumProperties(data);

      case 'fetchPropertyBySlug':
        return await fetchPropertyBySlug(data);
        
      case 'searchProperties':
        return await searchProperties(data);
        
      case 'addProperty':
        return await addProperty(data);

      // -------------------- SETTINGS OPERATIONS --------------------
      case 'fetchHeroImage':
        return await fetchHeroImage();
        
      case 'updateHeroImage':
        return await updateHeroImage(data);

      // -------------------- STORAGE OPERATIONS --------------------
      case 'uploadImage':
        return await uploadImage(data);
        
      // -------------------- AUTH OPERATIONS --------------------
      case 'signUp':
        return await signUp(data);
        
      case 'signIn':
        return await signIn(data);
        
      case 'signOut':
        return await signOut();
        
      case 'getCurrentUser':
        return await getCurrentUser();

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