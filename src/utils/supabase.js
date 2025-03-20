import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || ''
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || ''

let supabase = null

try {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase credentials are missing. Please check your environment configuration.')
  }

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
      if (error) throw error
      console.log('Supabase connection test successful')
      return true
    } catch (error) {
      console.error('Supabase connection test failed:', error.message)
      return false
    }
  }

  // Run connection test
  testConnection()

} catch (error) {
  console.error('Supabase initialization error:', error.message)
  // Create a mock client that returns errors for all operations
  supabase = {
    from: () => ({
      select: () => Promise.reject(new Error('Database connection not available. Please check your configuration.')),
      insert: () => Promise.reject(new Error('Database connection not available. Please check your configuration.')),
      update: () => Promise.reject(new Error('Database connection not available. Please check your configuration.')),
      delete: () => Promise.reject(new Error('Database connection not available. Please check your configuration.'))
    }),
    auth: {
      signUp: () => Promise.reject(new Error('Authentication not available. Please check your configuration.')),
      signIn: () => Promise.reject(new Error('Authentication not available. Please check your configuration.')),
      signOut: () => Promise.reject(new Error('Authentication not available. Please check your configuration.'))
    }
  }
}

export { supabase } 