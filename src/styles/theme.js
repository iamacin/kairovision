export const theme = {
  colors: {
    primary: '#8a2be2',
    primaryRgb: '138, 43, 226',
    primaryLight: '#b980ff',
    primaryDark: '#6a1cb7',
    primaryTransparent: 'rgba(138, 43, 226, 0.85)',
    
    // Text colors
    text: '#1a1a1a',
    textSecondary: '#666666',
    textLight: '#888888',
    
    // Background colors
    background: '#ffffff',
    backgroundAlt: '#f9f9ff',
    
    // Utility colors
    border: '#e5e5e5',
    shadow: 'rgba(138, 43, 226, 0.1)',
    success: '#4CAF50',
    error: '#f44336',
    warning: '#ff9800',
    info: '#2196F3'
  },
  
  glass: {
    background: 'rgba(255, 255, 255, 0.15)',
    border: 'rgba(255, 255, 255, 0.1)',
    shadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    blur: 'blur(12px)'
  },
  
  gradients: {
    primary: 'linear-gradient(135deg, rgba(138, 43, 226, 0.9), rgba(106, 28, 183, 0.95))',
    dark: 'linear-gradient(135deg, rgba(20, 20, 20, 0.95), rgba(30, 30, 30, 0.95))',
    light: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(240, 240, 255, 0.95))',
    text: 'linear-gradient(135deg, #fff, #f0f0f0)'
  },
  
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    fontFamilyFallback: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    fontSizeBase: '16px',
    lineHeightBase: 1.5,
    h1: 'clamp(2.5rem, 5vw, 4.5rem)',
    h2: 'clamp(2rem, 3vw, 3rem)',
    h3: '1.75rem',
    h4: '1.5rem',
    h5: '1.25rem',
    h6: '1rem',
    fontWeightLight: 300,
    fontWeightNormal: 400,
    fontWeightMedium: 500,
    fontWeightSemibold: 600,
    fontWeightBold: 700,
    fontWeightExtrabold: 800
  },
  
  layout: {
    borderRadius: '8px',
    borderRadiusLg: '20px',
    containerWidth: '1200px',
    sectionSpacing: '100px',
    contentPadding: '5%',
    gridGap: '40px',
    gridGapLg: '60px'
  },
  
  shadows: {
    small: '0 2px 10px rgba(138, 43, 226, 0.1)',
    medium: '0 10px 30px rgba(0, 0, 0, 0.05)',
    large: '0 15px 50px rgba(0, 0, 0, 0.1)',
    button: '0 10px 20px rgba(138, 43, 226, 0.2)',
    buttonHover: '0 15px 30px rgba(138, 43, 226, 0.3)'
  },
  
  transitions: {
    default: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fast: '0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '1200px'
  },
  
  zIndices: {
    base: 1, 
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modal: 1300,
    popover: 1400,
    tooltip: 1500
  }
} 