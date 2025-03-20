/**
 * SecureClient: A comprehensive API client for Supabase operations
 * This client makes calls to our Netlify Functions instead of directly
 * accessing Supabase, which keeps our API keys secure.
 */

// Base function to call our Netlify Function
const callSupabaseFunction = async (action, data = {}) => {
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
      throw new Error(errorData.error || errorData.message || 'Something went wrong');
    }

    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// Create a secure client that mimics Supabase's API structure
const secureClient = {
  // -------------------- WAITLIST OPERATIONS --------------------
  
  // Add a user to the waitlist
  addToWaitlist: async (userData) => {
    return await callSupabaseFunction('addToWaitlist', userData);
  },
  
  // Check if an email exists in the waitlist
  checkWaitlistStatus: async (email) => {
    return await callSupabaseFunction('checkWaitlistStatus', { email });
  },

  // -------------------- DATA ACCESS OPERATIONS --------------------
  
  // Mimics the Supabase 'from' method to provide a familiar API structure
  from: (table) => ({
    // Select data from the table
    select: (columns = '*') => ({
      // Get all rows
      getAll: async () => {
        return await callSupabaseFunction(`fetch${table.charAt(0).toUpperCase() + table.slice(1)}`, { columns });
      },
      
      // Limit the number of rows
      limit: (limit) => ({
        getAll: async () => {
          return await callSupabaseFunction(`fetch${table.charAt(0).toUpperCase() + table.slice(1)}`, { columns, limit });
        },
        
        // Filter by equal
        eq: (column, value) => ({
          getAll: async () => {
            return await callSupabaseFunction(`fetch${table.charAt(0).toUpperCase() + table.slice(1)}`, { 
              columns, 
              limit,
              filter: { column, value, operator: 'eq' }
            });
          }
        })
      }),
      
      // Filter by equal
      eq: (column, value) => ({
        getAll: async () => {
          return await callSupabaseFunction(`fetch${table.charAt(0).toUpperCase() + table.slice(1)}`, { 
            columns,
            filter: { column, value, operator: 'eq' }
          });
        },
        
        // Get a single row
        single: async () => {
          const response = await callSupabaseFunction(`fetch${table.charAt(0).toUpperCase() + table.slice(1)}ByFilter`, { 
            columns,
            filter: { column, value, operator: 'eq' },
            single: true
          });
          
          return {
            data: response.data,
            error: response.error ? { message: response.error } : null
          };
        }
      })
    }),
    
    // Insert data into the table
    insert: (rows) => ({
      select: async () => {
        const response = await callSupabaseFunction(`add${table.charAt(0).toUpperCase() + table.slice(1).slice(0, -1)}`, rows[0]);
        
        return {
          data: response.data ? [response.data] : null,
          error: response.error ? { message: response.error } : null
        };
      }
    }),
    
    // Upsert data in the table
    upsert: async (row) => {
      const response = await callSupabaseFunction(`update${table.charAt(0).toUpperCase() + table.slice(1).slice(0, -1)}`, row);
      
      return {
        data: response.data,
        error: response.error ? { message: response.error } : null
      };
    }
  }),

  // -------------------- PROPERTIES OPERATIONS --------------------
  
  // Fetch premium properties
  fetchPremiumProperties: async (limit = 5) => {
    return await callSupabaseFunction('fetchPremiumProperties', { limit });
  },
  
  // Fetch a property by slug
  fetchPropertyBySlug: async (slug) => {
    return await callSupabaseFunction('fetchPropertyBySlug', { slug });
  },
  
  // Search for properties
  searchProperties: async (criteria) => {
    return await callSupabaseFunction('searchProperties', criteria);
  },
  
  // Add a new property
  addProperty: async (propertyData) => {
    return await callSupabaseFunction('addProperty', propertyData);
  },

  // -------------------- SETTINGS OPERATIONS --------------------
  
  // Fetch the hero image
  fetchHeroImage: async () => {
    return await callSupabaseFunction('fetchHeroImage');
  },
  
  // Update the hero image
  updateHeroImage: async (path) => {
    return await callSupabaseFunction('updateHeroImage', { path });
  },

  // -------------------- STORAGE OPERATIONS --------------------
  
  // Storage operations
  storage: {
    // Access a bucket
    from: (bucket) => ({
      // Upload a file to the bucket
      upload: async (filePath, file) => {
        // Convert File object to base64 for transmission
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = async () => {
            try {
              const response = await callSupabaseFunction('uploadImage', {
                base64Image: reader.result,
                fileName: filePath,
                bucket
              });
              
              resolve({
                data: { path: response.path },
                error: null
              });
            } catch (error) {
              reject({
                data: null,
                error: error
              });
            }
          };
          reader.onerror = (error) => {
            reject({
              data: null,
              error: error
            });
          };
        });
      },
      
      // Get a public URL for a file
      getPublicUrl: (filePath) => {
        // This is a synchronous operation in Supabase
        // We'll return a dummy structure that should be replaced by the actual URL from the upload response
        return {
          data: {
            publicUrl: `https://your-supabase-url.supabase.co/storage/v1/object/public/${bucket}/${filePath}`
          }
        };
      }
    })
  },

  // -------------------- AUTH OPERATIONS --------------------
  
  // Auth operations
  auth: {
    // Sign up a user
    signUp: async (credentials) => {
      const response = await callSupabaseFunction('signUp', credentials);
      
      return {
        data: {
          user: response.user,
          session: null
        },
        error: response.error ? { message: response.error } : null
      };
    },
    
    // Sign in a user
    signInWithPassword: async (credentials) => {
      const response = await callSupabaseFunction('signIn', credentials);
      
      return {
        data: {
          user: response.user,
          session: response.session
        },
        error: response.error ? { message: response.error } : null
      };
    },
    
    // Sign out a user
    signOut: async () => {
      const response = await callSupabaseFunction('signOut');
      
      return {
        error: response.error ? { message: response.error } : null
      };
    },
    
    // Get the current user
    getUser: async () => {
      const response = await callSupabaseFunction('getCurrentUser');
      
      return {
        data: {
          user: response.user
        },
        error: response.error ? { message: response.error } : null
      };
    }
  }
};

// Export the secure client
export default secureClient; 