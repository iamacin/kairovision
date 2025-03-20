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
        const { error: insertError } = await supabase
          .from('waitlist')
          .insert([data]);

        if (insertError) throw insertError;

        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Successfully added to waitlist' })
        };
        
      case 'checkWaitlistStatus':
        const { data: waitlistData, error: selectError } = await supabase
          .from('waitlist')
          .select('*')
          .eq('email', data.email)
          .single();

        if (selectError && selectError.code !== 'PGRST116') throw selectError;

        return {
          statusCode: 200,
          body: JSON.stringify({ 
            exists: !!waitlistData,
            data: waitlistData || null
          })
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
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message
      })
    };
  }
}; 