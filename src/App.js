import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from '@components/Header/Header';
import Home from '@pages/Home';
import Waitlist from '@pages/Waitlist';

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
    <AppWrapper>
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/waitlist" element={<Waitlist />} />
        </Routes>
      </Main>
    </AppWrapper>
  );
};

export default App; 