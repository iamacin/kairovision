import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Waitlist from './pages/Waitlist';
import { GlobalStyles } from './styles/globalStyles';
import { ThemeProvider } from './contexts/ThemeContext';

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const Main = styled.main`
  flex: 1;
`;

const App = () => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <Router>
        <AppWrapper>
          <Header />
          <Main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/waitlist" element={<Waitlist />} />
            </Routes>
          </Main>
        </AppWrapper>
      </Router>
    </ThemeProvider>
  );
};

export default App; 