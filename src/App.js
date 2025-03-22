import React from 'react';
import { RouterProvider, createBrowserRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
// Load only essential font weights to improve performance
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import { GlobalStyles } from './styles/globalStyles';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import LoadingSpinner from './components/LoadingSpinner';
import { ErrorBoundary } from 'react-error-boundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer/Footer';

// Import real components
import Home from './pages/Home';
import Waitlist from './pages/Waitlist';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';
import Login from './pages/Login';

// Define a simple placeholder component for pages still under development
const Placeholder = ({ title }) => (
  <div style={{ 
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    textAlign: 'center'
  }}>
    <h1>{title} Page</h1>
    <p>This is a placeholder for the {title.toLowerCase()} page.</p>
    <p><Link to="/">Back to Home</Link></p>
  </div>
);

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme?.colors?.background || '#ffffff'};
  color: ${({ theme }) => theme?.colors?.text || '#000000'};
`;

const Main = styled.main`
  flex: 1;
  position: relative;
  padding-top: 60px; /* Add space for the fixed navbar */
`;

const LoadingFallback = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme?.colors?.background || '#ffffff'};
  color: ${({ theme }) => theme?.colors?.primary || '#8a2be2'};
  font-size: 1.2rem;
  font-weight: 500;
`;

const ErrorFallback = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: ${({ theme }) => theme?.colors?.background || '#ffffff'};
  color: ${({ theme }) => theme?.colors?.error || '#f44336'};
  text-align: center;
  font-size: 1.2rem;
`;

// Create a wrapper component for route content that includes the Navbar and Footer
const AppLayout = ({ children }) => (
  <>
    <Navbar />
    <Main>{children}</Main>
    <Footer />
  </>
);

// Create router configuration for React Router v7
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout><Home /></AppLayout>,
    errorElement: <AppLayout><Placeholder title="Error" /></AppLayout>
  },
  {
    path: "/waitlist",
    element: <AppLayout><Waitlist /></AppLayout>
  },
  {
    path: "/contact",
    element: <AppLayout><Contact /></AppLayout>
  },
  {
    path: "/login",
    element: <AppLayout><Login /></AppLayout>
  },
  {
    path: "/dashboard",
    element: <AppLayout><Placeholder title="Dashboard" /></AppLayout>
  },
  {
    path: "/unauthorized",
    element: <AppLayout><Unauthorized /></AppLayout>
  },
  {
    path: "*",
    element: <AppLayout><NotFound /></AppLayout>
  }
]);

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <GlobalStyles />
        <AppWrapper>
          <ErrorBoundary fallback={<ErrorFallback>Something went wrong. Please try refreshing the page.</ErrorFallback>}>
            <RouterProvider router={router} fallbackElement={<LoadingFallback><LoadingSpinner /></LoadingFallback>} />
          </ErrorBoundary>
        </AppWrapper>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App; 