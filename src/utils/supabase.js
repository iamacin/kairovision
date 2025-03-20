import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || ''
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || ''

// Initialize client
let supabase = null

try {
  // Log information for debugging
  console.log('Supabase init with URL:', supabaseUrl ? 'URL exists' : 'URL is empty');
  
  // Check for missing credentials
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase credentials missing. URL exists:', !!supabaseUrl, 'Key exists:', !!supabaseAnonKey);
    throw new Error('Supabase credentials are missing. Please check your environment configuration.');
  }

  // Create supabase client
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  })

  // Test connection and log any issues
  const testConnection = async () => {
    try {
      const { data, error } = await supabase.from('waitlist').select('count')
      if (error) {
        console.error('Supabase select test failed:', error.message);
        return false;
      }
      console.log('Supabase connection test successful');
      return true
    } catch (error) {
      console.error('Supabase connection test exception:', error.message);
      return false
    }
  }

  // Run connection test
  testConnection()

} catch (error) {
  console.error('Supabase initialization error:', error.message);
  
  // Create a mock client with detailed error messages
  supabase = {
    from: (table) => ({
      select: () => Promise.reject(new Error(`Database connection failed: Could not connect to ${table}. Please check your network connection and reload the page.`)),
      insert: () => Promise.reject(new Error(`Database connection failed: Could not insert into ${table}. Please check your network connection and reload the page.`)),
      update: () => Promise.reject(new Error(`Database connection failed: Could not update ${table}. Please check your network connection and reload the page.`)),
      delete: () => Promise.reject(new Error(`Database connection failed: Could not delete from ${table}. Please check your network connection and reload the page.`))
    }),
    auth: {
      signUp: () => Promise.reject(new Error('Authentication failed: Could not register. Please check your network connection and reload the page.')),
      signIn: () => Promise.reject(new Error('Authentication failed: Could not log in. Please check your network connection and reload the page.')),
      signOut: () => Promise.reject(new Error('Authentication failed: Could not log out. Please check your network connection and reload the page.'))
    }
  }
}

export { supabase } 