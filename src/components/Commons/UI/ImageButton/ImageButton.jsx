import React, { useCallback } from 'react';
import './ImageButton.css';
import PreloadedImage from '../PreloadedImage/PreloadedImage';
import useSoundStore from '../../../../stores/SoundStore';

let isAnyImageButtonClicked = false;

const ImageButton = ({ imageUrl, title, status, onClick }) => {
  const { playSound } = useSoundStore();

  const handleClick = useCallback(() => {
    if (status === 'locked' || isAnyImageButtonClicked) return;

    playSound('BUTTON_CLICK', { volume: 0.5 });

    isAnyImageButtonClicked = true;
    onClick();
    setTimeout(() => {
      isAnyImageButtonClicked = false;
    }, 800);
  }, [status, onClick, playSound]);

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