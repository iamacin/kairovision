const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken');

// Initialize Supabase client (only on the server side)
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

// Secret key for JWT - in production, this should be stored as an environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-for-jwt-signatures';
// Token expiration time (24 hours in seconds)
const TOKEN_EXPIRATION = 86400;

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { action, data } = JSON.parse(event.body);

    // Validate required action
    if (!action) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Action is required' })
      };
    }

    // Route to the appropriate handler based on the action
    switch (action) {
      case 'login':
        return await login(data);
      case 'validateToken':
        return await validateToken(data);
      case 'refreshToken':
        return await refreshToken(data);
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

/**
 * Handle user login and generate JWT token
 * @param {Object} data - User credentials (email, password)
 * @returns {Object} Response with token and user data
 */
async function login(data) {
  try {
    // Validate input
    if (!data || !data.email || !data.password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email and password are required' })
      };
    }

    // Authenticate with Supabase
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password
    });

    if (error) {
      return {
        statusCode: 401,
        body: JSON.stringify({ 
          error: 'Invalid credentials',
          message: error.message 
        })
      };
    }

    // User authenticated successfully, generate JWT token
    const user = authData.user;
    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        role: user.user_metadata?.role || 'user',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + TOKEN_EXPIRATION
      },
      JWT_SECRET
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.user_metadata?.role || 'user',
          created_at: user.created_at
        }
      })
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Login failed',
        message: error.message 
      })
    };
  }
}

/**
 * Validate a JWT token
 * @param {Object} data - Token data
 * @returns {Object} Response with validation result
 */
async function validateToken(data) {
  try {
    // Validate input
    if (!data || !data.token) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Token is required' })
      };
    }

    // Verify the token
    const decoded = jwt.verify(data.token, JWT_SECRET);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        valid: true,
        user: {
          id: decoded.sub,
          email: decoded.email,
          role: decoded.role
        }
      })
    };
  } catch (error) {
    console.error('Token validation error:', error);
    return {
      statusCode: 401,
      body: JSON.stringify({ 
        valid: false,
        error: 'Invalid token',
        message: error.message 
      })
    };
  }
}

/**
 * Refresh a JWT token
 * @param {Object} data - Token data
 * @returns {Object} Response with new token
 */
async function refreshToken(data) {
  try {
    // Validate input
    if (!data || !data.token) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Token is required' })
      };
    }

    // Verify the token, but allow it even if expired
    let decoded;
    try {
      decoded = jwt.verify(data.token, JWT_SECRET, { ignoreExpiration: true });
    } catch (error) {
      return {
        statusCode: 401,
        body: JSON.stringify({ 
          error: 'Invalid token',
          message: error.message 
        })
      };
    }

    // Check if token is too old for refresh (e.g., more than 7 days)
    const now = Math.floor(Date.now() / 1000);
    if (decoded.iat < now - 604800) { // 7 days in seconds
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Token too old to refresh' })
      };
    }

    // Generate a new token
    const newToken = jwt.sign(
      {
        sub: decoded.sub,
        email: decoded.email,
        role: decoded.role,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + TOKEN_EXPIRATION
      },
      JWT_SECRET
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        token: newToken,
        user: {
          id: decoded.sub,
          email: decoded.email,
          role: decoded.role
        }
      })
    };
  } catch (error) {
    console.error('Token refresh error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Token refresh failed',
        message: error.message 
      })
    };
  }
} 