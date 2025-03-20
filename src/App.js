import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Waitlist from './pages/Waitlist';
import Contact from './pages/Contact';
import Kairo from './pages/Kairo';
import { GlobalStyles } from './styles/globalStyles';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors?.background || '#ffffff'};
  color: ${({ theme }) => theme.colors?.text || '#000000'};
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
  background-color: ${({ theme }) => theme.colors?.background || '#ffffff'};
  color: ${({ theme }) => theme.colors?.primary || '#8a2be2'};
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
  background-color: ${({ theme }) => theme.colors?.background || '#ffffff'};
  color: ${({ theme }) => theme.colors?.error || '#f44336'};
`;

const App = () => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <Router>
        <AppWrapper>
          <Navbar />
          <Main>
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
              </Routes>
            </Suspense>
          </Main>
          <Footer />
        </AppWrapper>
      </Router>
    </ThemeProvider>
  );
};

export default App; 