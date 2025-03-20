import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const WelcomeSection = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #2a2a2a;
  margin-bottom: 15px;
  font-size: 2rem;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 20px;
`;

const UserInfoCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
`;

const UserInfoItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: flex-start;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.span`
  font-weight: 600;
  color: #555;
  width: 100px;
  flex-shrink: 0;
`;

const Value = styled.span`
  color: #333;
`;

const ActionButton = styled.button`
  background-color: ${props => props.secondary ? '#f44336' : '#4a90e2'};
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 15px;
  
  &:hover {
    background-color: ${props => props.secondary ? '#d32f2f' : '#3a7bc8'};
  }
  
  &:last-child {
    margin-right: 0;
  }
`;

const ActionRow = styled.div`
  display: flex;
  margin-top: 30px;
`;

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <DashboardContainer>
      <WelcomeSection>
        <Title>Welcome to Your Dashboard</Title>
        <Subtitle>Manage your Kairo account and properties</Subtitle>
        
        <UserInfoCard>
          <h3>Your Information</h3>
          <UserInfoItem>
            <Label>Email:</Label>
            <Value>{user?.email || 'N/A'}</Value>
          </UserInfoItem>
          <UserInfoItem>
            <Label>Role:</Label>
            <Value>{user?.role || 'User'}</Value>
          </UserInfoItem>
          <UserInfoItem>
            <Label>Joined:</Label>
            <Value>{formatDate(user?.created_at)}</Value>
          </UserInfoItem>
        </UserInfoCard>
        
        <ActionRow>
          <ActionButton onClick={() => navigate('/profile')}>
            Edit Profile
          </ActionButton>
          <ActionButton secondary onClick={handleLogout}>
            Logout
          </ActionButton>
        </ActionRow>
      </WelcomeSection>
    </DashboardContainer>
  );
};

export default Dashboard; 