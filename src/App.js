import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
// Load only essential font weights to improve performance
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
// Remove other font weights
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { GlobalStyles } from './styles/globalStyles';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';
import { ErrorBoundary } from 'react-error-boundary';

// Lazy load route components with loading priority
const Home = lazy(() => import('./pages/Home'));
// Add prefetch for common routes
const Waitlist = lazy(() => 
  import(/* webpackPrefetch: true */ './pages/Waitlist')
);
const Contact = lazy(() => import('./pages/Contact'));
const Kairo = lazy(() => import('./pages/Kairo'));
const NotFound = lazy(() => import('./pages/NotFound'));

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

// Loading fallback with better visibility
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

// Error fallback component
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
      <GlobalStyles />
      <AppWrapper>
        <Router>
          <Navbar />
          <Main>
            <ErrorBoundary fallback={<ErrorFallback>Something went wrong. Please try refreshing the page.</ErrorFallback>}>
              <Suspense fallback={
                <LoadingFallback>
                  <LoadingSpinner />
                </LoadingFallback>
              }>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/waitlist" element={<Waitlist />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/kairo" element={<Kairo />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </Main>
          <Footer />
        </Router>
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App; 