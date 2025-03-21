import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 30px;
  color: #2a2a2a;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AvatarContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #4a90e2;
`;

const DefaultAvatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  color: #999;
  border: 3px solid #4a90e2;
`;

const AvatarUploadButton = styled.button`
  padding: 8px 15px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
  margin-top: 10px;

  &:hover {
    background-color: #3a7bc8;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4a90e2;
    outline: none;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  height: 100px;
  resize: vertical;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4a90e2;
    outline: none;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const Button = styled.button`
  padding: 12px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  width: fit-content;
  align-self: flex-end;

  &:hover {
    background-color: #3a7bc8;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-top: 15px;
  padding: 10px;
  background-color: #fdecea;
  border-radius: 4px;
`;

const SuccessMessage = styled.div`
  color: #27ae60;
  margin-top: 15px;
  padding: 10px;
  background-color: #eafaf1;
  border-radius: 4px;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #4a90e2;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Profile = () => {
  const fileInputRef = useRef(null);
  const { userProfile, updateProfile, uploadAvatar } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    bio: '',
    preferences: ''
  });
  
  // Load user profile data
  useEffect(() => {
    if (userProfile) {
      setFormData({
        fullName: userProfile.fullName || '',
        phoneNumber: userProfile.phoneNumber || '',
        bio: userProfile.bio || '',
        preferences: userProfile.preferences || ''
      });
    }
  }, [userProfile]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      await updateProfile(formData);
      setSuccess('Profile updated successfully');
    } catch (error) {
      console.error('Update profile error:', error);
      setError(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };
  
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Reset file input
    e.target.value = null;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should not exceed 5MB');
      return;
    }
    
    setError('');
    setAvatarLoading(true);
    
    try {
      await uploadAvatar(file);
      setSuccess('Avatar uploaded successfully');
    } catch (error) {
      console.error('Avatar upload error:', error);
      setError(error.message || 'Failed to upload avatar');
    } finally {
      setAvatarLoading(false);
    }
  };
  
  // Generate avatar placeholder or show user avatar
  const renderAvatar = () => {
    if (userProfile?.avatarUrl) {
      return <Avatar src={userProfile.avatarUrl} alt="User Avatar" />;
    }
    
    return (
      <DefaultAvatar>
        {userProfile?.fullName ? userProfile.fullName.charAt(0).toUpperCase() : '?'}
      </DefaultAvatar>
    );
  };
  
  return (
    <ProfileContainer>
      <Title>Your Profile</Title>
      
      <ProfileGrid>
        <AvatarSection>
          <AvatarContainer>
            {renderAvatar()}
            {avatarLoading && (
              <LoadingOverlay>
                <Spinner />
              </LoadingOverlay>
            )}
          </AvatarContainer>
          
          <AvatarUploadButton 
            onClick={handleAvatarClick} 
            disabled={avatarLoading}
          >
            {avatarLoading ? 'Uploading...' : 'Change Avatar'}
          </AvatarUploadButton>
          
          <FileInput
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </AvatarSection>
        
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Your full name"
            />
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Your phone number"
            />
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
            />
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="preferences">Preferences</Label>
            <Textarea
              id="preferences"
              name="preferences"
              value={formData.preferences}
              onChange={handleChange}
              placeholder="Your app preferences"
            />
          </InputGroup>
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
        </Form>
      </ProfileGrid>
    </ProfileContainer>
  );
};

export default Profile; 