import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Waitlist from './pages/Waitlist';
import Contact from './pages/Contact';
import { GlobalStyles } from './styles/globalStyles';
import { ThemeProvider } from './contexts/ThemeContext';

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
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
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.primary};
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
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.error};
`;

const App = () => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <Router>
        <AppWrapper>
          <Header />
          <Main>
            <Suspense fallback={
              <LoadingFallback>
                Loading your experience...
              </LoadingFallback>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/waitlist" element={<Waitlist />} />
                <Route path="/contact" element={<Contact />} />
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