import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Poppins', sans-serif;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .container {
    max-width: ${({ theme }) => theme.layout.containerWidth};
    margin: 0 auto;
    padding: 0 2rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      padding: 0 1rem;
    }
  }

  .glass-effect {
    background: ${({ theme }) => theme.glass.background};
    backdrop-filter: ${({ theme }) => theme.glass.blur};
    -webkit-backdrop-filter: ${({ theme }) => theme.glass.blur};
    border: 1px solid ${({ theme }) => theme.glass.border};
    box-shadow: ${({ theme }) => theme.glass.shadow};
  }

  .neon-text {
    color: ${({ theme }) => theme.colors.primary};
    text-shadow: 0 0 10px ${({ theme }) => theme.colors.primaryLight};
  }
`; 