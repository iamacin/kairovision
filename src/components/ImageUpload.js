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
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--primary-color-dark);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
  margin-top: 1rem;
`

const ErrorMessage = styled.p`
  color: red;
  margin: 0.5rem 0;
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