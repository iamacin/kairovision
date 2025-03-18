// Base theme with shared values
const baseTheme = {
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    fontFamilyFallback: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    fontSizeBase: '13.5px',
    lineHeightBase: 1.5,
    h1: 'clamp(1.8rem, 3.6vw, 3.15rem)',
    h2: 'clamp(1.575rem, 2.25vw, 2.25rem)',
    h3: '1.35rem',
    h4: '1.125rem',
    h5: '0.99rem',
    h6: '0.9rem',
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
};

// Light theme
export const lightTheme = {
  ...baseTheme,
  mode: 'light',
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
  
  shadows: {
    small: '0 2px 10px rgba(138, 43, 226, 0.1)',
    medium: '0 10px 30px rgba(0, 0, 0, 0.05)',
    large: '0 15px 50px rgba(0, 0, 0, 0.1)',
    button: '0 10px 20px rgba(138, 43, 226, 0.2)',
    buttonHover: '0 15px 30px rgba(138, 43, 226, 0.3)'
  }
};

// Dark theme 
export const darkTheme = {
  ...baseTheme,
  mode: 'dark',
  colors: {
    primary: '#ab5bf5',
    primaryRgb: '171, 91, 245',
    primaryLight: '#c884ff',
    primaryDark: '#8637d6',
    primaryTransparent: 'rgba(171, 91, 245, 0.85)',
    
    // Text colors
    text: '#ffffff',
    textSecondary: '#dddddd',
    textLight: '#aaaaaa',
    
    // Background colors
    background: '#161625',
    backgroundAlt: '#161625',
    
    // Utility colors
    border: '#2a2a40',
    shadow: 'rgba(10, 10, 30, 0.5)',
    success: '#4CAF50',
    error: '#f44336',
    warning: '#ff9800',
    info: '#2196F3'
  },
  
  glass: {
    background: 'rgba(22, 22, 37, 0.75)',
    border: 'rgba(80, 80, 120, 0.2)',
    shadow: '0 10px 30px rgba(10, 10, 30, 0.5)',
    blur: 'blur(12px)'
  },
  
  gradients: {
    primary: 'linear-gradient(135deg, rgba(171, 91, 245, 0.9), rgba(126, 58, 203, 0.95))',
    dark: 'linear-gradient(135deg, rgba(22, 22, 37, 0.95), rgba(30, 30, 45, 0.95))',
    light: 'linear-gradient(135deg, rgba(30, 30, 45, 0.95), rgba(22, 22, 37, 0.95))',
    text: 'linear-gradient(135deg, #ffffff, #dddddd)'
  },
  
  shadows: {
    small: '0 2px 10px rgba(10, 10, 30, 0.5)',
    medium: '0 10px 30px rgba(10, 10, 30, 0.5)',
    large: '0 15px 50px rgba(10, 10, 30, 0.7)',
    button: '0 5px 15px rgba(171, 91, 245, 0.3)',
    buttonHover: '0 8px 25px rgba(171, 91, 245, 0.4)'
  }
};

// Default theme (for backward compatibility)
export const theme = lightTheme; 