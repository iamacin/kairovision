import React, { useState, useEffect } from 'react'
import { uploadImage } from '../utils/uploadImage'
import styled from 'styled-components'
import { supabase } from '../utils/supabase'

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.glass.border};
`

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const UploadButton = styled.button`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 2;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(${({ theme }) => theme.colors.primaryRgb}, 0.2);
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.textLight};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.mode === 'light' 
    ? 'rgba(0, 0, 0, 0.3)' 
    : 'rgba(0, 0, 0, 0.5)'
  };
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
`

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  margin: 0.5rem 0;
  font-size: 0.9rem;
`

const HeroImageUpload = () => {
  const [currentImage, setCurrentImage] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch current hero image on component mount
  useEffect(() => {
    fetchHeroImage()
  }, [])

  const fetchHeroImage = async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('hero_image')
        .single()

      if (error) throw error
      if (data?.hero_image) {
        setCurrentImage(data.hero_image)
      }
    } catch (error) {
      console.error('Error fetching hero image:', error.message)
    }
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setIsUploading(true)
    setError(null)

    try {
      // Upload to Supabase storage
      const { path, error: uploadError } = await uploadImage(file, 'hero')
      if (uploadError) throw uploadError

      // Update the settings table with new image URL
      const { error: updateError } = await supabase
        .from('settings')
        .upsert({ id: 1, hero_image: path })

      if (updateError) throw updateError

      setCurrentImage(path)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <HeroContainer>
      <h2>Hero Section Image</h2>
      <ImageContainer>
        {currentImage ? (
          <HeroImage src={currentImage} alt="Hero section" />
        ) : (
          <Overlay>No hero image set</Overlay>
        )}
        
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
          style={{ display: 'none' }}
          id="hero-image-upload"
        />
        <UploadButton
          as="label"
          htmlFor="hero-image-upload"
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : 'Change Hero Image'}
        </UploadButton>
      </ImageContainer>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <p>
        Recommended image size: 1920x1080px or larger. 
        The image will be automatically cropped to fit the hero section.
      </p>
    </HeroContainer>
  )
}

export default HeroImageUpload 