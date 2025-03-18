import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { Routes, Route } from 'react-router-dom';
import Header from '@components/Header/Header';
import Home from '@pages/Home';
import Waitlist from '@pages/Waitlist';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #4f46e5;
    --primary-dark: #4338ca;
    --text-primary: #1a1a1a;
    --text-secondary: #666666;
    --background: #ffffff;
    --background-alt: #f5f5f5;
    --border: #e5e5e5;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
                 Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--text-primary);
    background: var(--background);
    line-height: 1.5;
  }

  button {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
                 Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  margin-top: 80px; // Height of the header
`;

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <AppWrapper>
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/waitlist" element={<Waitlist />} />
          </Routes>
        </Main>
      </AppWrapper>
      <Navbar />
      <Hero />
    </Router>
  );
};

export default App; 