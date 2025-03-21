import React, { useState, useEffect } from 'react'
import { uploadImage } from '../utils/uploadImage'
import styled from 'styled-components'
import secureClient from '../utils/supabase'

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin: 2rem 0;
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
`

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 1.2rem;
`

const UploadButton = styled.button`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  z-index: 2;

  &:hover {
    background-color: var(--primary-color-dark);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  z-index: 2;
`

const ErrorMessage = styled.p`
  color: red;
  margin: 0.5rem 0;
`

const HeroImageUpload = () => {
  const [currentImage, setCurrentImage] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchHeroImage()
  }, [])

  const fetchHeroImage = async () => {
    try {
      const response = await secureClient.fetchHeroImage();
      
      if (response.success && response.data) {
        setCurrentImage(response.data);
      }
    } catch (error) {
      console.error('Error fetching hero image:', error.message);
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
      const response = await secureClient.updateHeroImage(path);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to update hero image');
      }

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
        
        {isUploading && (
          <LoadingOverlay>Uploading...</LoadingOverlay>
        )}
      </ImageContainer>
      
      {error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}
    </HeroContainer>
  )
}

export default HeroImageUpload 