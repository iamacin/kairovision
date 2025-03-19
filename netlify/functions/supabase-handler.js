const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { action, data } = JSON.parse(event.body);

    switch (action) {
      case 'addToWaitlist':
        const { error } = await supabase
          .from('waitlist')
          .insert([data]);

        if (error) throw error;

        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Successfully added to waitlist' })
        };

      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Invalid action' })
        };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}; 