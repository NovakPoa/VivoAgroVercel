import React from 'react';
import Button from '../Button/Button';
import './Card.css';

const Card = ({ title, description, showImage = true, imageUrl, firstButton = true, secondButton = true, firstButtonText, secondButtonText, firstButtonOnClick, secondButtonOnClick }) => {
  return (
    <div className="card">
      {showImage && (
        <div 
          className="card-image-wrapper" 
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
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
