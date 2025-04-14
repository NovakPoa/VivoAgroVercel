import React, { useCallback } from 'react';
import './ImageButton.css';
import { RiLock2Fill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";
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
      
      {status === 'locked' && (
        <div className="overlay locked-overlay">
          <RiLock2Fill color="#fff" className="icon center-icon" />
        </div>
      )}
      {status === 'completed' && (
        <FaCheck color="#007D1E" className="icon check-icon" />
      )}
      <div className="title">{title}</div>
    </div>
  );
};

export default ImageButton;