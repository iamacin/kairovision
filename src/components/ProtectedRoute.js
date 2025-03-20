import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #f9f9f9;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #4a90e2;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingMessage = styled.p`
  margin-top: 20px;
  font-size: 16px;
  color: #555;
`;

/**
 * ProtectedRoute component that redirects to the login page if the user is not authenticated
 * @param {Object} props - Component props
 * @param {JSX.Element} props.children - The components to render if authenticated
 * @param {string} [props.requiredRole] - Optional role required to access the route
 * @returns {JSX.Element} Protected route or redirect
 */
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading, hasRole, isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Show loading indicator while checking authentication
  if (loading) {
    return (
      <LoadingContainer>
        <div>
          <Spinner />
          <LoadingMessage>Checking authentication...</LoadingMessage>
        </div>
      </LoadingContainer>
    );
  }
  
  // If requiredRole is specified, check if user has the required role
  if (requiredRole && !hasRole(requiredRole)) {
    // Redirect to unauthorized page if user doesn't have the required role
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Render children if authenticated and authorized
  return children;
};

export default ProtectedRoute; 