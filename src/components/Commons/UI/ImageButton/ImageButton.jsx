import React, { useCallback } from 'react';
import './ImageButton.css';
import PreloadedImage from '../PreloadedImage/PreloadedImage';

let isAnyImageButtonClicked = false;

const ImageButton = ({ imageUrl, title, status, onClick }) => {

  const handleClick = useCallback(() => {
    if (status === 'locked' || isAnyImageButtonClicked) return;
    isAnyImageButtonClicked = true;
    onClick();
    setTimeout(() => {
      isAnyImageButtonClicked = false;
    }, 800);
  }, [status, onClick]);

  return (
    <div
      className={`image-button ${status} ${isAnyImageButtonClicked ? 'button-disabled' : ''}`}
      onClick={handleClick}
    >
      <div className="image-container">
        <PreloadedImage 
          src={imageUrl} 
          alt={title} 
          className="preloaded-image" 
        />
      </div>
      
      {status === 'unlocked' && (
        <div className="overlay unlocked-overlay"></div>
      )}

      {status === 'completed' && (
        <img src="./ui/icons/check-icon.png" alt="Check Icon" className="icon check-icon" />
      )}
      <div className="title">{title}</div>
    </div>
  );
};

export default ImageButton;