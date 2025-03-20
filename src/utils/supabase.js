// This is a secure wrapper for Supabase operations
// Instead of connecting directly to Supabase with API keys in the browser,
// we'll use our Netlify Function as a secure middleman

// Simple function to call our Netlify Function
const callSupabaseFunction = async (action, data) => {
  try {
    const response = await fetch('/.netlify/functions/supabase-handler', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, data }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Something went wrong');
    }

    return await response.json();
  } catch (error) {
    console.error('Error calling Supabase function:', error);
    throw error;
  }
};

// Create a secure client that doesn't expose API keys
const secureClient = {
  // Waitlist functionality
  addToWaitlist: async (userData) => {
    return await callSupabaseFunction('addToWaitlist', userData);
  },
  
  // We can add more functions as needed, following the same pattern
  checkWaitlistStatus: async (email) => {
    return await callSupabaseFunction('checkWaitlistStatus', { email });
  }
};

export default secureClient; 