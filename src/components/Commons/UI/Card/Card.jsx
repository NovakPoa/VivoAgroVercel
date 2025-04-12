import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import PreloadedImage from '../PreloadedImage/PreloadedImage';
import './Card.css';

const CARD_SCALE_IN_DURATION = 500;
const CARD_SCALE_OUT_DURATION = 300;

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
  isVisible = true,
  onAnimationOutEnded
}) => {
  const [animState, setAnimState] = useState('initial'); // 'initial', 'visible', 'hiding'
  
  useEffect(() => {
    if (isVisible) {
      setAnimState('visible')
    } else if (animState === 'visible') {
      setAnimState('hiding');
    }
  }, [isVisible]);
  
  useEffect(() => {
    if (animState === 'hiding') {
      const endTimer = setTimeout(() => { if (onAnimationOutEnded) onAnimationOutEnded(); }, CARD_SCALE_OUT_DURATION);
      return () => { clearTimeout(endTimer); };
    }
  }, [animState]);

  const style = {
    '--card-scale-in-duration': `${CARD_SCALE_IN_DURATION}ms`,
    '--card-scale-out-duration': `${CARD_SCALE_OUT_DURATION}ms`
  };

  const animClass = 
    animState === 'initial' ? 'hidden' :
    animState === 'visible' ? 'visible' : 
    'hiding';

  return (
    <div className={`card ${animClass}`} style={style} >
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