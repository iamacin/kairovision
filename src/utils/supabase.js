import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials are missing:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey
  })
}

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
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

export { supabase } 