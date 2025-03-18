import React, { useState } from 'react'
import styled from 'styled-components'
import ImageUpload from './ImageUpload'
import { supabase } from '../utils/supabase'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
`

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 100px;
`

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: var(--primary-color-dark);
  }
`

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    images: []
  })

  const handleImageUpload = (imagePath) => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, imagePath]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const { data, error } = await supabase
        .from('properties')
        .insert([formData])
        .select()

      if (error) throw error

      alert('Property added successfully!')
      // Reset form or redirect
    } catch (error) {
      console.error('Error adding property:', error.message)
      alert('Error adding property. Please try again.')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="title"
        placeholder="Property Title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <TextArea
        name="description"
        placeholder="Property Description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <Input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <Input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
      />

      <ImageUpload
        bucket="properties"
        onUploadComplete={handleImageUpload}
      />

      {formData.images.length > 0 && (
        <div>
          <p>Uploaded Images:</p>
          {formData.images.map((image, index) => (
            <img 
              key={index}
              src={image}
              alt={`Property ${index + 1}`}
              style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '0.5rem' }}
            />
          ))}
        </div>
      )}

      <SubmitButton type="submit">
        Add Property
      </SubmitButton>
    </Form>
  )
}

export default PropertyForm 