import React from 'react';
import styled from 'styled-components';
import SearchBox from '../components/Search/SearchBox';

const KairoContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 60px 5%;
`;

const Kairo = () => {
  return (
    <KairoContainer>
      <h1>Explore Kairo</h1>
      <SearchBox />
    </KairoContainer>
  );
};

export default Kairo; 