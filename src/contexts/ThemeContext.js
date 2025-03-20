import React, { createContext, useState, useEffect, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('light'); // Default to light theme
  const [isThemeReady, setIsThemeReady] = useState(false);

  useEffect(() => {
    try {
      // Move theme initialization to useEffect to avoid hydration mismatch
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia && 
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeMode(savedTheme || (prefersDark ? 'dark' : 'light'));
    } catch (e) {
      console.warn('Error initializing theme:', e);
      // Keep light theme as fallback
    } finally {
      setIsThemeReady(true);
    }
  }, []);

  useEffect(() => {
    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e) => {
        if (!localStorage.getItem('theme')) {
          setThemeMode(e.matches ? 'dark' : 'light');
        }
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } catch (e) {
      console.warn('Error setting up theme listener:', e);
    }
  }, []);

  useEffect(() => {
    if (themeMode) {
      try {
        localStorage.setItem('theme', themeMode);
        document.documentElement.setAttribute('data-theme', themeMode);
      } catch (e) {
        console.warn('Error saving theme:', e);
      }
    }
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  const theme = themeMode === 'dark' ? darkTheme : lightTheme;
  
  if (!isThemeReady) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#666666'
      }}>
        Loading...
      </div>
    );
  }
  
  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <StyledThemeProvider theme={{ ...theme, mode: themeMode }}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook for using the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    console.warn('useTheme must be used within a ThemeProvider');
    return { themeMode: 'light', toggleTheme: () => {} }; // Fallback values
  }
  return context;
}; 