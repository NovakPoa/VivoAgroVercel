import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import PreloadedImage from '../PreloadedImage/PreloadedImage';
import './Card.css';

const Card = ({ 
  title, 
  description, 
  showImage = true, 
  imageUrl, 
  firstButton = true, 
  secondButton = true, 
  firstButtonText, 
  secondButtonText, 
  firstButtonOnClick, 
  secondButtonOnClick,
  isVisible = true
}) => {
  const [animState, setAnimState] = useState('initial'); // 'initial', 'visible', 'hiding'
  
  useEffect(() => {
    if (isVisible) {
      const showTimer = setTimeout(() => setAnimState('visible'), 30);
      return () => clearTimeout(showTimer);
    } else if (animState === 'visible') {
      setAnimState('hiding');
    }
  }, [isVisible, animState]);
  
  const animClass = 
    animState === 'initial' ? 'hidden' :
    animState === 'visible' ? 'visible' : 
    'hiding';

  return (
    <div className={`card ${animClass}`}>
      {showImage && (
        <div className="card-image-wrapper">
          <PreloadedImage src={imageUrl} alt={title} />
        </div>
      )}
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        {(firstButton || secondButton) && (
          <div className="card-buttons">
            {firstButton && (
              <Button text={firstButtonText} onClick={firstButtonOnClick} type="primary" />
            )}
            {secondButton && (
              <Button text={secondButtonText} onClick={secondButtonOnClick} showIcon={false} type="secondary" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;