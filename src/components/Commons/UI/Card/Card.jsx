import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import PreloadedImage from '../PreloadedImage/PreloadedImage';
import { ANIMATION_DURATIONS } from '../../../../config/animationConfig';
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
      const endTimer = setTimeout(() => { if (onAnimationOutEnded) onAnimationOutEnded(); }, ANIMATION_DURATIONS.CARD.SCALE_OUT);
      return () => { clearTimeout(endTimer); };
    }
  }, [animState]);

  const style = {
    '--card-scale-in-duration': `${ANIMATION_DURATIONS.CARD.SCALE_IN}ms`,
    '--card-scale-out-duration': `${ANIMATION_DURATIONS.CARD.SCALE_OUT}ms`
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