import React, { useState, useEffect } from 'react';
import useAssetsStore from '../../../../stores/AssetsStore';
import './PreloadedImage.css';

const PreloadedImage = ({ src, alt, className = '' }) => {
  const { getUIImage, isUIImageLoaded } = useAssetsStore();
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  
  useEffect(() => {
    const cachedImage = getUIImage(src);
    if (cachedImage) {
      setImageSrc(src);
      setIsLoaded(true);
    } else {
      console.log(`Imagem não encontrada no cache, carregando: ${src}`);
      setIsLoaded(false);
      
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
      img.onerror = () => {
        console.error(`Erro ao carregar imagem: ${src}`);
        setIsLoaded(true);
      };
      img.src = src;
    }
  }, [src]);

  return (
    <div className={`preloaded-image-container ${className} ${isLoaded ? 'loaded' : 'loading'}`}>
      {!isLoaded && <div className="image-placeholder"></div>}
      {(isLoaded && imageSrc) && (
        <img 
          src={imageSrc}
          alt={alt}
          className="preloaded-image"
        />
      )}
    </div>
  );
};

export default PreloadedImage;