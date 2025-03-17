import React, { useState } from 'react';
import styled from 'styled-components';

const ImageWrapper = styled.div`
  position: relative;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || 'auto'};
  overflow: hidden;
  border-radius: ${({ theme, rounded }) => rounded ? theme.layout.borderRadius : '0'};
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: ${({ objectFit }) => objectFit || 'cover'};
  transition: ${({ theme }) => theme.transitions.default};
  
  ${({ hover }) => hover && `
    &:hover {
      transform: scale(1.05);
    }
  `}
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textLight};
`;

const Image = ({
  src,
  alt,
  width,
  height,
  objectFit,
  rounded = false,
  hover = false,
  className,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <ImageWrapper width={width} height={height} rounded={rounded} className={className}>
      <StyledImage
        src={src}
        alt={alt}
        objectFit={objectFit}
        hover={hover}
        onLoad={handleLoad}
        onError={handleError}
        style={{ display: isLoading || hasError ? 'none' : 'block' }}
        {...props}
      />
      {(isLoading || hasError) && (
        <Placeholder>
          {isLoading ? 'Chargement...' : 'Image non disponible'}
        </Placeholder>
      )}
    </ImageWrapper>
  );
};

export default Image; 