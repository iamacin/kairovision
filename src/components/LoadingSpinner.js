import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

// Define a spinning animation
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

// Spinner container for positioning
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: ${props => props.centered ? 'center' : 'flex-start'};
  align-items: center;
  padding: ${props => props.padding || '0'};
  margin: ${props => props.margin || '0'};
`;

// Spinner component with customizable styling
const Spinner = styled.div`
  width: ${props => {
    switch (props.size) {
      case 'small':
        return '18px';
      case 'large':
        return '40px';
      default:
        return '30px';
    }
  }};
  
  height: ${props => {
    switch (props.size) {
      case 'small':
        return '18px';
      case 'large':
        return '40px';
      default:
        return '30px';
    }
  }};
  
  border: ${props => {
    const borderWidth = props.size === 'small' ? '2px' : props.size === 'large' ? '4px' : '3px';
    return `${borderWidth} solid rgba(0, 0, 0, 0.1)`;
  }};
  
  border-radius: 50%;
  border-top-color: ${props => props.color || props.theme.colors?.primary || '#4a90e2'};
  animation: ${spin} ${props => props.speed || '1s'} ease-in-out infinite;
`;

/**
 * LoadingSpinner component
 * @param {Object} props - Component props
 * @param {string} props.size - Size of the spinner (small, medium, large)
 * @param {string} props.color - Color of the spinner
 * @param {string} props.speed - Animation speed
 * @param {boolean} props.centered - Whether to center the spinner
 * @param {string} props.padding - CSS padding value
 * @param {string} props.margin - CSS margin value
 * @returns {JSX.Element} - Rendered component
 */
const LoadingSpinner = ({ 
  size = 'medium',
  color,
  speed = '1s',
  centered = true,
  padding,
  margin
}) => {
  return (
    <SpinnerContainer 
      centered={centered}
      padding={padding}
      margin={margin}
    >
      <Spinner 
        size={size}
        color={color}
        speed={speed}
      />
    </SpinnerContainer>
  );
};

// Define prop types for better documentation
LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.string,
  speed: PropTypes.string,
  centered: PropTypes.bool,
  padding: PropTypes.string,
  margin: PropTypes.string
};

export default LoadingSpinner; 