import secureClient from './supabase';
import { v4 as uuidv4 } from 'uuid';

/**
 * Uploads an image to Supabase Storage using our secure client
 * @param {File} imageFile - The image file to upload
 * @param {string} bucket - The storage bucket name (e.g., 'properties', 'agents', 'hero')
 * @returns {Promise<{path: string, error: Error}>} - The path to the uploaded image or error
 */
export const uploadImage = async (imageFile, bucket) => {
  try {
    // Generate a unique file name
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = fileName;

    // Upload the file to Supabase Storage via our secure client
    const { data, error } = await secureClient.storage
      .from(bucket)
      .upload(filePath, imageFile);

    if (error) throw error;

    // Return the public URL
    return { path: data.path, error: null };
  } catch (error) {
    console.error('Error uploading image:', error.message);
    return { path: null, error };
  }
}; 