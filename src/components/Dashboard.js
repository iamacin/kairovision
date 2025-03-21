import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors?.text || '#333'};
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors?.textSecondary || '#666'};
  font-size: 1rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors?.cardBackground || '#fff'};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors?.text || '#333'};
`;

const CardContent = styled.p`
  color: ${({ theme }) => theme.colors?.textSecondary || '#666'};
  flex-grow: 1;
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <Header>
        <Title>Dashboard</Title>
        <Subtitle>Welcome back! Here's an overview of your account.</Subtitle>
      </Header>
      
      <CardGrid>
        <Card>
          <CardTitle>Profile</CardTitle>
          <CardContent>View and edit your profile information.</CardContent>
        </Card>
        
        <Card>
          <CardTitle>Properties</CardTitle>
          <CardContent>Manage your saved properties and listings.</CardContent>
        </Card>
        
        <Card>
          <CardTitle>Messages</CardTitle>
          <CardContent>Check your recent messages and inquiries.</CardContent>
        </Card>
        
        <Card>
          <CardTitle>Preferences</CardTitle>
          <CardContent>Update your search preferences and notifications.</CardContent>
        </Card>
      </CardGrid>
    </DashboardContainer>
  );
};

export default Dashboard; 