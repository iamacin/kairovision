import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${props => props.height || 'auto'};
  overflow: hidden;
  background-color: ${props => props.backgroundColor || '#f0f0f0'};
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: ${props => props.objectFit || 'cover'};
  opacity: ${props => props.isLoaded ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
  will-change: opacity;
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.blur || '#f0f0f0'};
  filter: ${props => props.isLoading ? 'blur(10px)' : 'none'};
  transition: opacity 0.3s ease-in-out;
  opacity: ${props => props.isLoading ? 1 : 0};
`;

const OptimizedImage = ({ 
  src, 
  alt, 
  height,
  objectFit = 'cover',
  placeholderColor = '#f0f0f0',
  className,
  loading = 'lazy',
  fetchpriority = 'auto'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(null);

  useEffect(() => {
    // Reset state when src changes
    setIsLoaded(false);
    setCurrentSrc(null);

    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoaded(true);
    };

    return () => {
      img.onload = null;
    };
  }, [src]);

  return (
    <ImageWrapper height={height} className={className} backgroundColor={placeholderColor}>
      <Placeholder 
        isLoading={!isLoaded} 
        blur={placeholderColor}
      />
      {currentSrc && (
        <StyledImage
          src={currentSrc}
          alt={alt}
          isLoaded={isLoaded}
          objectFit={objectFit}
          loading={loading}
          fetchpriority={fetchpriority}
        />
      )}
    </ImageWrapper>
  );
};

export default OptimizedImage; 