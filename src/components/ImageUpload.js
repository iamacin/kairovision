import React, { useState } from 'react'
import { uploadImage } from '../utils/uploadImage'
import styled from 'styled-components'

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 1rem 0;
`

const UploadButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primaryRgb}20;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
  margin-top: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
`

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  margin: 0.5rem 0;
  font-size: 0.9rem;
`

const ImageUpload = ({ onUploadComplete, bucket }) => {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState(null)

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Preview
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result)
    reader.readAsDataURL(file)

    // Upload
    setIsUploading(true)
    setError(null)

    const { path, error } = await uploadImage(file, bucket)
    
    setIsUploading(false)
    if (error) {
      setError(error.message)
      return
    }

    onUploadComplete(path)
  }

  return (
    <ImageUploadContainer>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isUploading}
        style={{ display: 'none' }}
        id="image-upload"
      />
      <UploadButton
        as="label"
        htmlFor="image-upload"
        disabled={isUploading}
      >
        {isUploading ? 'Uploading...' : 'Choose Image'}
      </UploadButton>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {preview && <PreviewImage src={preview} alt="Preview" />}
    </ImageUploadContainer>
  )
}

export default ImageUpload 