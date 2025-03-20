import React from 'react';
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
  will-change: transform;
`;

/**
 * CriticalImage component optimized for LCP (Largest Contentful Paint)
 * Use this for hero images and other critical above-the-fold content
 */
const CriticalImage = ({ 
  src, 
  alt, 
  height,
  objectFit = 'cover',
  backgroundColor = '#f0f0f0',
  className
}) => {
  return (
    <ImageWrapper height={height} className={className} backgroundColor={backgroundColor}>
      <StyledImage
        src={src}
        alt={alt}
        objectFit={objectFit}
        loading="eager"
        fetchpriority="high"
        decoding="sync"
      />
    </ImageWrapper>
  );
};

export default CriticalImage; 