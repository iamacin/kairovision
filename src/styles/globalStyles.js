import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* CSS Variables as fallback for direct CSS usage */
  :root {
    --primary: ${({ theme }) => theme.colors.primary};
    --primary-rgb: ${({ theme }) => theme.colors.primaryRgb};
    --primary-light: ${({ theme }) => theme.colors.primaryLight};
    --primary-dark: ${({ theme }) => theme.colors.primaryDark};
    --text-primary: ${({ theme }) => theme.colors.text};
    --text-secondary: ${({ theme }) => theme.colors.textSecondary};
    --background: ${({ theme }) => theme.colors.background};
    --background-alt: ${({ theme }) => theme.colors.backgroundAlt};
    --border: ${({ theme }) => theme.colors.border};
    --glass-background: ${({ theme }) => theme.glass.background};
    --glass-border: ${({ theme }) => theme.glass.border};
    --glass-shadow: ${({ theme }) => theme.glass.shadow};
    --glass-blur: ${({ theme }) => theme.glass.blur};
    --gradient-primary: ${({ theme }) => theme.gradients.primary};
  }
  
  /* Reset & Base Styles */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
    scroll-behavior: smooth;
    font-size: 16px; /* Base font size */
    font-display: swap; /* Improve font loading performance */
    min-height: 100%;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.5;
    background-color: ${({ theme }) => theme?.colors?.background || '#ffffff'};
    color: ${({ theme }) => theme?.colors?.text || '#1a1a1a'};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    transition: background-color 0.3s ease;
    min-height: 100vh;
  }
  
  /* Smooth transitions for theme changes */
  body, 
  body * {
    transition: background-color 0.2s ease-in-out,
                border-color 0.2s ease-in-out,
                color 0.2s ease-in-out;
  }
  
  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme?.colors?.text || '#1a1a1a'};
  }
  
  h1 {
    font-size: ${({ theme }) => theme.typography.h1};
  }
  
  h2 {
    font-size: ${({ theme }) => theme.typography.h2};
  }
  
  h3 {
    font-size: ${({ theme }) => theme.typography.h3};
  }
  
  h4 {
    font-size: ${({ theme }) => theme.typography.h4};
  }
  
  h5 {
    font-size: ${({ theme }) => theme.typography.h5};
  }
  
  h6 {
    font-size: ${({ theme }) => theme.typography.h6};
  }
  
  p {
    margin-bottom: 1rem;
    font-size: 1rem;
  }
  
  a {
    color: ${({ theme }) => theme?.colors?.primary || '#8a2be2'};
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      color: ${({ theme }) => theme?.colors?.primaryDark || '#6a1cb7'};
    }
  }
  
  strong {
    font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  }
  
  /* Lists */
  ul, ol {
    list-style: none;
    margin-bottom: 1rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  /* Form elements */
  button {
    cursor: pointer;
    font-family: inherit;
  }
  
  input, select, textarea {
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.layout.borderRadius};
    padding: 0.75rem 1rem;
    outline: none;
    transition: ${({ theme }) => theme.transitions.default};
    
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(${({ theme }) => theme.colors.primaryRgb}, 0.1);
    }
  }
  
  /* Media elements */
  img {
    max-width: 100%;
    height: auto;
  }
  
  /* Layout classes */
  .container {
    max-width: ${({ theme }) => theme.layout.containerWidth};
    margin: 0 auto;
    padding: 0 2rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      padding: 0 1rem;
    }
  }
  
  section {
    padding: 5rem 0;
  }
  
  /* Utility classes */
  .glass-effect {
    background: ${({ theme }) => theme.glass.background};
    backdrop-filter: ${({ theme }) => theme.glass.blur};
    -webkit-backdrop-filter: ${({ theme }) => theme.glass.blur};
    border: 1px solid ${({ theme }) => theme.glass.border};
    box-shadow: ${({ theme }) => theme.glass.shadow};
  }
  
  .gradient-text {
    background: ${({ theme }) => theme.gradients.primary};
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  
  .hover-lift {
    transition: ${({ theme }) => theme.transitions.transform};
    
    &:hover {
      transform: translateY(-5px);
    }
  }
  
  .text-center {
    text-align: center;
  }
  
  .text-right {
    text-align: right;
  }
  
  .hidden {
    display: none;
  }
  
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  
  /* Accessibility */
  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
  
  /* Print Styles */
  @media print {
    * {
      background: transparent !important;
      color: ${({ theme }) => theme.colors.text} !important;
      box-shadow: none !important;
      text-shadow: none !important;
    }
    
    a,
    a:visited {
      text-decoration: underline;
    }
    
    a[href]::after {
      content: " (" attr(href) ")";
    }
    
    abbr[title]::after {
      content: " (" attr(title) ")";
    }
    
    /* Don't show links for images, or javascript/internal links */
    a[href^="#"]::after,
    a[href^="javascript:"]::after {
      content: "";
    }
    
    pre,
    blockquote {
      border: 1px solid #999;
      page-break-inside: avoid;
    }
    
    /* h5bp.com/t */
    thead {
      display: table-header-group;
    }
    
    tr,
    img {
      page-break-inside: avoid;
    }
    
    img {
      max-width: 100% !important;
    }
    
    p,
    h2,
    h3 {
      orphans: 3;
      widows: 3;
    }
    
    h2,
    h3 {
      page-break-after: avoid;
    }
  }
  
  /* Reduced Motion */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  
  /* Better contrast for accessibility */
  ::selection {
    background-color: ${({ theme }) => theme?.colors?.primary || '#8a2be2'};
    color: white;
  }
`; 