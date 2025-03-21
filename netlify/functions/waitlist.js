const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// CORS headers for all responses
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
};

// Main handler function
exports.handler = async function(event, context) {
  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: ''
    };
  }
  
  // GET request to check waitlist status
  if (event.httpMethod === 'GET' && event.path.includes('/check')) {
    return handleCheckWaitlistStatus(event);
  }
  
  // POST request to add to waitlist
  if (event.httpMethod === 'POST') {
    return handleAddToWaitlist(event);
  }
  
  // Return 405 for unsupported methods
  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method not allowed' })
  };
};

/**
 * Handle checking if an email is already on the waitlist
 */
async function handleCheckWaitlistStatus(event) {
  try {
    // Parse the email from query parameters
    const params = new URLSearchParams(event.queryStringParameters);
    const email = params.get('email');
    
    if (!email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Email parameter is required' })
      };
    }
    
    // Check if email exists in the waitlist table
    const { data, error } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', email.toLowerCase())
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Supabase error checking waitlist:', error);
      
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Database error',
          message: 'Failed to check waitlist status'
        })
      };
    }
    
    // Return whether the email exists in the waitlist
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        exists: !!data,
        email: email
      })
    };
  } catch (error) {
    console.error('Error checking waitlist status:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message
      })
    };
  }
}

/**
 * Handle adding a user to the waitlist
 */
async function handleAddToWaitlist(event) {
  try {
    // Parse request body
    const requestBody = JSON.parse(event.body);
    const { email, name } = requestBody;
    
    // Validate required fields
    if (!email || !name) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Validation error',
          message: 'Email and name are required fields'
        })
      };
    }
    
    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Validation error',
          message: 'Invalid email format'
        })
      };
    }
    
    // Check if email already exists to prevent duplicates
    const { data: existingUser } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', email.toLowerCase())
      .single();
    
    if (existingUser) {
      return {
        statusCode: 409,
        headers,
        body: JSON.stringify({ 
          error: 'Duplicate entry',
          message: 'This email is already on our waitlist'
        })
      };
    }
    
    // Insert new waitlist entry
    const timestamp = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        { 
          email: email.toLowerCase(),
          name,
          details: requestBody.details || '',
          created_at: timestamp,
          updated_at: timestamp,
          status: 'pending'
        }
      ]);
    
    if (error) {
      console.error('Supabase error adding to waitlist:', error);
      
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Database error',
          message: 'Failed to add to waitlist'
        })
      };
    }
    
    // TODO: Send welcome/confirmation email here if needed
    
    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Successfully added to waitlist'
      })
    };
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message
      })
    };
  }
} 