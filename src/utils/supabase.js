import { createClient } from '@supabase/supabase-js'

// Add console logging and fallbacks
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://placeholder-url.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'placeholder-key'

console.log('Supabase initialization:', { 
  usingPlaceholders: !process.env.REACT_APP_SUPABASE_URL 
});

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 