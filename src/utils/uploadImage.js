import { supabase } from './supabase'
import { v4 as uuidv4 } from 'uuid'

/**
 * Uploads an image to Supabase Storage
 * @param {File} imageFile - The image file to upload
 * @param {string} bucket - The storage bucket name (e.g., 'properties', 'agents')
 * @returns {Promise<{path: string, error: Error}>} - The path to the uploaded image or error
 */
export const uploadImage = async (imageFile, bucket) => {
  try {
    // Generate a unique file name
    const fileExt = imageFile.name.split('.').pop()
    const fileName = `${uuidv4()}.${fileExt}`
    const filePath = `${fileName}`

    // Upload the file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, imageFile, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) throw error

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    return { path: publicUrl, error: null }
  } catch (error) {
    console.error('Error uploading image:', error.message)
    return { path: null, error }
  }
} 