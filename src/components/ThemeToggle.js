import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ToggleButton = styled.button`
  background: ${({ theme }) => 
    theme.mode === 'light' 
      ? 'rgba(245, 245, 255, 0.9)' 
      : 'rgba(30, 30, 45, 0.9)'
  };
  border: 1px solid ${({ theme }) => theme.glass.border};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => 
    theme.mode === 'light'
      ? '#6a1cb7' 
      : '#ffffff'
  };
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  box-shadow: ${({ theme }) => theme.shadows.small};
  backdrop-filter: ${({ theme }) => theme.glass.blur};
  -webkit-backdrop-filter: ${({ theme }) => theme.glass.blur};
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
  
  svg {
    font-size: 1.25rem;
  }
`;

const ThemeToggle = () => {
  const { themeMode, toggleTheme } = useTheme();
  
  return (
    <ToggleButton onClick={toggleTheme} aria-label={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}>
      {themeMode === 'light' ? <FiMoon /> : <FiSun />}
    </ToggleButton>
  );
};

export default ThemeToggle; 