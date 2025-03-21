import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

// Define a simple placeholder component 
const Placeholder = ({ title }) => (
  <div style={{ 
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    textAlign: 'center'
  }}>
    <h1>{title} Page</h1>
    <p>This is a placeholder for the {title.toLowerCase()} page.</p>
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

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <GlobalStyles />
        <AppWrapper>
          <Router>
            <Main>
              <ErrorBoundary fallback={<ErrorFallback>Something went wrong. Please try refreshing the page.</ErrorFallback>}>
                <Routes>
                  {/* All routes now use the Placeholder component */}
                  <Route path="/" element={<Placeholder title="Home" />} />
                  <Route path="/waitlist" element={<Placeholder title="Waitlist" />} />
                  <Route path="/contact" element={<Placeholder title="Contact" />} />
                  <Route path="/login" element={<Placeholder title="Login" />} />
                  <Route path="/dashboard" element={<Placeholder title="Dashboard" />} />
                  <Route path="/unauthorized" element={<Placeholder title="Unauthorized" />} />
                  <Route path="*" element={<Placeholder title="Not Found" />} />
                </Routes>
              </ErrorBoundary>
            </Main>
          </Router>
        </AppWrapper>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App; 