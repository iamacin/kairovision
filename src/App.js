import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Waitlist from './pages/Waitlist';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/globalStyles';

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
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